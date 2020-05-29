// Handler for POST to /signin endpoint
const signinHandler = (db, bcrypt) => (req, res) => {
    console.log('requested /signin');
    db.select('email', 'hash').from('login') // pull credentials from login table
        .where('email', '=', req.body.email) // from row with matching email
        // Validate login attempt
        .then(data => {
                // Get password comparison
                const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
                if(isValid){
                    // Return user info if valid sign in
                    return db.select('*').from('users')
                        .where('email', '=', req.body.email)
                        .then(user => {
                            res.json(user[0])
                        })
                        .catch(err => res.status(400).json('unable to get user'))
                }
                else res.status(400).json('wrong credentials');
        })
        .catch(err => res.status(400).json('wrong credentials'))
}


module.exports = signinHandler;