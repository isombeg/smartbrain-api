const faceDetect = (Clarifai, app) => (req, res) => {
    console.log('requested /detect');
    
    const {imageUrl} = req.body;
    
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        imageUrl
    )
        .then(response => res.json(response))
        .catch(err => res.status(400).json("Error fulfilling prediction"));
}

module.exports = faceDetect;