const bcrypt = require('bcrypt');
const hash = (password) => bcrypt.hash(password, 13);
const compare = (plainPassword, encryptedPassword) => bcrypt.compare(plainPassword, encryptedPassword);

module.exports = {
    hash,
    compare
};
