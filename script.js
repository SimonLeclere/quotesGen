import * as quoteGen from './quoteGen.js';

$(document).ready(function() {
  $(".title").lettering();
  $(".button").lettering();

  const repertories = ['corndog', 'hamster', 'sushi', 'donut', 'pancake'];
  const repo = quoteGen.randomFromArray(repertories);
  $('#snow').css({'background-image': [1, 2, 3].map((x) => `url(./assets/${repo}/${x}.png)`).join(', ') });

});


$(document).ready(function() {
  animation();
}, 1000);

$('.button').click(function() {
  reverseAnimation();
  
  setTimeout(() => {
    const quote = quoteGen.randomQuote();
    document.getElementsByTagName('h1')[0].innerHTML = `<span class="title">${quote}</span>`;
    $(".title").lettering();

    let index = 0;
    for(let i = 0; i < ~~(quote.length/36); i++) {
      const spaceIndex = quote.slice(index, index+36).lastIndexOf(' ') + index;
      $('.title')[0].childNodes[spaceIndex].outerHTML += '<br>';
      index = spaceIndex;
    }

    animation();
    
    confetti({
      particleCount: 100,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 1 },
    });
    confetti({
      particleCount: 100,
      angle: 120,
      spread: 55,
      origin: { x: 1, y:1 },
    });

  }, 2000);
});

function reverseAnimation() {
  var title2 = new TimelineMax();
  title2.to(".button", 0, {visibility: 'hidden', opacity: 0})
  title2.staggerFromTo(".title span", 0.5, // 0.5s
  {ease: Back.easeOut.config(1.7), opacity: 1, bottom: 0},
  {ease: Back.easeOut.config(1.7), opacity: 0, bottom: -80}, 0.05);
  // title2.to(".button", 0.2, {visibility: 'visible' ,opacity: 1})
}


function animation() {
  var title1 = new TimelineMax();
  title1.to(".button", 0, {visibility: 'hidden', opacity: 0})
  title1.staggerFromTo(".title span", 0.5, 
  {ease: Back.easeOut.config(1.7), opacity: 0, bottom: -80},
  {ease: Back.easeOut.config(1.7), opacity: 1, bottom: 0}, 0.05);
  title1.to(".button", 0.2, {visibility: 'visible' ,opacity: 1})
}