const { Item } = require('../../models/item');

const create = async ({
  name,
  description,
  price,
  quantity
}) => {
  const item = await Item.create({
    name,
    description,
    price,
    quantity
  });
  return item;
};

module.exports = { create };