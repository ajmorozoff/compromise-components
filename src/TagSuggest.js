import React, { useState, useEffect } from 'react';
import nlp from 'compromise';
import './App.css';

const TagSuggest = ({ tag }) => {
    return (
        <div className='tagsuggest'>
            <div>
                {tag}
            </div>
            <button>
                x
            </button>
        </div>
    )
};

export default TagSuggest;