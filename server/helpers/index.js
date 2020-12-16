const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
module.exports = () => {


  const validateUserLog = (arr, email, password) => {
    let id = null;
    let username = null;
    if (arr.some(each => {
      if (each.email.toLowerCase()
        === email.toLowerCase()) {
        if (bcrypt.compareSync(password, each.password)) {
          id = each.id;
          username = each.username;
          return true;
        }
      }
      return false;
    })) return { id, username };
    return false;
  };
  const validateUserReg = (arr, email, password, username) => {
    if (arr.some((user) => {
      if (user.email.toLowerCase() === email.toLowerCase())
        return true;
      if (user.username === username)
        return true;
      return false;
    })) return false;
    return {
      id: arr.length + 1,
      email,
      password: bcrypt.hashSync(password, salt),
      favs: []
    };
  };

  const updateUserStocks = (json, stock) => {
    json.favs.push({...stock, date: new Date.getTime()});
    return json;
  }

  return {
    validateUserLog,
    validateUserReg,
    updateUserStocks
  };
};