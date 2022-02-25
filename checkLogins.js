function checkLogin(req, res) {
    if (!loggedInUsers.includes(req.cookies.session)) {
        res.redirect('/login')
    } 
}

module.exports = {checkLogin}