const bcrypt = require('bcrypt');

const generate = async (payload) => {
  return bcrypt.hash(payload, 10);
}

const compare = async (payload, hashed) => {
  return bcrypt.compare(payload, hashed);
}

module.exports = {
  generate,
  compare,
}
