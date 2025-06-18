const bcrypt = require('bcryptjs');

const hashed = bcrypt.hashSync("admin123", 10);
console.log("Hashed password:", hashed);
