import React, { useState, useEffect } from 'react';
import nlp from 'compromise';
import './App.css';
import TagPrompt from './TagPrompt';
import TagSuggest from './TagSuggest';

function App() {
  const [inputText, setInputText] = useState('');
  const [names, setNames] = useState([]);
  const [nouns, setNouns] = useState([]);
  const [verbs, setVerbs] = useState([]);
  const [orgs, setOrgs] = useState([]);

  const parseJson = (json) => {
    return json.map((match) => match.terms[0].text);
  };

  const handleChange = (value) => {
    const doc = nlp(value);

    nlp.extend((doc, world) => {
      world.addWords({
        github: 'Organization',
        linkedin: 'Organization',
      });
    });

    const foundVerbs = parseJson(doc.verbs().toGerund().json());
    const foundNouns = parseJson(doc.nouns().json());
    const foundOrgs = parseJson(doc.organizations().json());
    const foundNames = parseJson(doc.people().json());

    console.log(doc);

    setVerbs(foundVerbs);
    setNouns(foundNouns);
    setOrgs(foundOrgs);
    setNames(foundNames);

    setInputText(value);
  };

  return (
    <div className="App">
      <div className="large-input">
        <label htmlFor="compromise-input">Your message</label>
        <textarea
          id="compromise-input"
          rows="10"
          onChange={(e) => handleChange(e.target.value)}
          value={inputText}
        />
      </div>
      <div className="termsBlock">
        {names.length
          ? names.map((name) => <TagPrompt prompt={'Mention'} name={name} />)
          : null}
      </div>
      <div className="termsBlock">
        {orgs.length
          ? orgs.map((org) => <TagPrompt prompt={'Handle for'} name={org} />)
          : null}
      </div>
      <h5>Suggested Tags</h5>
      <div className="termsBlock">
        {nouns.length ? nouns.map((noun) => <TagSuggest tag={noun} />) : null}
        {verbs.length ? verbs.map((verb) => <TagSuggest tag={verb} />) : null}
      </div>
    </div>
  );
}

export default App;
