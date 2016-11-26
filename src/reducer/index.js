import {AUTH, GET_BOOKS, ADD_BOOK, DELETE_CALLNUMBER} from '../action'
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
        case ADD_BOOK:
            return Object.assign({}, state, {
                books: [...state.books,
                    action.book
                ]
            });
        case DELETE_CALLNUMBER:
            return Object.assign({}, state, {
                books: _.without(state.books, findCallNumberContain(state.books, action.callNumber))
            });
        default:
            return state;
    }
};

function findCallNumberContain(books, callNumber) {
    return _.find(books, function (book) {
        return book.callNumber && book.callNumber.id === callNumber.id
    })
}

const cowlib = combineReducers({
    auth, shelves
});

export default cowlib;