"use strict";

const { Booking } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await Booking.bulkCreate([
			{
				spotId: 1,
				userId: 2,
				startDate: "2021-11-19",
				endDate: "2021-11-20",
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "Bookings";
		return queryInterface.bulkDelete(options, null, {});
	},
};
