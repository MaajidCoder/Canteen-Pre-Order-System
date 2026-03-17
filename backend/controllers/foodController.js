const Food = require("../models/Food");

// @desc    Get all food items
// @route   GET /api/food
// @access  Public
exports.getFoods = async (req, res) => {
  try {
    const foods = await Food.find({});
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Add new food item
// @route   POST /api/food
// @access  Private/Admin
exports.createFood = async (req, res) => {
  const { name, price, image, category, available } = req.body;

  const food = new Food({
    name,
    price,
    image,
    category,
    available,
  });

  const createdFood = await food.save();
  res.status(201).json(createdFood);
};

// @desc    Update food item
// @route   PUT /api/food/:id
// @access  Private/Admin
exports.updateFood = async (req, res) => {
  const { name, price, image, category, available } = req.body;

  const food = await Food.findById(req.params.id);

  if (food) {
    food.name = name || food.name;
    food.price = price || food.price;
    food.image = image || food.image;
    food.category = category || food.category;
    food.available = available !== undefined ? available : food.available;

    const updatedFood = await food.save();
    res.json(updatedFood);
  } else {
    res.status(404).json({ message: "Food not found" });
  }
};

// @desc    Delete food item
// @route   DELETE /api/food/:id
// @access  Private/Admin
exports.deleteFood = async (req, res) => {
  const food = await Food.findById(req.params.id);

  if (food) {
    await food.deleteOne();
    res.json({ message: "Food removed" });
  } else {
    res.status(404).json({ message: "Food not found" });
  }
};
