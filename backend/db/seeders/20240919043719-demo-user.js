"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
	async up(queryInterface, Sequelize) {
		await User.bulkCreate(
			[
				{
					email: "john.smith@gmail.com",
					username: "JohnSmith",
					hashedPassword: bcrypt.hashSync("password"),
					firstName: "John",
					lastName: "Smith",
				},
				{
					email: "user1@user.io",
					username: "Demo-lition",
					hashedPassword: bcrypt.hashSync("password"),
					firstName: "demo-Name",
					lastName: "demo-Lastname",
				},
			],
			{ validate: true }
		);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "Users";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
			},
			{}
		);
	},
};
