import 'whatwg-fetch';

export const AUTH = "AUTH";
export const GET_BOOKS = "GET_BOOKS";
export const ADD_BOOK = "ADD_BOOK";
export const DELETE_CALLNUMBER = "DELETE_CALLNUMBER";

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

export function deleteCallNumber(callNumber) {
    return {
        type: DELETE_CALLNUMBER,
        callNumber: callNumber
    };
}

export function addBook(book) {
    return {
        type: ADD_BOOK,
        book: book
    };
}