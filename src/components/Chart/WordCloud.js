import React from 'react';
import ReactWordcloud from 'react-wordcloud';

const WordCloud = (props) => {
    const { processed } = props;

    // console.log(processed);

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
    // const size = [600, 400];

    return <ReactWordcloud
        className="word-cloud"
        options={options}
        // size={size}
        words={words}
    />
}

export default WordCloud