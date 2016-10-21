import express from 'express';
import passport from 'passport';
import mysql from 'mysql';


const router = express.Router();

router.get('/success', isLoggedIn, (req, res) => {

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        port: '3306',
        database: 'cowlib'
    });

    connection.connect();

    connection.query('select * from user where facebook_id=?;', req.user.id, function (err, rows, fields) {
        if (rows.length == 0) {
            connection.query('insert into user (facebook_id) values(?);', req.user.id, function (err, rows, fields) {
                if (err) {
                    console.log("fail" + err);
                }
            });
        }
    });
    connection.end();

    res.redirect('/books/' + req.user.id);
});

router.get('/fail', isLoggedIn, (req, res) => {
    res.json({
        fail: "fail"
    });
});

router.get('/facebook', passport.authenticate('facebook', {scope: 'email'}));

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

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

export default router;