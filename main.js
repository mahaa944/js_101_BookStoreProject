const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


// 2D array to store book information [BookId, Title, Author, Price, Quantity]
const books = [
  [1, 'Start with why', 'Simon Sinek', 80.0, 13],
  [2, 'But how do it know', 'J. Clark Scott', 59.9, 22],
  [3, 'Clean Code', 'Robert Cecil Martin', 50.0, 5],
  [4, 'Zero to One', 'Peter Thiel', 45.0, 12],
  [5, "You don't know JS", 'Kyle Simpson', 39.9, 9]
];

function displayBooks() {
  console.log('Book Id | Title | Author | Price | Quantity');
  books.forEach(book => {
    console.log(book.join(' | '));
  });
}

function findBook(id, title, author) {
  const result = [];
  books.forEach(book => {
    if ((id && book[0] === id) || (title && book[1] === title) || (author && book[2] === author)) {
      result.push(book);
    }
  });
  return result;
}



function sellBook(title, quantity, balance) {
  // Find the book in the array based on the title
  const book = books.find(book => book[1] === title);

  // Check if the book is available
  if (book) {
    const bookId = book[0];
    const bookPrice = book[3];
    const availableQuantity = book[4];

    // Check if the required quantity is available
    if (availableQuantity >= quantity) {
      // Check if the balance is sufficient
      const totalPrice = bookPrice * quantity;
      if (balance >= totalPrice) {
        // Update the inventory and balance
        book[4] -= quantity;
        balance -= totalPrice;
        console.log('The Bill');
        // Generate and display the invoice
        console.log(`Book Title: ${title}`);
        console.log(`Book ID: ${bookId}`);
        console.log(`Quantity: ${quantity}`);
        console.log(`Total Price: ${totalPrice}`);
        console.log(`Remaining Balance: ${balance}`);
      } else {
        console.log('Insufficient balance to purchase the required quantity.');
      }
    } else {
      console.log('Insufficient quantity available in the inventory.');
    }
  } else {
    console.log('Book not found in the inventory.');
  }
  showMenu();
    
}


function showMenu() {
  console.log('\n1. Add Book\n2. Edit Book\n3. Delete Book\n4. Display Books\n5. Search Books\n6. Sell Book\n7. Exit');
  rl.question('Choose an option: ', (option) => {
    switch (option) {
      case '1':
        books.push([11,"Hello C++",'john smith',60.0,20])
        console.log("Book Added Successfully");
        showMenu();
        break;
      case '2':
        editBook();
        showMenu();
        break;
      case '3':
       console.log("no books selected");
       showMenu();
        break;
      case '4':
        displayBooks();
        showMenu();
        break;
      case '5':
        const searchResult = findBook(3, 'Zero to One', 'John Smith');

        if (searchResult.length > 0) {
          console.log('Book Found:');
          searchResult.forEach(book => {
            console.log(`Book ID: ${book[0]}, Title: ${book[1]}, Author: ${book[2]}, Price: ${book[3]}, Quantity: ${book[4]}`);
          });
        } else {
          console.log('Book Not Found.');
        }
        showMenu();
        break;
      case '6':
        console.log("silling one");
        const currentBalance = 200; // Replace with the actual balance
        sellBook('Clean Code', 3, currentBalance);
        console.log("selling 2");
        sellBook(`You don't know JS`, 3, 100);
        break;
      case '7':
        rl.close();
        break;
      default:
        console.log('Invalid option. Please try again.');
        showMenu();
    }
  });
}

// Start the program
showMenu();


/*
sample output:
1. Add Book     
2. Edit Book    
3. Delete Book  
4. Display Books
5. Search Books 
6. Sell Book    
7. Exit
Choose an option: 1
Book Added Successfully

1. Add Book
2. Edit Book
3. Delete Book
4. Display Books
5. Search Books
6. Sell Book
7. Exit
Choose an option: 4
Book Id | Title | Author | Price | Quantity
1 | Start with why | Simon Sinek | 80 | 13
2 | But how do it know | J. Clark Scott | 59.9 | 22
3 | Clean Code | Robert Cecil Martin | 50 | 5
4 | Zero to One | Peter Thiel | 45 | 12
5 | You don't know JS | Kyle Simpson | 39.9 | 9
11 | Hello C++ | john smith | 60 | 20

1. Add Book
2. Edit Book
3. Delete Book
4. Display Books
5. Search Books
6. Sell Book
7. Exit
Choose an option: 5
Book Found:
Book ID: 3, Title: Clean Code, Author: Robert Cecil Martin, Price: 50, Quantity: 5
Book ID: 4, Title: Zero to One, Author: Peter Thiel, Price: 45, Quantity: 12

1. Add Book
2. Edit Book
3. Delete Book
4. Display Books
5. Search Books
6. Sell Book
7. Exit
Choose an option: 6
silling one
The Bill
Book Title: Clean Code
Book ID: 3
Quantity: 3
Total Price: 150
Remaining Balance: 50

1. Add Book
2. Edit Book
3. Delete Book
4. Display Books
5. Search Books
6. Sell Book
7. Exit
Choose an option: selling 2
Insufficient balance to purchase the required quantity.

1. Add Book
2. Edit Book
3. Delete Book
4. Display Books
5. Search Books
6. Sell Book
7. Exit
Choose an option: 7
*/