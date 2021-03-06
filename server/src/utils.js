const { Sequelize, DataTypes, Model } = require("sequelize");
const bcrypt = require("bcryptjs");

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
      password: {
        type: DataTypes.STRING,
        // allowNull defaults to true
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
      },
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: "event", // We need to choose the model name
    }
  );

  class EventAttendee extends Model {}
  EventAttendee.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      eventId: {
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      eventAttendeeTypeId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: "event_attendee", // We need to choose the model name
    }
  );

  Event.belongsToMany(User, {
    as: "Attendee",
    through: EventAttendee,
    foreignKey: "eventId",
  });
  User.belongsToMany(Event, { through: EventAttendee, foreignKey: "userId" });

  EventAttendee.belongsTo(User);
  // Event.hasMany(EventAttendee);

  class EventAttendeeType extends Model {}
  EventAttendeeType.init(
    {
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: "event_attendee_type", // We need to choose the model name
    }
  );

  EventAttendee.belongsTo(EventAttendeeType);

  // sequelize.sync();
  exports.handler = async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync("password", salt);
    await User.create({
      name: "Zach",
      email: "zachtjohnson01@gmail.com",
      password: hash,
    });
  };
  // const salt = bcrypt.genSaltSync(10);
  // const hash = bcrypt.hashSync("password", salt);
  // User.create({
  //   name: "Zach",
  //   email: "zachtjohnson01@gmail.com",
  //   password: hash,
  // });
  // sequelize.sync();
  // sequelize.sync({ force: true });

  return {
    sequelize,
    User,
    Event,
    EventAttendee,
    EventAttendeeType,
  };
};
