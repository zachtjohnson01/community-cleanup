module.exports = {
  Query: {
    parks: (_, __, { dataSources }) => dataSources.parkAPI.getAllParks(),
  },
};
