import {AUTH, GET_BOOKS, ADD_BOOK} from '../action'
import {combineReducers} from 'redux'

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
        default:
            return state;
    }
};


const cowlib = combineReducers({
    auth, shelves
});

export default cowlib;