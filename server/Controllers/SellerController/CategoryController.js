const Category = require("../../models/CategoryModel");

module.exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if category with the same name already exists
    const existingCategory = await Category.findOne({ name });
    // console.log(existingCategory, "kerm che");

    if (existingCategory) {
      return res.status(400).json({ error: "Category already exists" });
    }

    // Create a new category
    const newCategory = new Category({ name });
    // console.log(newCategory, "helo");
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error getting all categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
