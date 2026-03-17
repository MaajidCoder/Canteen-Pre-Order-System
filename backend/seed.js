const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Food = require("./models/Food");

dotenv.config();

const dummyFoods = [
  {
    name: "Classic Cheese Burger",
    price: 120,
    category: "Meals",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
    available: true
  },
  {
    name: "Extra Spicy Peri-Peri Fries",
    price: 80,
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=800",
    available: true
  },
  {
    name: "Classic Cold Coffee",
    price: 60,
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=800",
    available: true
  },
  {
    name: "Grilled Paneer Sandwich",
    price: 90,
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800",
    available: true
  },
  {
    name: "Veg Hakka Noodles",
    price: 110,
    category: "Meals",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800",
    available: true
  },
  {
    name: "Chocolate Lava Cake",
    price: 75,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800",
    available: false
  },
  {
    name: "Fresh Watermelon Juice",
    price: 50,
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1563229871-ca41505d97f6?w=800",
    available: true
  },
  {
    name: "Samosa (2pcs)",
    price: 30,
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1601050633647-81a35d37c331?w=800",
    available: true
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");
    
    // Clear existing data
    await Food.deleteMany({});
    console.log("Cleared existing menu items.");
    
    // Insert dummy data
    await Food.insertMany(dummyFoods);
    console.log("Successfully seeded dummy menu items!");
    
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedData();
