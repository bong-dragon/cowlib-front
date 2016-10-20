import express from 'express';
import passport from 'passport';


const router = express.Router();

router.get('/success', isLoggedIn, (req, res) => {
    res.redirect('/books/'+ req.user.id);
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