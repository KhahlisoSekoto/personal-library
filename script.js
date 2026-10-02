const myLibrary = [];

// 1. Define the Book constructor function
function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read; // Expected to be a boolean (true/false) or a string

  // 2. Add the info() method inside the constructor
  this.info = function() {
    // Check if the book has been read to format the status text nicely
    const readStatus = this.read ? "read" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
  };
}

// 3. Create a new instance of the Book object
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);

// 4. Report the book info to the console
console.log(theHobbit.info()); 
// Output: "The Hobbit by J.R.R. Tolkien, 295 pages, not read yet"

function addBookToLibrary(title, author, pages, read) {
  // 1. Create a new book object using our blueprint
  const newBook = new Book(title, author, pages, read);
  
  // 2. Push it into our library array
  myLibrary.push(newBook);
}

function displayBooks() {
  const container = document.getElementById("library-container");
  
  // Clear the container first so we don't duplicate cards
  container.innerHTML = "";

  // Loop through each book in the array
  myLibrary.forEach((book, index) => {
    // 1. Create a div for the book card
    const card = document.createElement("div");
    card.classList.add("book-card");

    // 2. Add the book content inside the card
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

    // 1. Hook up the Toggle Read Status button functionality
    const toggleBtn = card.querySelector(".toggle-read-btn");
    toggleBtn.addEventListener("click", () => {
      book.read = !book.read; // Switches true to false, or false to true
      displayBooks();         // Re-render the library list to see the update
    });

    // 2. Hook up the Delete button functionality
    const deleteBtn = card.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      myLibrary.splice(index, 1); // Removes 1 item from the array at this position
      displayBooks();             // Re-render the library list to update the screen
    });

    

    // 3. Put the card inside the library container on our screen
    container.appendChild(card);
  });
}


// Manually add some test books to our library array
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("1984", "George Orwell", 328, true);

// Run the function to display the books on the webpage
displayBooks();

// Grab our HTML elements
const dialog = document.getElementById("book-dialog");
const newBookBtn = document.getElementById("new-book-btn");
const cancelBtn = document.getElementById("cancel-btn");
const bookForm = document.getElementById("book-form");

// 1. Open the pop-up form when "NEW BOOK" is clicked
newBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

// 2. Close the pop-up form when "Cancel" is clicked
cancelBtn.addEventListener("click", () => {
  dialog.close();
});

// 3. Handle what happens when the form is submitted
bookForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Stops the page from refreshing completely

  // Grab the values typed into the inputs
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").value === "true"; // Converts string to boolean

  // Add the new book to our array
  addBookToLibrary(title, author, pages, read);

  // Refresh our book cards layout on screen
  displayBooks();

  // Reset the inputs and close the pop-up
  bookForm.reset();
  dialog.close();
});