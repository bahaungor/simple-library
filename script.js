const booksArray = JSON.parse(localStorage.getItem("books")) || [];

const addNewBookBtn = document.querySelector(".add-new-book");
const main = document.querySelector(".main");
const bookGridsContainer = document.querySelector(".library");
let bookRemoveButtons;
let bookGrids;

const bookFormOverlay = document.querySelector(".book-form-overlay");
const bookFormContainer = document.querySelector(".book-form-container");
const bookform = document.querySelector(".book-form");
const bookFormTitle = document.querySelector(".form-book-title-input");
const bookFormContext = document.querySelector(".form-book-context-input");
const bookFormAuthor = document.querySelector(".form-book-author-input");
const bookFormPages = document.querySelector(".form-book-pages-input");
const bookFormRead = document.querySelector(".form-book-read-checkbox");
const bookFormAddButton = document.querySelector(".form-book-submit-btn");
let openExistingForm = false;
let openedBook;

createBookGrid();

addNewBookBtn.addEventListener("click", openBookForm);
function openBookForm(){
    bookFormOverlay.classList.add("active");
    bookFormContainer.classList.add("active");
}
bookFormOverlay.addEventListener("click", closeBookForm);
function closeBookForm(e){
    bookFormOverlay.classList.remove("active");
    bookFormContainer.classList.remove("active");
    openExistingForm = false;
    bookform.reset();
}


function removeBook(e){
    console.log("remove book function called")
    e.stopPropagation();
    const deleteConfirm = confirm("Are you sure you want to remove this book?");
    if(deleteConfirm) {
        booksArray.splice(this.dataset.index,1);
    } else return;
    localStorage.setItem("books", JSON.stringify(booksArray));
    createBookGrid();
}

function createBook(title, context, author, pages, read){
    this.title = title;
    this.context = context;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function createBookGrid(){
    bookGridsContainer.innerHTML = "";
    let i = 0;
    booksArray.forEach(book => {
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
        if(booksArray[i].read == true){
            bookRead.textContent = "Read";
        } else {
            bookRead.textContent = "Not Read";
        }
        const bookRemoveButton = document.createElement("button");
        bookRemoveButton.classList.add("book-remove-button");
        bookRemoveButton.setAttribute("type", "button");
        bookRemoveButton.textContent = "Remove";
        bookRemoveButton.dataset.index = i;
        bookGridsContainer.appendChild(bookGrid)
        bookGrid.append(bookTitle, bookContext, bookAuthor, bookPages, bookRead, bookRemoveButton);
        i++;
    });
    bookRemoveButtons = document.querySelectorAll(".book-remove-button");
    bookRemoveButtons.forEach(button => button.addEventListener("click", removeBook));
    bookGrids = document.querySelectorAll(".book");
    bookGrids.forEach(bookGrid => bookGrid.addEventListener("click", openGridItem));
}

bookform.addEventListener("submit", addBook)
function addBook(e){
    e.preventDefault();
    if(openExistingForm){
        booksArray[openedBook].title = bookFormTitle.value;
        booksArray[openedBook].context = bookFormContext.value;
        booksArray[openedBook].author = bookFormAuthor.value;
        booksArray[openedBook].pages = bookFormPages.value;
        booksArray[openedBook].read = bookFormRead.checked;
        localStorage.setItem("books", JSON.stringify(booksArray));
    } else {
        const newBook = new createBook(
            bookFormTitle.value, 
            bookFormContext.value, 
            bookFormAuthor.value,
            bookFormPages.value,
            bookFormRead.checked);
        console.log("new book added");
        booksArray.push(newBook);
        localStorage.setItem("books", JSON.stringify(booksArray));
    }
    closeBookForm();
    createBookGrid();
}

function openGridItem(e){
    openExistingForm = true;
    openBookForm();
    openedBook = this.dataset.index;
    fillBookForm(this.dataset.index);
}

function fillBookForm(index){
    bookFormTitle.value = booksArray[index].title;
    bookFormContext.value = booksArray[index].context;
    bookFormAuthor.value = booksArray[index].author;
    bookFormPages.value = booksArray[index].pages;
    bookFormRead.checked = booksArray[index].read;
}