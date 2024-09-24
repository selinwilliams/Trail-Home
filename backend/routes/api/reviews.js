const express = require("express");
const { Spot, User, SpotImage, Review, ReviewImage} = require("../../db/models");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { DATE, Model, where } = require("sequelize");
const spotimage = require("../../db/models/spotimage");
const spot = require("../../db/models/spot");

//Get all reviews by a Spot's id
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
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: Spot,
        },
      ],
    });
    res.json({
      reviews,
    });
  }
});

//Add an Image to a Review based on the Review's id
router.post("/:reviewId/images", async (req, res) => {
  const { user } = req;

  if (user) {
    const { url } = req.body;
    const review = await Review.findByPk(req.params.reviewId);
    if (review) {
      if (review.reviewId === user.id) {
        console.log("how about this one")
        const newImage = await ReviewImage.create({
          reviewId: review.id,
          url,
        });
        console.log("debugggin")
        res.status(201).json({
          id: newImage.id,
          url: newImage.url,
        });
      } else {
        res.status(404).json({ message: "Review couldn't be found" });
      }
    } else {
      res.status(403).json({ message: "Maximum number of images for this resource was reached"});
    }
  }
});

module.exports = router;
