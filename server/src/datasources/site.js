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

  async getEventAttendeesByEventId(input) {
    const { eventId } = input;
    const attendees = await this.store.EventAttendee.findAll({
      where: {
        eventId: eventId,
      },
    });
    return attendees;
  }
  async getEventAttendeesByEvent(input) {
    const { event } = input;
    const attendees = await this.store.EventAttendee.findAll({
      include: [this.store.User, this.store.EventAttendeeType],
      where: {
        eventId: event.id,
      },
    });
    return attendees;
  }

  async createUser(userInput) {
    const { name, email } = userInput.input;
    const user = await this.store.User.findOrCreate({
      where: {
        name: name,
        email: email,
      },
    });

    // console.log(user[0]._options.isNewRecord);

    return user && user[0] ? user[0] : null;
  }

  async createEvent(eventInput) {
    const { name, location } = eventInput.input;

    const event = await this.store.Event.create({
      name: name,
      location: location,
    });

    return event && event ? event : null;
  }
  async updateEvent(eventInput) {
    console.log(eventInput.args.input);
    const { id, name, location } = eventInput.args.input;

    await this.store.Event.update(
      { name: name, location: location },
      { where: { id: id } }
    );

    const event = await this.store.Event.findOne({
      where: {
        id: id,
      },
    });

    return event;
  }
  async createEventAttendeeType(eventAttendeeTypeInput) {
    const { name } = eventAttendeeTypeInput.input;

    const eventAttendeeType = await this.store.EventAttendeeType.create({
      name: name,
    });

    return eventAttendeeType && eventAttendeeType ? eventAttendeeType : null;
  }

  async addAttendeeToEvent(attendeeInput) {
    const { eventId, userId, attendeeTypeId } = attendeeInput.input;

    const event = await this.store.Event.findOne({
      where: {
        id: eventId,
      },
    });

    const eventAttendeeType = await this.store.EventAttendeeType.findOne({
      where: {
        id: attendeeTypeId,
      },
    });

    const user = await this.store.User.findOne({
      where: {
        id: userId,
      },
    });

    await event.addAttendee(user);

    const attendee = await this.store.EventAttendee.findOne({
      where: {
        userId: userId,
        eventId: eventId,
      },
    });

    await attendee.update({
      eventAttendeeTypeId: attendeeTypeId,
    });

    return { event: event, user: user, type: eventAttendeeType };
  }
}

module.exports = SiteAPI;
