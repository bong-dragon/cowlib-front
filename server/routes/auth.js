import express from 'express';
import passport from 'passport';
import mysql from 'mysql';
import config from '../../config/config';
import 'isomorphic-fetch';


const router = express.Router();

router.get('/success', isLoggedIn, (req, res) => {

    var callback = function () {
        var options = {
            root: __dirname + '/../../public'
        };
        res.sendFile('success.html', options, function (err) {
            if(err){
                console.log(err);
            }
        });
    };

    let user_id = req.user.id;
    let photo = req.user.photos[0].value;
    let name = req.user.displayName;

    fetch(`http://localhost:8080/auth?facebookId=${user_id}&profile=${photo}&name=${name}`, {
        method: 'POST',
    }).then(function (response) {
        return response.json();
    }).then(function (json) {
        callback();
    }).catch(function (ex) {
        console.log('parsing failed', ex)
    });

});

router.get('/fail', isLoggedIn, (req, res) => {
    res.json({
        fail: "fail"
    });
});

router.get('/facebook', passport.authenticate('facebook', {scope: ['email', 'public_profile', 'user_friends']}));

// handle the callback after facebook has authenticated the user
router.get('/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/fail'
    })
);

// route for logging out
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        //db에서 req.user.id 가지고 찾기
        res.json({
            id: 1234,
            profile: "photo url",
            name : "이경륜",
            bookmark : [
                1234123, 1231231
            ]
        })
    } else {
        res.statusCode(403);
    }
});


function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

export default router;