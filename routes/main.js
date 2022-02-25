let checkLogin = require('../checkLogins')


app.get('/', async (req, res) => {
    // res.sendFile(__dirname + '/index.html');
    checkLogin.checkLogin(req, res)

    let messages = await connection.asyncquery('SELECT * FROM chat');
    console.log(messages)

    res.render('main', {messages})
});
