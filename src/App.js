import React, { useState, useEffect } from 'react';
import nlp from 'compromise';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [names, setNames] = useState('');
  const [verbs, setVerbs] = useState('');
  const [orgs, setOrgs] = useState('');

  const handleChange = (value) => {
    const doc = nlp(value);
    const foundVerbs = doc.verbs().out('array');
    const foundOrgs = doc.organizations().out('array');
    const foundNames = doc.people().out('array');

    foundVerbs.length && setVerbs(foundVerbs);
    foundOrgs.length && setOrgs(foundOrgs);
    foundNames.length && setNames(foundNames);
    
    setInputText(value);
  }

  return (
    <div className="App">
      <div>
        <label htmlFor='compromise-input'>A text input</label>
        <textarea
          id='compromise-input'
          rows='10'
          onChange={(e) => handleChange(e.target.value)}
          value={inputText}
        />
      </div>
      <div className="termsBlock">
          {
            names.length ?
            names.map(name => 
              <div className=".tagInput">
                Tag {name}
                <input
                  type="text"
                  value={'@'} 
                />
              </div>
            )
            : null
          }
      </div>
      <div className="termsBlock">
          {
            orgs.length ?
            orgs.map(org => <span> {org} </span>)
            : null
          }
      </div>
    </div>
  );
}

export default App;
