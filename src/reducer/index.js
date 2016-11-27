import { AUTH, GET_BOOKS, 
    OWNER_DELETE_BOOK, 
    OWNER_ADD_BOOK, 
    GUEST_RESERVE_BOOK,
    GUEST_CANCEL_BOOK,
    OWNER_BORROW_BOOK,
    OWNER_RETURN_BOOK } from '../action'

import {combineReducers} from 'redux'
import {_} from 'underscore'

// local db
const authInitialState = {
    user_id: 0,
    facebook_id: "",
    name: "",
    profile: ""
};

const shelvesInitialState = {
    books: []
};


const auth = (state = authInitialState, action) => {
    switch (action.type) {
        case AUTH:
            return Object.assign({}, state, {
                user_id: action.user_id,
                facebook_id: action.facebook_id,
                name: action.name,
                profile: action.profile
            });
        default:
            return state;
    }
};

const shelves = (state = shelvesInitialState, action) => {
    switch (action.type) {
        case GET_BOOKS:
            return Object.assign({}, state, {
                books: action.books
            });
        case OWNER_ADD_BOOK:
            return Object.assign({}, state, {
                books: [...state.books,
                    action.book
                ]
            });
        case OWNER_DELETE_BOOK:
            return Object.assign({}, state, {
                books: _.without(state.books, findCallNumberContain(state.books, action.callNumber))
            });
        case GUEST_RESERVE_BOOK:
            return Object.assign({}, state, {
                books: reserveBook(state.books, action.reserveHistory)
            })
        default:
            return state;
    }
};

function findCallNumberContain(books, callNumber) {
    return _.find(books, function (book) {
        return book.callNumber && book.callNumber.id === callNumber.id
    })
}

function reserveBook(books, reserveHistory) {
    for(var i in books) {
        if(books[i].callNumber.id === reserveHistory.callNumberId) {
            console.log(`책을 예약합니다 (book:${books[i].callNumber.id})`);
            // if(books[i].reservers){
            //     books[i].reservers.push(reserveHistory.reserverId);
            // }
            
        }
    }
    return books;
}

const cowlib = combineReducers({
    auth, shelves
});

export default cowlib;