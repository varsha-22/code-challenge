module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    console.log('---err---', err)
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }

    if (err.name === 'ValidationError') {
        // mongoose validation error
        return res.status(400).json({ message: err.message });
    }

    // default to 500 server error
    return res.status(500).json({ message: err.message });
}