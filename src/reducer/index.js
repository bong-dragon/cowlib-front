import {AUTH} from '../action'
import {combineReducers} from 'redux'

// local db
const authInitialState = {
    user_id: 0,
    name: "",
    profile: ""
};

const auth = (state = authInitialState, action) => {
    switch (action.type){
        case AUTH:
            return Object.assign({}, state, {
                user_id : action.user_id,
                name : action.name,
                profile : action.profile
            });
        default:
            return state;
    }
};

const cowlib = combineReducers({
    auth
});

export default cowlib;