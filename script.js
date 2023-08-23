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
let clickedBook;

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function openBookForm(e){
    overlay.style.display = "block"
    addBookForm.style.display = "flex"
    clickedBook = e.target.parentNode.parentNode.dataset.id
    if (clickedBook !== undefined){
        bookTitle.value = books[clickedBook]["title"]
        bookAuthor.value = books[clickedBook]["author"]
        bookPage.value = books[clickedBook]["pages"]
        bookRead.checked = books[clickedBook]["read"]
    }
}

function closeBookForm(){
    overlay.style.display = "none"
    addBookForm.style.display = "none"
    addBookForm.reset()
    clickedBook = undefined
    refreshcontent()
}

function addBook(e){
    e.preventDefault()
    if (clickedBook !== undefined) {
        books[clickedBook]["author"] = bookTitle.value
        books[clickedBook]["author"] = bookAuthor.value
        books[clickedBook]["pages"] = bookPage.value
        books[clickedBook]["read"] = bookRead.checked
        localStorage.setItem("localItems", JSON.stringify(books));
        closeBookForm()
    } else {
        const newBook = new Book(bookTitle.value, bookAuthor.value, bookPage.value, bookRead.checked)
        const bookExist = books.find(book => book.title === newBook.title && book.author === newBook.author);
        if(bookExist){
            alert("Book already exist!")
        } else {
            books.push(newBook)
            localStorage.setItem("localItems", JSON.stringify(books));
            closeBookForm()
        }
    }
}

function refreshcontent(){
    content.innerHTML = "";
    for (let book in books){
        const newBookCard = document.createElement("div")
        newBookCard.classList.add('bookCard')
        newBookCard.setAttribute("data-id", book)
        content.appendChild(newBookCard)

        const fields = ['title', 'author', 'pages']
        fields.forEach(field => {
            const newField = document.createElement("div");
            newField.classList.add(field);
            newField.textContent = books[book][field];
            newBookCard.appendChild(newField);
        });
         
        const newReadOrNot = document.createElement("div")
        newReadOrNot.classList.add('readOrNot')
        newReadOrNot.textContent = books[book]["read"] ? "Read" : "Not Read";
        newBookCard.appendChild(newReadOrNot)

        const newRow = document.createElement("div");
        newRow.classList.add('row')
        newBookCard.appendChild(newRow)

        const newRemoveBook = document.createElement("div")
        newRemoveBook.classList.add('removeBook')
        newRemoveBook.textContent = "Remove"
        newRemoveBook.addEventListener("click", removeBook)
        newRow.appendChild(newRemoveBook)

        const newEditBook = document.createElement("div")
        newEditBook.classList.add('editBook')
        newEditBook.textContent = "Edit"
        newEditBook.addEventListener("click", openBookForm)
        newRow.appendChild(newEditBook)
    }
}

function removeBook(e){
    clickedBook = e.target.parentNode.parentNode.dataset.id
    const answer = confirm("Are you sure you want to remove this book?")
    if (answer === true){
        books.splice(clickedBook, 1)
        localStorage.setItem("localItems", JSON.stringify(books));
        refreshcontent()
    }
}