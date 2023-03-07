function bookManager() {
    const books = [];

    function getIsStringsValid(...stringsArr) {
        return stringsArr.every((str) => typeof str === 'string' && !!str)
    }

    function addBook(title, author, pages, genre, publisher) {
        if (!getIsStringsValid(title, author, genre, publisher)) {
            return "PROVIDE VALID STRINGS"
        }

        if (typeof pages !== 'number') {
            return "PROVIDE VALID NUMBER FOR PAGES"
        }

        if (pages <= 0) {
            return "PAGES MUST BE MORE THA 0"
        }

        const newBook = {
            title: title,
            author: author,
            pages: pages,
            genre: genre,
            publisher: publisher,
            readCounnt: 0,
            rating: [],
            isTaken: false,
            takenBy: null,
        };
        books.push(newBook);
    }
    // - функция, която ще връща книга по подадено име(bookTitle)
    function getBook(bookTitle) {
        if (!getIsStringsValid(bookTitle)) {
            // TODO
            return "PROVIDE VALID BOOK TITLE"
        }
        return books.find(({ title }) => title === bookTitle)
    }
    // - функция, която дава книга за прочит на човек(bookTitle, personName)
    function getBookToRead(bookTitle, personName) {
        if (!getIsStringsValid(bookTitle, personName)) {
            return "PROVIDE VALID BOOK TITLE AND/OR PERSON NAME"
        }
        const requestedBook = getBook(bookTitle);

        if (!requestedBook) {
            return "BOOK DOES NOT EXIST"
        }
        if (personName.length === 0) {
            return "GIVE FULL NAME"
        }

        if (requestedBook.isTaken) {
            return "BOOK IS NOT AVAILABLE"
        }
        requestedBook.isTaken = true;
        requestedBook.takenBy = personName;

        return requestedBook;
    }

    function getAllBooks() {
        return books;
    }
    // - функция, чрез която човек ще връща книга(bookTitle)
    function returnBook(bookTitle) {

        if (!getIsStringsValid(bookTitle)) {
            return "PROVIDE VALID BOOK TITLE"
        }
        const bookToReturn = getBook(bookTitle);

        if (!bookToReturn) {
            return "THERE IS NO SUCH BOOK"
        }

        if (!bookToReturn.isTaken) {
            return "THIS BOOK IS NOT TAKEN"
        }

        bookToReturn.isTaken = false
        bookToReturn.takenBy = null;
        bookToReturn.readCounnt++;

        return bookToReturn;
    }
    // - функция, която ще връща автора по заглавие(bookTitle)
    function getAuthorByBookTitle(bookTitle) {
        if (!getIsStringsValid(bookTitle)) {
            return "PROVIDE VALID BOOK TITLE"
        }
        const book = getBook(bookTitle);

        if (!book) {
            return 'THERE IS NO BOOK'
        }

        return book.author
    }
    // - функция, която връща всички книги по подаден автор(authorName)
    function getAuthorBooks(authorName) {
        if (!getIsStringsValid(authorName)) {
            return 'PROVIDE VALID AUTHOR'
        }
        const authorBooks = books.filter(({ author }) => author === authorName)

        if (!authorBooks.length) {
            return `THERE IS NO BOOKS FROM ${authorName}`
        }
        return authorBooks;
    }
    // - функция, която връща най-четената книга на автор(authorName)
    function getMostReadBookAuthor(authorName) {
        const authorBooks = getAuthorBooks(authorName);
        authorBooks
        if (typeof authorBooks === 'string') {
            return authorBooks;
        }

        let bestBook = authorBooks[0];
        for (const book of authorBooks) {
            if (book.readCount > bestBook.readCount) {
                bestBook = book;
            }
        }

        return bestBook;
    }
    // - функция, която връща всички книги по подаден жанр(genre)
    function getBooksByGenre(requestGenre) {
        if (!getIsStringsValid(requestGenre)) {
            return "PROVIDE VALID GENRE"
        }
        const genreBooks = books.filter(({ genre }) => genre === requestGenre)

        if (!genreBooks.length) {
            return `THERE IS NOT BOOK IN GENRE: ${requestGenre}`
        }
        return genreBooks;

    }
    // - функция, която ще добавя рейтинг на книга(title, raint: 1-5)
    function rateBook(bookTitle, rating) {
        if (!(typeof rating === 'number' && rating >= 1 && rating <= 5)) {
            return 'PROVIDE VALID RATING'
        }

        const requestedBook = getBook(bookTitle);

        if (typeof requestedBook === 'string') {
            return requestedBook;
        }

        if (!requestedBook) {
            return 'THERE IS NO SUCH BOOK'
        }

        requestedBook.rating.push(rating)

        return requestedBook;
    }

    function calculateRating(book) {
        return book.rating.reduce((prev, curr) => prev + curr, 0) / book.rating.length
    }

    function transformBook(book) {
        return { ...book, rating: calculateRating(book) }
    }
    // 
    // - функция, която ще връща книга с най-добър рейтинг()
    function getBestBookByRating() {
        return books
            .filter((book) => !!book.rating.length)
            .map((book) => transformBook(book))
            .sort((firstBook, secondBook) => secondBook.rating > firstBook.rating ? 1 : -1)[0]
    }
    // - функция, която ще връща най-четената книга()

    function getMostReadBook() {
        return books.sort((firstBook, secondBook) => secondBook.readCounnt > firstBook.readCounnt ? 1 : -1)[0]
    }


    return {
        addBook,
        getBook,
        getBookToRead,
        getAllBooks,
        returnBook,
        getAuthorByBookTitle,
        getAuthorBooks,
        getMostReadBookAuthor,
        getBooksByGenre,
        rateBook,
        getBestBookByRating,
        getMostReadBook
    }
}

// {
//     title: string,
//     author: string,
//     pages: number,
//     genre: string,
//     publisher: string,
//     readCounnt: number,
//     rating:[number]
//     isTaken: bolean
//     takenBy: string || null
//     }

const manager = bookManager();
console.log("addBook: ", manager.addBook('Harry Potter', 'Rowling', 100, 'fantasy', 'BARD'))
console.log("addBook: ", manager.addBook('Harry Potter 2', 'Rowling', 100, 'fantasy', 'BARD'))
console.log("addBook: ", manager.addBook('Harry Potter 3', 'Rowling', 100, 'criminal', 'BARD'))
manager.getBookToRead('Harry Potter', 'Svetoslav')
manager.returnBook('Harry Potter')
manager.getBookToRead('Harry Potter', 'Svetoslav')
manager.returnBook('Harry Potter')
// console.log("getAllBooks: ", manager.getAllBooks())
// console.log("getAllBooks: ", manager.getAllBooks())
// console.log("getAuthorByBookTitle: ", manager.getAuthorByBookTitle('Harry Potter'))
// console.log("getAuthorBooks: ", manager.getAuthorBooks('Rowlingasdf'))
// console.log("getMostReadBookAuthor: ", manager.getMostReadBookAuthor('Rowling'))
// console.log("getBooksByGenre: ", manager.getBooksByGenre('criminal'))
manager.rateBook('Harry Potter', 2)
manager.rateBook('Harry Potter', 5)
manager.rateBook('Harry Potter 2', 2)
// console.log(manager.getBestBookByRating())
console.log("getMostReadBook: ", manager.getMostReadBook())
console.log("getAllBooks: ", manager.getAllBooks())
