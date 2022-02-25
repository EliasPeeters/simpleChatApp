const mysql = require('mysql');
const bcrypt = require('bcrypt');
const {v4} = require('uuid');


app.get('/login', (req, res) => {
    res.render('login')
});

app.post('/login', async (req, res) => {

    if (req.body.username && req.body.password) {
        let query = `SELECT * FROM user WHERE name=${mysql.escape(req.body.username)}`;
        let result =  await connection.asyncquery(query)
        console.log(result)
        if (result.length == 0) {
            res.redirect('/login');
            return
        }
        

        const hashedPassword = await bcrypt.hash(req.body.password, 3)
        bcrypt.compare(req.body.password, result[0].password, (e, same) => {
            if (same) {
                let uuid = v4();
                loggedInUsers.push(uuid);
                res.cookie('session', uuid)
                res.redirect('/');
            } else {
                res.redirect('/login');
            }
        })

        console.log(result[0].password == hashedPassword)
        if (result[0].password == hashedPassword) {
            console.log('test')
        } else {
            
            return
        }
    
    } else {
        res.render('login')
    }
    
});
