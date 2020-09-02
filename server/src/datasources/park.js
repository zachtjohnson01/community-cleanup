const { RESTDataSource } = require("apollo-datasource-rest");

class ParkAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://data.cityofchicago.org/resource/";
  }

  parkReducer(park) {
    return {
      id: park.park_no,
      name: park.park,
      label: park.label,
      location: park.location,
      zip: park.zip,
    };
  }

  async getAllParks() {
    const response = await this.get("ejsh-fztr");

    return Array.isArray(response)
      ? response.map((park) => this.parkReducer(park))
      : [];
  }
}

module.exports = ParkAPI;
