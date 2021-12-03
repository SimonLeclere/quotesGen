import core from '@actions/core';

const username = 'simonsquotes'
const password = core.getInput('password');

const unsplashApiKey = core.getInput('UNSPLASH_API_KEY');


import fs from 'fs';
import canvas from 'canvas';
const { createCanvas, loadImage } = canvas;

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import { createApi } from 'unsplash-js';
import fetch from 'node-fetch';

import { IgApiClient } from 'instagram-private-api';

import { createRequire } from "module";
const require = createRequire(import.meta.url);

import { readFile } from 'fs';
import { promisify } from 'util';
const readFileAsync = promisify(readFile);

import randomQuote from '../quoteGen.js';
const alreadyUsed = require('./alreadyUsed.json');

const unsplash = createApi({
  accessKey: 'C0BJRfWjr9eAZY6nwsIcE1eq033Ke2yuaMGzpBYWvw4',
  fetch: fetch
});

const ig = new IgApiClient();


const [quote, words] = getUniqueQuote();
const rdmWord = words[Math.floor(Math.random() * words.length)];

fetchUnsplash(rdmWord).then(r => {

  drawImage(quote, r[0]).then(async canvas => {

    // save as jpeg
    const out = fs.createWriteStream(__dirname + '/out.jpg');
    const stream = canvas.createJPEGStream();
    stream.pipe(out);
    out.on('finish', async () => {
      await login();
      const media = await post(__dirname + '/out.jpg', quote + '\n' + `📷 @${r[1]} via Unsplash`);
      console.log(media.status !== 'ok' ? media.message : 'Posted!');
      // delete file
      fs.unlinkSync(__dirname + '/out.jpg');
    });

  })
  
}).catch(e => {throw new Error(e)});


function getUniqueQuote() {
  const quote = randomQuote(true);
  if(alreadyUsed.includes(quote[0])) return getUniqueQuote();
  alreadyUsed.push(quote[0]);
  fs.writeFileSync(__dirname + '/alreadyUsed.json', JSON.stringify(alreadyUsed));
  return quote;	
}


async function fetchUnsplash(query) {
  return unsplash.photos.getRandom({
    query: query,
    count: 1,
  }).then(r => {
    if(r.type === 'error') return console.log(r.errors);
    const photo = r.response[0];
    return [photo.urls.regular, photo.user.social.instagram_username || photo.user.instagram_username || photo.user.username];
  }).catch(console.log);
}


function drawImage(quoteString, url) {
  const canvas = createCanvas(1080, 1080);
  const ctx = canvas.getContext('2d')

  return loadImage(url).then((image) => {
    const imgSize = Math.min(image.width, image.height);
  
    const left = (image.width - imgSize) / 2;
    const top = (image.height - imgSize) / 2;
    
    ctx.drawImage(image, left, top, imgSize, imgSize, 0, 0, ctx.canvas.width, ctx.canvas.height);

    // Dessine un rectangle noir transparent sur l'image
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);


    // Dessine le texte le plus gros possible au centre de l'image, avec un padding de 10px et des retours à la ligne

    // use random font
    const fonts = ['Arial', 'Bell MT', 'Bradley Hand ITC', 'Californian FB', 'Calisto MT', 'Cambria Math', 'Century', 'Ebrima', 'Franklin Gothic Book', 'Freestyle Script', 'Garamond', 'Goudy Old Style', 'Haettenschweiler', 'High Tower Text', 'Kristen ITC', 'Lucida Calligraphy', 'Lucida Handwriting', 'Palatino Linotype', 'Pristina'];
    const font = fonts[Math.floor(Math.random() * fonts.length)];
    ctx.font = `bold 100px ${font}`;

    // ctx.font = 'bold 100px "Helvetica Neue", Helvetica, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';
    ctx.shadowColor = "black";
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;
    ctx.shadowBlur = 25;
    
    wrapText(ctx, quoteString, ctx.canvas.width / 2, ctx.canvas.height / 2, ctx.canvas.width - 20, 100); 
    
    return canvas;
  })
}


function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';

  for(let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      
      const temp = ctx.fillStyle;
      ctx.fillStyle = 'black';
      ctx.strokeText(line, x, y);
      ctx.fillStyle = temp;

      line = words[n] + ' ';
      y += lineHeight;
    }
    else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);

  const temp = ctx.fillStyle;
  ctx.fillStyle = 'black';
  ctx.strokeText(line, x, y);
  ctx.fillStyle = temp;
}

async function login() {
  ig.state.generateDevice(username);
  // ig.state.proxyUrl = '51.79.52.80';
  await ig.simulate.preLoginFlow();
  await ig.account.login(username, password);
  process.nextTick(async () => await ig.simulate.postLoginFlow());

}

async function post(path, caption) {
  const file = await readFileAsync(path);
  const media = await ig.publish.photo({ file, caption });
  if(media.status !== 'ok') throw new Error(media.message);
  return media;
}