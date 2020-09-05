const { DataSource } = require("apollo-datasource");
const { UserInputError } = require("apollo-server");

class SiteAPI extends DataSource {
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

  async getAllEvents() {
    const events = await this.store.Event.findAll();
    return events;
  }

  async getEventById(eventId) {
    const event = await this.store.Event.findOne({
      where: {
        id: eventId,
      },
    });
    return event;
  }

  async getEventAttendeesByEventId(eventId) {
    const attendees = await this.store.Event.getUsers({
      where: {
        id: eventId,
      },
    });
    return attendees;
  }

  async createUser(userInput) {
    const { name, email } = userInput.input;
    console.log(name);
    console.log(email);
    const user = await this.store.User.findOrCreate({
      where: {
        name: name,
        email: email,
      },
    });
    console.log(user[0]._options.isNewRecord);

    return user && user[0] ? user[0] : null;
  }
}

module.exports = SiteAPI;
