import 'whatwg-fetch';

export const AUTH = "AUTH";
export const GET_BOOKS = "GET_BOOKS";
export const OWNER_DELETE_BOOK = "OWNER_DELETE_BOOK";
export const OWNER_ADD_BOOK = "OWNER_ADD_BOOK";
export const GUEST_RESERVE_BOOK = "GUEST_RESERVE_BOOK";
export const GUEST_CANCEL_BOOK = "GUEST_CANCEL_BOOK";
export const OWNER_BORROW_BOOK = "OWNER_BORROW_BOOK";
export const OWNER_RETURN_BOOK = "OWNER_RETURN_BOOK";

export function getAuthInfo(body) {
    return {
        type: AUTH,
        user_id: body.id,
        facebook_id: body.facebookId,
        name: body.name,
        profile: body.profile
    };
}

export function logout(value) {
    return {
        type: AUTH,
        user_id: null,
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

export function deleteBook(callNumber) {
    return {
        type: OWNER_DELETE_BOOK,
        callNumber: callNumber
    };
}

export function addBook(book) {
    return {
        type: OWNER_ADD_BOOK,
        book: book
    };
}

export function reserveBook(reserveHistory, user) {
    return {
        type: GUEST_RESERVE_BOOK,
        reserveHistory: reserveHistory,
        user: user
    };
}

export function cancelBook(book) {
    return {
        type: GUEST_CANCEL_BOOK,
        book: book
    };
}

export function borrowBook(book) {
    return {
        type: OWNER_BORROW_BOOK,
        book: book
    };
}

export function returnBook(book) {
    return {
        type: OWNER_RETURN_BOOK,
        book: book
    };
}