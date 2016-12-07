import {
    AUTH, GET_BOOKS,
    OWNER_DELETE_BOOK,
    OWNER_ADD_BOOK,
    GUEST_RESERVE_BOOK,
    GUEST_CANCEL_BOOK,
    OWNER_BORROW_BOOK,
    OWNER_RETURN_BOOK,
    OWNER_BORROW_AGAIN_BOOK
} from '../action'

import {combineReducers} from 'redux'
import {_} from 'underscore'

// local db
const authInitialState = {
    id: 0,
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
                id: action.id,
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
        case OWNER_BORROW_BOOK:
            return Object.assign({}, state, {
                books: borrowBook(state.books, action.borrow)
            });
        case OWNER_RETURN_BOOK:
            return Object.assign({}, state, {
                books: returnBook(state.books, action.borrow)
            });
        case OWNER_BORROW_AGAIN_BOOK:
            return Object.assign({}, state, {
                books: borrowAgainBook(state.books, action.borrow, action.borrower)
            });
        case GUEST_RESERVE_BOOK:
            return Object.assign({}, state, {
                books: reserveBook(state.books, action.reserveHistory, action.user)
            });
        case GUEST_CANCEL_BOOK:
            return Object.assign({}, state, {
                books: cancelBook(state.books, action.reserveHistory, action.user)
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

function borrowBook(books, borrow) {
    for (var i in books) {
        if (books[i].callNumber.id === borrow.callNumberId) {
            console.log(`책을 빌려줍니다. (book:${books[i].callNumber.id})`);
            let reservers = books[i].reservers;
            let reserver = _.find(reservers, function (reserver) {
                return reserver.id && reserver.id == borrow.borrowerId
            });
            books[i].reservers = _.without(reservers, reserver)
            books[i].borrower = reserver;
            books[i].borrower.status = "OWNER_BORROW_BOOK";
        }
    }
    return Object.assign([], books);
}

function borrowAgainBook(books, borrow) {
    for (var i in books) {
        if (books[i].callNumber.id === borrow.callNumberId) {
            books[i].borrower.status = "OWNER_BORROW_BOOK";
            break;
        }
    }
    return Object.assign([], books);
}

function returnBook(books, borrow) {
    for (var i in books) {
        if (books[i].callNumber.id === borrow.callNumberId) {
            console.log(`책을 반납합니다. (book:${books[i].callNumber.id})`);
            books[i].borrower.status = "OWNER_RETURN_BOOK";
        }
    }
    return Object.assign([], books);
}

function reserveBook(books, reserveHistory, user) {
    for (var i in books) {
        if (books[i].callNumber.id === reserveHistory.callNumberId) {
            console.log(`책을 예약합니다 (book:${books[i].callNumber.id})`);
            books[i].reservers.push(user);
        }
    }
    return Object.assign([], books);
}

function cancelBook(books, reserveHistory, user) {
    for (var i in books) {
        if (books[i].callNumber.id === reserveHistory.callNumberId) {
            console.log(`책 예약을 취소합니다. (book:${books[i].callNumber.id})`);
            let reservers = books[i].reservers;
            books[i].reservers = _.without(reservers, _.find(reservers, function (reserver) {
                return reserver.id === user.id;
            }));
        }
    }
    return Object.assign([], books);
}

const cowlib = combineReducers({
    auth, shelves
});

export default cowlib;