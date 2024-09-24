const express = require("express");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

const validateSignup = [
	check("email")
		.exists({ checkFalsy: true })
		.isEmail()
		.withMessage("Please provide a valid email."),
	check("username")
		.exists({ checkFalsy: true })
		.isLength({ min: 4 })
		.withMessage("Please provide a username with at least 4 characters."),
	check("username").not().isEmail().withMessage("Username cannot be an email."),
	check("password")
		.exists({ checkFalsy: true })
		.isLength({ min: 6 })
		.withMessage("Password must be 6 characters or more."),
	handleValidationErrors,
];

// Sign up
router.post("/", validateSignup, async (req, res) => {
	const { firstName, lastName, email, password, username } = req.body;

	const existingUser = await User.findOne({
		where: {
			[Op.or]: [{ email: email }, { username: username }],
		},
		attributes: { include: ["username", "email"] },
	});

	if (existingUser) {
		let errors = {};
		if (existingUser.email === email) {
			errors.email = "User with that email already exists";
		}
		if (existingUser.username === username) {
			errors.username = "User with that username already exists";
		}

		return res.status(500).json({
			message: "User already exists",
			errors,
		});
	}

	const hashedPassword = bcrypt.hashSync(password);
	const user = await User.create({
		firstName,
		lastName,
		email,
		username,
		hashedPassword,
	});

	const safeUser = {
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		username: user.username,
	};

	await setTokenCookie(res, safeUser);

	return res.status(201).json({
		user: safeUser,
	});
});

module.exports = router;
