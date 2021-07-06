import React, { useState, useEffect } from 'react';
import nlp from 'compromise';
import './App.css';

const TagSuggest = ({ tag, type }) => {
    return (
        <div className={`tagsuggest ${type}`} key={tag}>
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