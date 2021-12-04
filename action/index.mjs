import fs from 'fs';
import fetch from 'node-fetch';
import core from '@actions/core';

import * as quoteGen from '../quoteGen.js';

let githubData = {
    stargazerName: core.getInput('stargazerName'),
    repoName: core.getInput('repo'),
}

fetch(`https://api.github.com/repos/${githubData.repoName}`)
    .then(res => res.json())
    .then(json => {
        githubData = { ...githubData, stargazers: json.stargazers_count };


    const quote = quoteGen.randomQuote();

    fs.readFile('./action/template.md', async (err, data) => {
        if (err) throw err;
        let template = data.toString();
        template = template.replace('{{stargazerName}}', githubData.stargazerName);
        template = template.replace('{{starsCount}}', githubData.stargazers);
        template = template.replace('{{quote}}', quote);

        fs.writeFile('./readme.md', template, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
            console.log(githubData);
            core.setOutput('data', JSON.stringify(githubData));
        });

    })

});