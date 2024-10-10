"use strict";
const { invalidUserNameHtml } = require(`./view`);

/**
 * Middleware to validate the username from the request body. Ensures the username is present, 
 * consists only of letters and numbers, is not too short, and is not a disallowed word.
 * If the username is invalid, responds with an appropriate error message.
 * @param {object} req The request object, containing the username to validate.
 * @param {object} res The response object, used to send a response if validation fails.
 * @param {function} next The next middleware function in the stack to be called if validation succeeds.
 */
const validateUsername = (req, res, next) => {
  const regex = /^[a-zA-Z0-9]+$/;
  const { username } = req.body;

  if (!username || username.length < 1) {
    res.send(invalidUserNameHtml(`Please enter a username`));
  } else if (!regex.test(username)) {
    res.send(
      invalidUserNameHtml(
        `Special characters are not allowed in the username field :  + ${username}`
      )
    );
  } else if (username.toLowerCase() === "dog") {
    res.send(
      invalidUserNameHtml(
        `Dog is not allowed in the username field : ${username}`
      )
    );
  } else {
    next(); 
  }
};

module.exports = { validateUsername };
