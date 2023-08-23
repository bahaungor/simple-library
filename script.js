const addBookBtn = document.querySelector(".addBook");
const overlay = document.querySelector(".overlay");
const addBookForm = document.querySelector(".formContainer");
const cancelBtn = document.querySelector(".button.cancel");
const bookTitle = document.querySelector(".formContainer input#title")
const bookAuthor = document.querySelector(".formContainer input#author")
const bookPage = document.querySelector(".formContainer input#page")
const bookRead = document.querySelector(".formContainer input#read")
const content = document.querySelector(".content")

overlay.addEventListener("click", closeBookForm)
cancelBtn.addEventListener("click", closeBookForm)
addBookBtn.addEventListener("click", openBookForm);
addBookForm.addEventListener("submit", addBook)

const books = JSON.parse(localStorage.getItem("localItems")) || []
refreshcontent()
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function openBookForm(e){
    overlay.style.display = "block"
    addBookForm.style.display = "flex"
}

function closeBookForm(){
    overlay.style.display = "none"
    addBookForm.style.display = "none"
    addBookForm.reset()
}

function addBook(e){
    e.preventDefault()
    const newBook = new Book(bookTitle.value, bookAuthor.value, bookPage.value, bookRead.checked)
    books.push(newBook)
    localStorage.setItem("localItems", JSON.stringify(books));
    closeBookForm()
    refreshcontent()
}

function refreshcontent(){
    content.innerHTML = "";
    for (let book in books){
        const newBookCard = document.createElement("div")
        const newTitle = document.createElement("div")
        const newAuthor = document.createElement("div")
        const newPages = document.createElement("div")
        const newReadOrNot = document.createElement("div")
        const newRemoveBook = document.createElement("div")
        newBookCard.classList.add('bookCard')
        newTitle.classList.add('title')
        newAuthor.classList.add('Author')
        newPages.classList.add('pages')
        newReadOrNot.classList.add('readOrNot')
        newRemoveBook.classList.add('removeBook')
        newTitle.textContent = books[book]["title"]
        newAuthor.textContent = books[book]["author"]
        newPages.textContent = books[book]["pages"]
        newRemoveBook.textContent = "Remove"
        newReadOrNot.textContent = books[book]["read"] ? "Read" : "Not Read";
        newBookCard.appendChild(newTitle)
        newBookCard.appendChild(newAuthor)
        newBookCard.appendChild(newPages)
        newBookCard.appendChild(newReadOrNot)
        newBookCard.appendChild(newRemoveBook)
        content.appendChild(newBookCard)
    }
}