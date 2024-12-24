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
				url: "https://images.unsplash.com/photo-1609319172668-8b4f021f3b7b?q=80&w=3688&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				preview: true,
			},
			{
				spotId: 1,
				url: "https://images.unsplash.com/photo-1571781418606-70265b9cce90?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				preview: false,
			},
			{
				spotId: 2,
				url: "https://images.unsplash.com/photo-1721222205991-d74bcb224330?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",  // Replace with actual image URLs
				preview: true,
			},
			{
				spotId: 2,
				url: "https://images.unsplash.com/photo-1542853647-47ad77242390?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",  // Replace with actual image URLs
				preview: false,
			},
			{
				spotId: 3,
				url: "https://images.unsplash.com/photo-1525113990976-399835c43838?q=80&w=2728&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",  // Replace with actual image URLs
				preview: true,
			},
			{
				spotId: 3,
				url: "https://images.unsplash.com/photo-1590725121839-892b458a74fe?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",  // Replace with actual image URLs
				preview: false,
			},
			{
				spotId: 4,
				url: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dg",  // Replace with actual image URLs
				preview: true,
			},
			{
				spotId: 4,
				url: "https://plus.unsplash.com/premium_photo-1722048811506-993a23cb1e24?q=80&w=2778&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",  // Replace with actual image URLs
				preview: false,
			},
			{
				spotId: 5,
				url: "https://images.unsplash.com/photo-1724931282671-2d3bcd6de8f2?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",  // Replace with actual image URLs
				preview: true,
			},
			{
				spotId: 5,
				url: "https://plus.unsplash.com/premium_photo-1686090449200-57266c6623a6?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",  // Replace with actual image URLs
				preview: false,
			},
			{
				spotId: 6,
				url: "https://images.unsplash.com/photo-1430285561322-7808604715df?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",  // Replace with actual image URLs
				preview: true,
			},
			{
				spotId: 6,
				url: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",  // Replace with actual image URLs
				preview: false,
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "SpotImages";
		return queryInterface.bulkDelete(options, null, {});
	},
};
