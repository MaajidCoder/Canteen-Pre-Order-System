const express = require("express");
const router = express.Router();
const { getFoods, createFood, updateFood, deleteFood } = require("../controllers/foodController");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/", getFoods);
router.post("/", protect, admin, createFood);
router.put("/:id", protect, admin, updateFood);
router.delete("/:id", protect, admin, deleteFood);

module.exports = router;
