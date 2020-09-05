module.exports = {
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
  },
};
