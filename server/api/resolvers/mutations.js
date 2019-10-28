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
  const { id, email } = user; // Omit the password from the token
  return jwt.sign({ id, email }, secret, {
    expiresIn: "6h"
  });
}

const jwt = require("jsonwebtoken");
// const authMutations = require("./auth");

const mutationResolvers = app => ({
  async signup(
    parent,
    {
      user: { fullname, email, password }
    },
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
      console.log("help");
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

  async login(
    parent,
    {
      user: { email, password }
    },
    { pgResource, req }
  ) {
    try {
      const user = await pgResource.getUserAndPasswordForVerification(
        args.user.email
      );
      if (!user) throw "User was not found.";

      const valid = false;
      const same = await bcrypt.compare(password, users[userID].password);
      if (same) {
        setCookie({
          name: tokenConfig.name,
          value: generateToken(
            { ...users[userID], id: userId },
            tokenConfig.secret
          ),
          res: req.res
        });
        return true;
      }
      if (!valid) throw "Invalid Password";

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
  async addItem(parent, { item }, { pgResource }, info) {
    // add awaits
    /**
     *  @TODO: Destructuring
     *
     *  The 'args' and 'context' parameters of this resolver can be destructured
     *  to make things more readable and avoid duplication.
     *
     *  When you're finished with this resolver, destructure all necessary
     *  parameters in all of your resolver functions.
     *
     *  Again, you may look at the user resolver for an example of what
     *  destructuring should look like.
     */

    // const user = await jwt.decode(context.token, app.get("JWT_SECRET"));

    const user = 1;
    const newItem = await pgResource.saveNewItem({
      item: item,
      user
    });

    return newItem;
  }
});

module.exports = mutationResolvers;
