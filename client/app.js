// Referencje do elementów HTML
const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

// Zmienna przechowująca nazwę użytkownika
let userName

// Funkcja obsługująca formularz logowania
function login(e) {
  e.preventDefault();

  // Walidacja 
  if(userNameInput.value === '') {
    alert('Please enter your name');
    return;
  };

  // Przypisanie wartości pola do zmiennej userName
  userName = userNameInput.value;

  // Ukrycie formularza logowania i pokazanie sekcji z wiadomościami 
  loginForm.classList.remove('show');
  messagesSection.classList.add('show');
};

// Funkcja obsługująca formularz wiadomości
function sendMessage(e) {
  e.preventDefault();

  let messageContent = messageContentInput.value;

  // Walidacja
  if(!messageContent) {
    alert('Please enter your message');
    return;
  }

  // Wywołanie funkcji addMessage
  addMessage(userName, messageContent)

  // Czyszczenie pola tekstowego
  messageContentInput.value = '';
};

function addMessage(author, content) {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if(author === userName) message.classList.add('message--self');
  message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author }</h3>
    <div class="message__content">
      ${content}
    </div>
  `;
  messagesList.appendChild(message);
};




// Nasłuchiwanie submit na formularzach 
loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);

