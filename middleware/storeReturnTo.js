// Return to the page you were on before login screen. Requires recovering session data since passport.js clears your session now after logging in.
const storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports = storeReturnTo;