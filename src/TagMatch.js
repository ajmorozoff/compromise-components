import React, { useState, useEffect } from 'react';
import nlp from 'compromise';
import './App.css';
import TagPrompt from './TagPrompt';
import TagSuggest from './TagSuggest';
import {createTermsList} from './tags_utils';
import {VERBS_DENY_LIST} from './tags_constants';

function App() {
  const [inputText, setInputText] = useState('');
  const [orgs, setOrgs] = useState([]);
  const [nouns, setNouns] = useState([]);
  const [verbs, setVerbs] = useState([]);

  const parseJson = (json) => {
    return json.map((match) => match.terms[0].text.toLowerCase());
  };

  const verbTagsDenyList = createTermsList(VERBS_DENY_LIST);

  nlp.extend((Doc, world) => {
    world.addWords({
      github: 'Organization',
      linkedin: 'Organization',
    });
    world.addWords({hike: 'Verb', fish: 'Verb'});
    //world.addConjugations({ hike: { Gerund: 'hiking' }, fish: {Gerund: 'fishing'}});
  });

  const handleChange = (value) => {
    const doc = nlp(value);

    console.log('verb tags deny', verbTagsDenyList);
    const foundVerbs = parseJson(doc.verbs().toGerund().not(verbTagsDenyList).json());
    const foundNouns = parseJson(doc.nouns().json());
    const foundOrgs = parseJson(doc.organizations().json());
    
    setVerbs(foundVerbs);
    setNouns(foundNouns);
    setOrgs(foundOrgs);

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
        {orgs.length
          ? orgs.map((org) => <TagPrompt prompt={'Mention'} name={org} />)
          : null}
      </div>
      <h5>Suggested Tags</h5>
      <div className="termsBlock">
        {nouns.length ? nouns.map((noun) => <TagSuggest tag={noun} type={"noun"}/>) : null}
        {verbs.length ? verbs.map((verb) => <TagSuggest tag={verb} type={"verb"}/>) : null}
      </div>
    </div>
  );
}

export default App;
