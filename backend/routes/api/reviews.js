const express = require("express");
const { Spot, User, SpotImage, Review } = require("../../db/models");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { DATE, Model, where } = require("sequelize");
const spotimage = require("../../db/models/spotimage");
const spot = require("../../db/models/spot");

router.get("/current", async (req, res) => {
  const { user } = req;
  if (user) {
    const reviews = await Review.findAll({
      where: {
        userId: user.id,
      },
      include: [
        {
          model: User,
          attributes: [
            "id", "firstName", "lastName"
          ]
        },
        {
          model: Spot,
        },
      ],
    });
    res.json({
        reviews
    })
  }
});

module.exports = router;
