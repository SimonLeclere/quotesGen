const fs = require('fs')
const fetch = require("node-fetch");
const core = require('@actions/core');

const data = {
    stargazerName: core.getInput('stargazerName'),
}

fetch("https://api.github.com/repos/11ty/eleventy")
    .then(res => res.json())
    .then(json => {
        data += { stargazers: json.stargazers_count };

        console.log(data);
        core.setOutput('data', JSON.stringify(data));
    });


// try {
//     const previousData = require('../data.json');

//     if(previousData.lastQuestion.toString() !== answerData[1]) {
        
//         const userScore = previousData.leaderboard.find(l => l.userID === UserData.userID);
//         if(userScore) userScore.wins--;

//         fs.writeFile('data.json', JSON.stringify(previousData), (err) => {
//             if(err) return console.log(err);
//         });

//         return core.setOutput('closeIssueMsg', 'Don\'t try to cheat! You lost a win!\n\nPS: If you think you are not supposed to see this message, reopen the issue ;)');
//     }

//     fs.readFile('./templates/readme.template.md', async (err, data) => {

//         if (err) return console.error(err);
//         const readme = data.toString();
        
//         const triviaData = await fetchQuestion();
//         previousData.lastQuestion = triviaData.id;

//         const answersList = shuffle(triviaData.propositions);
//         const lastQuestion = await isCorrect(answerData[1], answerData[2]);

//         previousData.lastAnswers = previousData.lastAnswers.slice(0, 9);
//         previousData.lastAnswers.unshift({
//             name: UserData.user,
//             answer: answerData[2],
//             question: lastQuestion[1].question,
//             correct: lastQuestion[0]
//         });

//         const lastAnswers = previousData.lastAnswers.map(a => `- **${a.name}** answered **${a.answer}** to \`${a.question}\` (${a.correct ? 'Good answer' : 'Wrong answer'})`);

//         if(lastQuestion[0]) {
//             const userScore = previousData.leaderboard.find(l => l.userID === UserData.userID);
//             if(userScore) userScore.wins++;
//             else previousData.leaderboard.push({ name: UserData.user, wins: 1, userID: UserData.userID })
//         }

//         const templated = template(readme);
//         const final = templated({
//             question: triviaData.question,
//             answers: `| ${answersList.map(a => `[${a}](${genLink(triviaData.id, a)})`).join(' | ')} |` + '\n' + `| ${ '- | '.repeat(answersList.length)}`,
//             lastAnswers: lastAnswers.join('\n'),
//             leaderboard: makeLeaderboard(previousData.leaderboard).map(x => `| [${x.name}](https://github.com/${x.name}) | ${x.wins} |`).join('\n')
//         });

//         const rank = `${previousData.leaderboard.filter(u => u.wins > previousData.leaderboard.find(x => x.userID === UserData.userID).wins).length + 1}`;
//         const suffixes = { '1': 'st', '2': 'nd', '3': 'rd' };
//         const victoryString = `Hey ${UserData.user}, like you said, the correct answer was "${lastQuestion[1].réponse}"! Congratulations!\n\nAnecdote : ${lastQuestion[1].anecdote}\n\nYour rank on the leaderboard: ${rank}${suffixes[rank[rank.length - 1]] || 'th'}\n\nPS: I strongly advise you to change your notification settings for this repo so that you don't receive an email every time you answer a question. This small gesture helps to limit the carbon footprint of the repo 🍃`;
//         const lostString = `Hey ${UserData.user}, unfortunately you were wrong, the correct answer was "${lastQuestion[1].réponse}"! Don't worry, next time will be the right one!\n\nAnecdote : ${lastQuestion[1].anecdote}\n\nYour rank on the leaderboard: ${rank}${suffixes[rank[rank.length - 1]] || 'th'}\n\nPS: I strongly advise you to change your notification settings for this repo so that you don't receive an email every time you answer a question. This small gesture helps to limit the carbon footprint of the repo 🍃`;
//         core.setOutput('closeIssueMsg', lastQuestion[0] ? victoryString : lostString);

//         fs.writeFile('README.md', final, (err) => {
//             if(err) return console.log(err);
//             console.log('Readme updated!')
//         });

//         fs.writeFile('data.json', JSON.stringify(previousData), (err) => {
//             if(err) return console.log(err);
//             console.log('data.json updated!')
//         });


//         fs.readFile(`./templates/answer.template.md`, async (err, data) => {
//             answersList.forEach((answer, index) => {
//                 if (err) return console.error(err);
//                 const templated = template(data.toString())({
//                     answer: answer,
//                     id: triviaData.id
//                 });
    
//                 fs.writeFile(`./.github/ISSUE_TEMPLATE/Answer ${index + 1}.md`, templated, (err) => {
//                     if(err) return console.log(err);
//                     console.log(`Answer ${index + 1}.md updated!`);
//                 });
//             })
//         })

//     })

// } catch(error) {
//     core.setFailed(error.message);
// }