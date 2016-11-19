import 'whatwg-fetch';

export const AUTH = "AUTH";

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

export function getLibBooksInfo() {
    return {
        type: AUTH,
        user_id: null,
        name: null,
        profile: null
    };
}