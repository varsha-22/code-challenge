const db = require('_helpers/db');

const Email = db.Email;

module.exports = {
    getAll,
    create
};

async function getAll() {

    return await Email.find();
}

async function create(userParam) {
    // validate
    if (await Email.findOne({ email: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    const email = new Email(userParam);

    // save email
    await email.save();
}