import 'whatwg-fetch';

export const AUTH = "AUTH";


export function login(value) {

    function facebookPopup() {
        var URL = "/auth/facebook";
        // var popOption = "width=370, he"
        window.open(URL, "", null);
    }
    facebookPopup();
    // async function facebook () {
    //     let response = await fetch('/auth/facebook', {
    //         method : 'get'
    //     }).catch(function (err) {
    //         console.log(err);
    //     })
    //     let body = await response.json();
    //     console.log(body);
    // }
    // facebook ();

    // event handling
    return {
        type: AUTH,
        user_id: value + 1,
        name: "",
        profile: ""
    };
}

export function logout(value) {

    // event handling
    return {
        type: AUTH,
        user_id: null,
        name: null,
        profile: null
    };
}