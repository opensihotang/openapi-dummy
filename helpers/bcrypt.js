const bcrypt = require("bcryptjs");
const SALT = bcrypt.genSaltSync(10);

const hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword);
};
// console.log(hashPassword("test"));

const comparePassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

// console.log(
//   comparePassword(
//     "test",
//     "$2a$10$Jjpe5u05CdtIsU2dLLB.ne2Ncbc4GQJnLHK1PsVxa1OwoKgOhGfPm"
//   )
// );

module.exports = { hashPassword, comparePassword };
