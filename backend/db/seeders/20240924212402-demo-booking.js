'use strict';

const { Booking } = require("../models");


let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate(
      [
        {
          spotId: 1,
          userId: 2,
          startDate: "2024-9-25",
          endDate: "2024-9-28",
        },

      ],
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    return queryInterface.bulkDelete(
      options,
      null,
      {}
    )
  }
};
