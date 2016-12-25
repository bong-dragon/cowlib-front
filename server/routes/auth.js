import express from 'express';
import passport from 'passport';
import mysql from 'mysql';
import config from '../../config/config';
import 'isomorphic-fetch';


const router = express.Router();
const COWLIB_SERVER_API_URL = "http://localhost:8080"

// user profile
router.get('/', (req, res) => {
    res.json(req.cookies["cowlib-user"]);
});

// facebook login
router.get('/facebook', passport.authenticate('facebook', {scope: ['email', 'public_profile', 'user_friends']}));
router.get('/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/fail'
    }));

// after facebook login
router.get('/success', isLoggedIn, (req, res) => {
    let user_id = req.user.id;
    let photo = encodeURIComponent(req.user.photos[0].value);
    let name = encodeURIComponent(req.user.displayName);

    let url = `${COWLIB_SERVER_API_URL}/v1/auth?facebookId=${user_id}&profile=${photo}&name=${name}`;
    console.log(`url: ${url}`);

    fetch(url, {method:'post'}).then((response)=> response.json()).then((json) => {
        res.cookie('cowlib-user', json);
        res.redirect('/success.html');
    }).catch((ex) => console.log('parsing failed', ex));

});
router.get('/fail', (req, res) => {
    res.redirect('/fail.html');
});


// route for logging out
router.get('/logout', (req, res) => {
    req.logout(); // passport logout
    res.cookie('cowlib-user', {}); // cookie logout
    res.redirect('/');
});

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

export default router;