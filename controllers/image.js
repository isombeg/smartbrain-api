// Handler pulls users submission count from users database
const imageHandler = db => (req, res) => {
    console.log('requested /image');
    
    const {id} = req.body;
    
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(
            entries => {
                if(entries.length)
                    res.json(entries[0]);
                else res.status(400).json("unable to get entries");
            }
        )
        .catch(err => res.status(400).json("unable to get entries"))
}

module.exports = imageHandler;