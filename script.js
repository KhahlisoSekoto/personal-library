const myLibrary = [];

// Line 4-23 (Replacing my old function book)
class Book {
  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }


  // Methods are declared directly inside the class body (prototype methods)
  info() {
    // Format the boolean state into user-friendly text for clean string returns
    const readStatus = this.read ? "read" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
  }
}


const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);


console.log(theHobbit.info()); 


function addBookToLibrary(title, author, pages, read) {
  // Instantiate the object and store it insteantly in the global collection array
  const newBook = new Book(title, author, pages, read);
  
  
  myLibrary.push(newBook);
}

function displayBooks() {
  const container = document.getElementById("library-container");
  
  // Wipe container clean before rending to avoid stacking duplicate listings
  container.innerHTML = "";

  
  myLibrary.forEach((book, index) => {
    
    const card = document.createElement("div");
    card.classList.add("book-card");

    
    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>By: ${book.author}</p>
      <p>${book.pages} pages</p>
      <p>Status: ${book.read ? "Read" : "Not Read Yet"}</p>
      <div class="card-buttons">
        <button class="toggle-read-btn">Change Status</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    // Intercept event to invert boolean status and sync changes to display listing
    const toggleBtn = card.querySelector(".toggle-read-btn");
    toggleBtn.addEventListener("click", () => {
      book.read = !book.read; 
      displayBooks();         
    });

    // Hook up the Delete button functionality
    const deleteBtn = card.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      myLibrary.splice(index, 1); // Removes 1 item from the array at this position
      displayBooks();             // Re-render the library list to update the screen
    });

    

    
    container.appendChild(card);
  });
}



addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("1984", "George Orwell", 328, true);


displayBooks();


const dialog = document.getElementById("book-dialog");
const newBookBtn = document.getElementById("new-book-btn");
const cancelBtn = document.getElementById("cancel-btn");
const bookForm = document.getElementById("book-form");


newBookBtn.addEventListener("click", () => {
  dialog.showModal();
});


cancelBtn.addEventListener("click", () => {
  dialog.close();
});


bookForm.addEventListener("submit", (e) => {
    // 1. Grab the elements
    const titleInput = document.getElementById("title");
    const authorInput = document.getElementById("author");
    const pagesInput = document.getElementById("pages");
    const readInput = document.getElementById("read");

    // 2. Clear any previous custom error messages
    titleInput.setCustomValidity("");
    authorInput.setCustomValidity("");
    pagesInput.setCustomValidity("");

    // 3. Clean and parse values
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const pages = parseInt(pagesInput.value, 10);
    const read = readInput.value === "true";

    // 4. Run advanced validation rules using native bubbles
    if (title.length < 2) {
        titleInput.setCustomValidity("The book title must be at least 2 characters long.");
        titleInput.reportValidity(); // Tells the browser to show the bubble immediately
        e.preventDefault(); // Stop the form submission
        return;
    }

    if (author.length < 3) {
        authorInput.setCustomValidity("The author's name must be at least 3 characters long.");
        authorInput.reportValidity();
        e.preventDefault();
        return;
    }

    if (isNaN(pages) || pages <= 0) {
        pagesInput.setCustomValidity("Please enter a realistic number of pages (greater than 0).");
        pagesInput.reportValidity();
        e.preventDefault();
        return;
    }

    // 5. If it passes all rules, let it add the book
    e.preventDefault(); // Prevents page reload
    addBookToLibrary(title, author, pages, read);
    displayBooks();

    // Reset and close
    bookForm.reset();
    dialog.close();
});
