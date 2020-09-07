module.exports = {
  Event: {
    attendees: (event, __, { dataSources }) =>
      dataSources.siteAPI.getEventAttendeesByEvent({ event: event }),
  },
  EventAttendee: {
    type: (eventAttendee) => eventAttendee.event_attendee_type,
  },
  Query: {
    parks: (_, __, { dataSources }) => dataSources.parkAPI.getAllParks(),
    events: (_, __, { dataSources }) => dataSources.siteAPI.getAllEvents(),
    event: (_, { id }, { dataSources }) =>
      dataSources.siteAPI.getEventById({ eventId: id }),
    eventAttendees: (_, { eventId }, { dataSources }) =>
      dataSources.siteAPI.getEventAttendeesByEventId({ eventId: eventId }),
  },
  Mutation: {
    createUser: async (_, { input }, { dataSources }) => {
      const user = await dataSources.siteAPI.createUser({ input });

      if (!user)
        return {
          success: false,
          message: "failed to create user",
        };
      return {
        success: true,
        message: "user created",
        user,
      };
    },
    createEvent: async (_, { input }, { dataSources }) => {
      const event = await dataSources.siteAPI.createEvent({ input });

      if (!event)
        return {
          success: false,
          message: "failed to create event",
        };
      return {
        success: true,
        message: "event created",
        event,
      };
    },
    createEventAttendeeType: async (_, { input }, { dataSources }) => {
      const eventAttendeeType = await dataSources.siteAPI.createEventAttendeeType(
        { input }
      );

      if (!eventAttendeeType)
        return {
          success: false,
          message: "failed to create event attendee type",
        };
      return {
        success: true,
        message: "event attendee type created",
        eventAttendeeType,
      };
    },
    addAttendeeToEvent: async (_, { input }, { dataSources }) => {
      const attendee = await dataSources.siteAPI.addAttendeeToEvent({ input });

      if (!attendee)
        return {
          success: false,
          message: "failed to add attendee to event",
        };

      // console.log(attendee);

      return {
        success: true,
        message: "attendee added to event",
        attendee,
      };
    },
    updateEvent: async (_, args, { dataSources }) => {
      const event = await dataSources.siteAPI.updateEvent({ args });
      if (!event)
        return {
          success: false,
          message: "failed to update event",
        };
      return {
        success: true,
        message: "event updated",
        event,
      };
    },
  },
};
