import 'whatwg-fetch';

export const AUTH = "AUTH";


export function login() {

    function facebookPopup() {
        var URL = "/auth/facebook";
        var title = "페이스북";
        var status = "scrollbars=no, status=no;";
        window.open(URL, title, status);
    }
    facebookPopup();
    return {
        type: AUTH,
        user_id:  "",
        name: "",
        profile: ""
    };
}

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