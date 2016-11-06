import {AUTH} from '../action'
import {combineReducers} from 'redux'

// local db
const authInitialState = {
    user_id: 0,
    facebook_id: "",
    name: "",
    profile: ""
};

const auth = (state = authInitialState, action) => {
    switch (action.type){
        case AUTH:
            return Object.assign({}, state, {
                user_id : action.user_id,
                facebook_id: action.facebook_id,
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