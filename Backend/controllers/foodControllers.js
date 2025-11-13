import Food from '../models/foodModel.js';
import fs from 'fs';

// Add Food item
const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({ success: false, message: 'Image is required' });
    }
    
    const image_filename = `${req.file.filename}`;
    await Food.create({
      Food_Name: req.body.name,
      description: req.body.description,
      Amount: req.body.price,
      Category: req.body.category,
      image: image_filename,
    });
    res.json({ success: true, message: 'Food Saved' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error Occured: ' + error.message });
  }
};

// all food list
const listFood = async (req, res) => {
  try {
    const foodItem = await Food.findAll();
    // Transform to match frontend expectations
    const transformedItems = foodItem.map(item => {
      const json = item.toJSON();
      return {
        _id: json.Food_id,
        id: json.Food_id,
        name: json.Food_Name,
        price: parseFloat(json.Amount),
        category: json.Category,
        description: json.description || '',
        image: json.image || '',
      };
    });
    res.json({ foodItem: transformedItems });
  } catch (error) {
    console.log(error);
    res.json({ message: 'Error' });
  }
};

//remove
const removeFood = async (req, res) => {
  try {
    // Accept both id and _id for flexibility
    const itemId = req.body.id || req.body._id;
    console.log('Remove request received:', { id: itemId, body: req.body });
    
    if (!itemId) {
      return res.json({ success: false, message: 'Item ID is required' });
    }
    
    const food = await Food.findByPk(itemId);
    if (food) {
      if (food.image) {
        fs.unlink(`uploads/${food.image}`, () => {});
      }
      await food.destroy();
      res.json({ success: true, message: 'Item has been removed' });
    } else {
      console.log('Food item not found with ID:', itemId);
      res.json({ success: false, message: 'Item not found' });
    }
  } catch (error) {
    console.log('Error in removeFood:', error);
    res.json({ success: false, message: 'Error occurred', error: error.message });
  }
};

export { addFood, listFood, removeFood };
