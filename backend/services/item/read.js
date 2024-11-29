const { Item } = require('../../models/item');

const { isNilOrEmpty } = require('ramda-adjunct');
const { isMongoId } = require('validator');

const readById = async (itemId) => {
  if (!isMongoId(`${itemId}`)) {
    console.log(`Item ID: ${itemId} is not a valid MongoID`);
    return undefined;
  }

  try {
    const item = await Item.findById(itemId);

    if (isNilOrEmpty(item)) {
      console.log(`Cannot find item with id: ${itemId}`);
      return undefined;
    }

    return item;

  } catch (err) {
    console.error(`Error retrieving item with id: ${itemId}`, err);
    throw new Error(`Error retrieving item with id: ${itemId}`);
  }
};

const readAll = async () => {
  return Item.find();
};

module.exports = { readById, readAll };