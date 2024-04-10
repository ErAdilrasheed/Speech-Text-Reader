const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
  {
    image: './img/happy.webp',
    text: "I used to be happy"
  },
  {
    image: './img/school.webp',
    text: "I used to go to school"
  },
  {
    image: './img/playing.webp',
    text: "I used to enjoy"
  },
  {
    image: './img/gudiya.webp',
    text: "I used to play with toys"
  },
  {
    image: './img/thirsty.webp',
    text: "Now I am thirsty"
  },
  {
    image: './img/hungry.webp',
    text: "I am hungry"
  },
  {
    image: './img/scared.webp',
    text: "I am scared"
  },
  {
    image: './img/sad.webp',
    text: "I am Sad"
  },
  {
    image: './img/tired.webp',
    text: 'Now I am tired'
  },
  {
    image: './img/home.webp',
    text: 'I am homeless'
  },
  {
    image: './img/help.webp',
    text: 'I am helpless'
  },
  {
    image: './img/angry.webp',
    text: 'I am angry'
  }
];

data.forEach(createBox);

// Create speech boxes
function createBox(item) {
  const box = document.createElement('div');

  const { image, text } = item;

  box.classList.add('box');

  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    // Add active effect
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

  main.appendChild(box);
}

// Init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

// Set text
function setTextMessage(text) {
  message.text = text;
}

// Speak text
function speakText() {
  speechSynthesis.speak(message);
}

// Set voice
function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value);
}

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

// Toggle text box
toggleBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.toggle('show')
);

// Close button
closeBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.remove('show')
);

// Change voice
voicesSelect.addEventListener('change', setVoice);

// Read text button
readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();
