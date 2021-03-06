import React, { useState, useEffect } from 'react';
import nlp from 'compromise';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [names, setNames] = useState([]);
  const [nouns, setNouns] = useState([]);
  const [verbs, setVerbs] = useState([]);
  const [orgs, setOrgs] = useState([]);

  const parseJson = (json) => {
    return json.map((match) => match.terms[0].text);
  }

  const handleChange = (value) => {
    const doc = nlp(value);
    const foundVerbs = parseJson(doc.verbs().json());
    const foundNouns = parseJson(doc.nouns().json());
    const foundOrgs = parseJson(doc.organizations().json());
    const foundNames = parseJson(doc.people().json());

    setVerbs(foundVerbs);
    setNouns(foundNouns);
    setOrgs(foundOrgs);
    setNames(foundNames);
    
    setInputText(value);
  }

  return (
    <div className="App">
      <div className="large-input">
        <label htmlFor='compromise-input'>A text input</label>
        <textarea
          id='compromise-input'
          rows='10'
          onChange={(e) => handleChange(e.target.value)}
          value={inputText}
        />
      </div>
      <div className="termsBlock">
        <h5 style={{ color: 'blue' }}>Names:</h5>
          {
            names.length ?
            names.map(name => <span className="term" style={{ color: 'blue' }}> {name} </span>
            )
            : null
          }
      </div>
      <div className="termsBlock">
        <h5 style={{ color: 'green' }}>Organizations:</h5>
          {
            orgs.length ?
            orgs.map(org => <span className="term" style={{ color: 'green' }}> {org} </span>)
            : null
          }
      </div>
      <div className="termsBlock">
          <h5 style={{ color: 'orange' }}>Nouns:</h5>
          {
            nouns.length ?
            nouns.map(noun => <span className="term" style={{ color: 'orange' }}> {noun} </span>)
            : null
          }
      </div>
      <div className="termsBlock">
        <h5 style={{ color: 'red' }}>Verbs:</h5>
          {
            verbs.length ?
            verbs.map(verb => <span className="term" style={{ color: 'red' }}> {verb} </span>)
            : null
          }
      </div>
    </div>
  );
}

export default App;
