"use strict";

const { Spot } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await Spot.bulkCreate([
			{
				ownerId: 1,
				address: "56 Mountain View Road",
				city: "Aspen",
				state: "Colorado",
				country: "United States of America",
				lat: 39.1911,
				lng: -106.8175,
				name: "Rocky Mountain Retreat",
				description: "A cozy cabin with stunning views of the Rocky Mountains.",
				price: 250,
			},
			{
				ownerId: 1,
				address: "123 Disney Lane",
				city: "San Francisco",
				state: "California",
				country: "United States of America",
				lat: 37.7645358,
				lng: -122.4730327,
				name: "App Academy",
				description: "Place where web developers are created",
				price: 123,
			},
			{
				ownerId: 2,
				address: "987 Coastal Breeze Drive",
				city: "Cannon Beach",
				state: "Oregon",
				country: "United States of America",
				lat: 45.8918,
				lng: -123.9615,
				name: "Oceanfront Paradise",
				description: "Steps away from the beach with breathtaking sunsets.",
				price: 300,
			},
			{
				ownerId: 2,
				address: "345 Forest Trail",
				city: "Lake Placid",
				state: "New York",
				country: "United States of America",
				lat: 44.2795,
				lng: -73.9799,
				name: "Adirondack Haven",
				description: "Escape to a serene forest retreat with lake access.",
				price: 220,
			},
			{
				ownerId: 2,
				address: "102 Desert Oasis Lane",
				city: "Joshua Tree",
				state: "California",
				country: "United States of America",
				lat: 34.1347,
				lng: -116.3131,
				name: "Desert Escape",
				description: "Experience tranquility in this modern desert hideaway.",
				price: 180,
			},
			{
				ownerId: 2,
				address: "789 River Bend Path",
				city: "Gatlinburg",
				state: "Tennessee",
				country: "United States of America",
				lat: 35.7143,
				lng: -83.5102,
				name: "Smoky Mountain Retreat",
				description: "Charming cabin nestled in the Smoky Mountains.",
				price: 200,
			},
			{
				ownerId: 1,
				address: "202 Prairie Sky Avenue",
				city: "Moab",
				state: "Utah",
				country: "United States of America",
				lat: 38.5733,
				lng: -109.5498,
				name: "Arches Adventure Cabin",
				description: "Close to national parks, perfect for stargazing.",
				price: 260,
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "Spots";
		return queryInterface.bulkDelete(options, null, {});
	},
};
