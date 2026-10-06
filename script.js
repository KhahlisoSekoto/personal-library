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