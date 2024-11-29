const { Schema, model, SchemaType } = require('mongoose');

const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Item name is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be positive'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity must be positive'],
    }
  }
);

const Item = model('Item', itemSchema);
module.exports = { Item };