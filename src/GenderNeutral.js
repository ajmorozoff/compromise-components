import React, { useState, useEffect } from 'react';
import nlp from 'compromise';
import './App.css';
import TagPrompt from './TagPrompt';
import TagSuggest from './TagSuggest';

function GenderNeutral() {
  const [inputText, setInputText] = useState('');
  const [output, setOutput] = useState('');

  const genderNeutralPlugin = (Doc, world) => {
    Doc.prototype.matchPronouns = function () {
      this.not('it').contractions().expand();
      this.not('(it|us|our)')
        .match('#Pronoun')
        .lookAhead('^#Verb')
        .replace('is', 'are');

      this.not('(it|us|our)')
        .match('#Prounoun')
        .lookAhead('^#Verb')
        .replace('has', 'have');

      this.not('is it').match('is (she|he)').replace('is', 'are');

      this.match('#Verb').lookAhead('#Pronoun').replace('(him|her)', 'them');

      this.not('(it|us|our|ours)')
        .match('#Pronoun')
        .replace('(she|he)', 'they');

      this.not('(it|us|our|ours)')
        .match('#Pronoun')
        .replace('(her|his)', 'their');

      // this.match('she').lookAhead('^#Verb').replace('is', 'are');
      // this.match('he').lookAhead('^#Verb').replace('is', 'are');
      // this.match('she').lookAhead('^#Verb').replace('has', 'have');
      // this.match('he').lookAhead('^#Verb').replace('has', 'have');
      // this.not('(it|us|our)').match('#Pronoun').replaceWith('they');

      // this.not('(our|ours)').replace('#Possessive', 'their');

      this.not('#Gerund').match('#PresentTense').verbs().toInfinitive();
      return this;
    };
  };

  const handleChange = (value) => {
    nlp.extend(genderNeutralPlugin);
    const doc = nlp(value);
    const scrubbed = nlp(value).matchPronouns().text();

    setOutput(scrubbed);
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
      <div
        style={{
          marginTop: '2rem',
          color: 'darkslategrey',
        }}
      >
        <div className="termsBlock">{output}</div>
      </div>
    </div>
  );
}

export default GenderNeutral;
