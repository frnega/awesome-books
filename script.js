const bookTitle = document.querySelector('#title');
const author = document.querySelector('#author');
const submitButton = document.querySelector('#submit');
const container = document.querySelector('#books-listcontainer');

function setLocalStorage(booksList) {
  localStorage.setItem('formInputs', JSON.stringify(booksList));
}
function getLocalStorage() {
  if (localStorage.getItem('formInputs') !== null) {
    return JSON.parse(localStorage.getItem('formInputs'));
  }
  return [];
}
const booksList = getLocalStorage();

function displaybooks(books) {
  container.innerHTML = '';
  for (let i = 0; i < books.length; i += 1) {
    const book = books[i];
    const maindiv = document.createElement('div');
    const h2 = document.createElement('h2');
    const p = document.createElement('p');
    const removeButton = document.createElement('button');
    removeButton.addEventListener('click', () => {
      booksList.splice(i, 1);
      setLocalStorage(booksList);
      displaybooks(booksList);
    });
    h2.innerHTML = book.title;
    p.innerHTML = book.author;
    removeButton.innerHTML = 'remove';
    maindiv.appendChild(h2);
    maindiv.appendChild(p);
    maindiv.appendChild(removeButton);
    container.appendChild(maindiv);
  }
}
displaybooks(booksList);

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (bookTitle.value.trim() !== '' && author.value.trim() !== '') {
    const list = {
      title: bookTitle.value,
      author: author.value,
    };
    booksList.push(list);
    setLocalStorage(booksList);
    displaybooks(booksList);
  }
});