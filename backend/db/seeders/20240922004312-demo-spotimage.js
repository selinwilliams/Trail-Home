"use strict";
const { SpotImage } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await SpotImage.bulkCreate([
			{
				spotId: 1,
				url: "image 1 url",
				preview: true,
			},
			{
				spotId: 1,
				url: "image 2 url",
				preview: false,
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "SpotImages";
		return queryInterface.bulkDelete(options, null, {});
	},
};
