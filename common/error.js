module.exports = (err, res) => res.status(500).json({message: 'There was a problem with your request.', err});
