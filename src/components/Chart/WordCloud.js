import React from 'react';
import ReactWordcloud from 'react-wordcloud';

const WordCloud = (props) => {
    const { processed } = props;

    const words = []

    Object.entries(processed).map(([key, value]) => {
        words.push({
            text: key,
            value: value
        });
    })
    const options = {
        rotations: 2,
        rotationAngles: [-90, 0],
    };

    return <ReactWordcloud
        className="word-cloud"
        options={options}
        words={words}
    />
}

export default WordCloud