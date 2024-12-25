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
				url: "https://images.unsplash.com/photo-1721222205991-d74bcb224330?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				preview: true,
			},
			{
				spotId: 2,
				url: "https://images.unsplash.com/photo-1542853647-47ad77242390?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				preview: false,
			},
			{
				spotId: 3,
				url: "https://images.unsplash.com/photo-1525113990976-399835c43838?q=80&w=2728&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				preview: true,
			},
			{
				spotId: 3,
				url: "https://images.unsplash.com/photo-1590725121839-892b458a74fe?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				preview: false,
			},
			{
				spotId: 4,
				url: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dg",
				preview: true,
			},
			{
				spotId: 4,
				url: "https://plus.unsplash.com/premium_photo-1722048811506-993a23cb1e24?q=80&w=2778&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				preview: false,
			},
			{
				spotId: 5,
				url: "https://images.unsplash.com/photo-1724931282671-2d3bcd6de8f2?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				preview: true,
			},
			{
				spotId: 5,
				url: "https://plus.unsplash.com/premium_photo-1686090449200-57266c6623a6?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				preview: false,
			},
			{
				spotId: 6,
				url: "https://images.unsplash.com/photo-1430285561322-7808604715df?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				preview: true,
			},
			{
				spotId: 6,
				url: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				preview: false,
			},
			{
				spotId: 7,
				url: "https://images.pexels.com/photos/29908652/pexels-photo-29908652/free-photo-of-charming-lakeside-house-in-lush-sapanca.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
				preview: true,
			},
			{
				spotId: 7,
				url: "https://images.pexels.com/photos/29887412/pexels-photo-29887412/free-photo-of-cozy-dining-area-with-rustic-charm-and-sunlit-view.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
				preview: false,
			},
			{
				spotId: 8,
				url: "https://images.pexels.com/photos/7877174/pexels-photo-7877174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
				preview: true,
			},
			{
				spotId: 8,
				url: "https://images.pexels.com/photos/29887339/pexels-photo-29887339/free-photo-of-cozy-bedroom-with-artistic-decor-and-drapes.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
				preview: false,
			},
			{
				spotId: 9,
				url: "https://images.pexels.com/photos/9899903/pexels-photo-9899903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
				preview: true,
			},
			{
				spotId: 9,
				url: "https://images.pexels.com/photos/7746653/pexels-photo-7746653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
				preview: false,
			},
			{
				spotId: 10,
				url: "https://images.pexels.com/photos/1977342/pexels-photo-1977342.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
				preview: true,
			},
			{
				spotId: 10,
				url: "https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
				preview: false,
			},
			{
				spotId: 11,
				url: "https://images.pexels.com/photos/10820243/pexels-photo-10820243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
				preview: true,
			},
			{
				spotId: 11,
				url: "https://images.pexels.com/photos/29887416/pexels-photo-29887416/free-photo-of-rustic-kitchen-shelf-with-glassware-and-mugs.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
				preview: false,
			},
			{
				spotId: 12,
				url: "https://images.pexels.com/photos/28927794/pexels-photo-28927794/free-photo-of-charming-tudor-style-house-in-christchurch.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
				preview: true,
			},
			{
				spotId: 12,
				url: "https://images.pexels.com/photos/29887352/pexels-photo-29887352/free-photo-of-cozy-outdoor-bedroom-with-modern-design.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
				preview: false,
			},
			{
				spotId: 13,
				url: "https://images.pexels.com/photos/1212053/pexels-photo-1212053.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
				preview: true,
			},
			{
				spotId: 13,
				url: "https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
				preview: false,
			},
			{
				spotId: 14,
				url: "https://images.pexels.com/photos/1131573/pexels-photo-1131573.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
				preview: true,
			},
			{
				spotId: 14,
				url: "https://images.pexels.com/photos/2826787/pexels-photo-2826787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
				preview: false,
			},
			{
				spotId: 15,
				url: "https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
				preview: true,
			},
			{
				spotId: 15,
				url: "https://images.pexels.com/photos/6806396/pexels-photo-6806396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
				preview: false,
			},
			{
				spotId: 16,
				url: "https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
				preview: true,
			},
			{
				spotId: 16,
				url: "https://images.pexels.com/photos/674580/pexels-photo-674580.jpeg",
				preview: false,
			},
			{
				spotId: 17,
				url: "https://images.pexels.com/photos/2980955/pexels-photo-2980955.jpeg",
				preview: true,
			},
			{
				spotId: 17,
				url: "https://images.pexels.com/photos/5825398/pexels-photo-5825398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
				preview: false,
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "SpotImages";
		return queryInterface.bulkDelete(options, null, {});
	},
};
