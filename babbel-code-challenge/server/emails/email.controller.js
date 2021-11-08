const express = require('express');
const router = express.Router();
const emailService = require('./email.service');


// routes
router.post('/add', generateEmail);
router.get('/', getAll);

module.exports = router;

async function generateEmail(req, res, next) {
    emailService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    emailService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}
