const { Item } = require('../../models/item');

const deleteById = async (itemId) => {
  try {
    const item = await Item.findById(itemId);
    if (!item) {
      throw new Error(`Cannot find item with ID: ${itemId}`);
    }

    const deletedItem = await Item.findByIdAndDelete(itemId);
    if (!deletedItem) {
      throw new Error(`Failed to delete item with ID: ${itemId}`);
    }

    console.log(`Deleted item with ID: ${itemId}`);
    return deletedItem;
  } catch (err) {
    console.error(`Error deleting item with ID: ${itemId}`, err);
    throw err;
  }
};

module.exports = { deleteById };
