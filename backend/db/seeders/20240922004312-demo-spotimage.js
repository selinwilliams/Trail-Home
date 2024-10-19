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
				url: "https://media.vrbo.com/lodging/21000000/20150000/20144400/20144303/a7c4d893.jpg?impolicy=resizecrop&rw=1200&ra=fit",
				preview: true,
			},
			{
				spotId: 1,
				url: "image url",
				preview: false,
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "SpotImages";
		return queryInterface.bulkDelete(options, null, {});
	},
};
