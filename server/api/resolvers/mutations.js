const { ApolloError } = require("apollo-server-express");
const { AuthenticationError } = require("apollo-server-express");
const bcrypt = require("bcryptjs");

function setCookie({ tokenName, token, res }) {
  res.cookie(tokenName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 2 // 2h
  });
}

function generateToken(user, secret) {
  const { id, email, fullname, bio } = user;
  return jwt.sign({ id, email, fullname, bio }, secret, {
    expiresIn: "6h"
  });
}

const jwt = require("jsonwebtoken");

const mutationResolvers = app => ({
  async signup(
    parent,
    { user: { fullname, email, password } },
    { pgResource, req }
  ) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await pgResource.createUser({
        fullname: fullname,
        email: email,
        password: hashedPassword
      });

      const token = generateToken(user, app.get("JWT_SECRET"));
      setCookie({
        tokenName: app.get("JWT_COOKIE_NAME"),
        token,
        res: req.res
      });

      return {
        token,
        user
      };
    } catch (e) {
      throw new AuthenticationError(e);
    }
  },

  async login(parent, { user: { email, password } }, { pgResource, req }) {
    try {
      const user = await pgResource.getUserAndPasswordForVerification(email);
      if (!user) throw "User not found.";
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw "Invalid Password!";

      const token = generateToken(user, app.get("JWT_SECRET"));

      setCookie({
        tokenName: app.get("JWT_COOKIE_NAME"),
        token,
        res: req.res
      });

      return {
        token,
        user
      };
    } catch (e) {
      throw new AuthenticationError(e);
    }
  },

  logout(parent, args, context) {
    context.req.res.clearCookie(app.get("JWT_COOKIE_NAME"));
    return true;
  },

  async addItem(parent, { item }, { pgResource, user }, info) {
    const newItem = await pgResource.saveNewItem({
      item: item,
      user
    });

    return newItem;
  }
});

module.exports = mutationResolvers;
