const booksArray = JSON.parse(localStorage.getItem("books")) | [];
const bookFormOverlay = document.querySelector(".book-form-overlay");

const addNewBookBtn = document.querySelector(".add-new-book");
const main = document.querySelector(".main");
const bookRemoveButton = document.querySelector(".book-remove-button");
const bookGrids = document.querySelectorAll(".book")

const bookFormContainer = document.querySelector(".book-form-container");
const bookform = document.querySelector(".book-form");
const bookFormTitle = document.querySelector(".form-book-title-input");
const bookFormContext = document.querySelector(".form-book-context-input");
const bookFormAuthor = document.querySelector(".form-book-author-input");
const bookFormPages = document.querySelector(".form-book-pages-input");
const bookFormRead = document.querySelector(".form-book-read-checkbox");
const bookFormAddButton = document.querySelector(".form-book-submit-btn");
let openExistingForm = false;

addNewBookBtn.addEventListener("click", openBookForm);
function openBookForm(){
    isFormOpen = true;
    bookFormOverlay.classList.add("active");
    bookFormContainer.classList.add("active");
}
bookFormOverlay.addEventListener("click", closeBookForm);
function closeBookForm(e){
    bookFormOverlay.classList.remove("active");
    bookFormContainer.classList.remove("active");
}

bookRemoveButton.addEventListener("click", removeBook)
function removeBook(e){
    const deleteConfirm = confirm("Are you sure you want to remove this item?");
    if(deleteConfirm) {
        booksArray.splice(this.dataset.index,1);
    } else return;
}

function createBook(title, context, author, pages, read){
    this.title = title;
    this.context = context;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function createBookGrid(){
    let i = 0;
    booksArray.forEach(bookGrid => () => {
    const bookGrid = document.createElement("div");
    bookGrid.classList.add("book");
    bookGrid.dataset.index = i;
    const bookTitle = document.createElement("div");
    bookTitle.classList.add("book-title");
    bookTitle.textContent = booksArray[i].title;
    const bookContext = document.createElement("div");
    bookContext.classList.add("book-context");
    bookContext.textContent = booksArray[i].context;
    const bookAuthor = document.createElement("div");
    bookAuthor.classList.add("book-author");
    bookAuthor.textContent = booksArray[i].author;
    const bookPages = document.createElement("div");
    bookPages.classList.add("book-pages");
    bookPages.textContent = booksArray[i].pages;
    const bookRead = document.createElement("div");
    bookRead.classList.add("read");
    bookRead.textContent = booksArray[i].read;
    const bookRemoveButton = document.createElement("button");
    bookRemoveButton.classList.add("book-title");
    bookRemoveButton.setAttribute("type", "button");
    bookRemoveButton.dataset.index = i;
    bookGrid.append(bookTitle, bookContext, bookAuthor, bookPages, bookRead, bookRemoveButton);
    i++;
    });
}

bookform.addEventListener("submit", addBook)
function addBook(e){
    e.preventDefault();
    const newBook = new createBook(
        bookFormTitle.value, 
        bookFormContext.value, 
        bookFormAuthor.value,
        bookFormPages.value,
        bookFormRead.value);
    booksArray.push(newBook);
    localStorage.setItem("books", JSON.stringify(booksArray));
    console.log("book added");
}