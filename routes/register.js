const bcrypt = require('bcrypt')

app.get('/register', async (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    
    if (req.body.username && req.body.password) {
        const hashedPassword = await bcrypt.hash(req.body.password, 3)

        let query = connection.createQueryStringFromObject({
            table: 'user',
            name: req.body.username,
            password: hashedPassword
        })

        await connection.asyncquery(query)
        console.log('created');    

        res.redirect('/login');
    } else {
        res.redirect('/register');
    }

    
});