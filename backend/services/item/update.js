const { Item } = require('../../models/item');

const updateById = async (itemId, props) => {
  try {
    const item = await Item.findById(itemId);
    if (!item) {
      throw new Error(`Cannot find item with ID: ${itemId}`);
    }

    const validProps = ['name', 'description', 'price', 'quantity'];
    for (const property in props) {
      if (validProps.includes(property)) {
        item[property] = props[property];
      } else {
        console.warn(`Ignoring invalid property: ${property}`);
      }
    }

    await item.save();

    console.log(`Item with ID: ${itemId} successfully updated`);
    return item;
  } catch (err) {
    console.error(`Error updating item with ID: ${itemId}`, err);
    throw err;
  }
};

module.exports = { updateById };
