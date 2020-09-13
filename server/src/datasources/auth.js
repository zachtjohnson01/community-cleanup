const { DataSource } = require("apollo-datasource");
const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const basicAuth = require("basic-auth");
const jwt = require("jsonwebtoken");

class AuthAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  async authenticateUser(event) {
    const { name, pass } = basicAuth(event);
    // TODO: store secret in a more secure place
    const secret = "#rS8C$Vh+{[K,-+";
    const user = await this.store.User.findOne({
      where: {
        email: {
          [Sequelize.Op.iLike]: name,
        },
      },
    });
    if (user) {
      const passwordsMatch = await bcrypt.compare(pass, user.password);
      if (passwordsMatch) {
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          secret
        );

        return {
          token: token,
        };
      }
    }
    throw new Error("Incorrect email/password combination");
  }
}

module.exports = AuthAPI;
