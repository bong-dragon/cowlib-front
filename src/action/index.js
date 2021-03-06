import 'whatwg-fetch';

export const AUTH = "AUTH";
export const GET_BOOKS = "GET_BOOKS";
export const OWNER_ADD_BOOK = "OWNER_ADD_BOOK";
export const OWNER_DELETE_BOOK = "OWNER_DELETE_BOOK";
export const GUEST_RESERVE_BOOK = "GUEST_RESERVE_BOOK";
export const GUEST_CANCEL_BOOK = "GUEST_CANCEL_BOOK";
export const OWNER_BORROW_BOOK = "OWNER_BORROW_BOOK";
export const OWNER_CANCEL_BORROW_BOOK = "OWNER_CANCEL_BORROW_BOOK";
export const OWNER_RETURN_BOOK = "OWNER_RETURN_BOOK";
export const OWNER_CANCEL_RETURN_BOOK = "OWNER_CANCEL_RETURN_BOOK";


export function getAuthInfo(body) {
    return {
        type: AUTH,
        id: body.id,
        facebook_id: body.facebookId,
        name: body.name,
        profile: body.profile
    };
}

export function logout(value) {
    return {
        type: AUTH,
        id: null,
        name: null,
        profile: null
    };
}

export function getBooks(books) {
    return {
        type: GET_BOOKS,
        books: books
    };
}

export function addBook(book) {
    return {
        type: OWNER_ADD_BOOK,
        book: book
    };
}

export function deleteBook(callNumber) {
    return {
        type: OWNER_DELETE_BOOK,
        callNumber: callNumber
    };
}

export function reserveBook(reserveHistory, user) {
    return {
        type: GUEST_RESERVE_BOOK,
        reserveHistory: reserveHistory,
        user: user
    };
}

export function cancelBook(reserveHistory, user) {
    return {
        type: GUEST_CANCEL_BOOK,
        reserveHistory: reserveHistory,
        user: user
    };
}

export function borrowBook(borrow) {
    return {
        type: OWNER_BORROW_BOOK,
        borrow: borrow
    };
}


export function cancelBorrowBook(borrow) {
    
    console.log("done");
    console.log(borrow);
    
    return {
        type: OWNER_CANCEL_BORROW_BOOK,
        borrow: borrow
    };
}

export function returnBook(borrow) {
    return {
        type: OWNER_RETURN_BOOK,
        borrow: borrow
    };
}

export function cancelReturnBook(borrow) {
    return {
        type: OWNER_CANCEL_RETURN_BOOK,
        borrow: borrow
    };
}
