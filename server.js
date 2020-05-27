const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ],
}

app.get(
    '/',
    (req, res) => {
        console.log('requested /');
        res.send(database.users);
    }
)

app.post(
    '/signin',
    (req, res) => {
        console.log('requested /signin');
        // if(req.body.email === database.users[0].email &&
        //     req.body.password === database.users[0].password){
        //         res.json('success');
        //     }
        // else{
        //     res.status(400).json("error logging in")
        // }

        for(user of database.users){
            if(req.body.email === user.email &&
                req.body.password === user.password){
                    console.log("Signing in ", user.name)
                    return res.json(user);
                }
        }

        res.status(400).json("error logging in");


    }
)

app.post(
    '/register',
    (req, res) => {
        const {email, name, password} = req.body;
        database.users.push(
            {
                id: '125',
                name: name,
                email: email,
                password: password,
                entries: 0,
                joined: new Date()
            }
        )
        res.json(database.users[database.users.length - 1]);
        console.log(database.users);
    }
)

app.get(
    '/profile/:id',
    (req, res) => {
        const {id} = req.params;
        
        database.users.forEach(user => {
            if(user.id === id){
                return res.json(user);
            }
        })
        
        res.status(400).json('no such user');
        
    }
)

app.put(
    '/image',
    (req, res) => {
        const {id} = req.body;
        
        database.users.forEach(user => {
            if(user.id === id){
                user.entries++;
                return res.json(user.entries);
            }
        })

        res.status(400).json('user not found');
    }
)

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3001)