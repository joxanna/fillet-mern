const { Schema, model, SchemaType } = require('mongoose');

const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true
    }
  }
);

const Item = model('Item', itemSchema);
module.exports = { Item };