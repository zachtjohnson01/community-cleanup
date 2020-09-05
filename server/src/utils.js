const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports.createStore = () => {
  const connectionString =
    "postgres://postgres:climbquandary.14@localhost:5432/communitycleanup";
  const sequelize = new Sequelize(connectionString);

  class User extends Model {}

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
      },
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: "user", // We need to choose the model name
    }
  );

  class Event extends Model {}

  Event.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: "event", // We need to choose the model name
    }
  );

  Event.belongsToMany(User, { through: "event_attendees" });
  User.belongsToMany(Event, { through: "event_attendees" });

  // sequelize.sync();

  return { sequelize, User };
};