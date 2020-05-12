import React, { useState, useEffect } from 'react';
import nlp from 'compromise';
import './App.css';

const TagPrompt = ({ prompt, name }) => {
    return (
        <div className='tagprompt'>
            <div>
                {`${prompt} ${name}:`}
            </div>
            <div>
                <input
                    type='text'
                    value='@'
                />
            </div>
        </div>
    )
};

export default TagPrompt;