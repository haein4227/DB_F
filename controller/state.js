const pool = require("../DB/db");

exports.getState = async (req, res) => {
  res.send({ 
    loggedIn: !!req.session.user,
    user: req.session.user || null
  });
};
