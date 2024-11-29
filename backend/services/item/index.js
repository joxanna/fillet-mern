const { create } = require('./create');
const { readById, readAll } = require('./read');
const { deleteById } = require('./delete');
const { updateById } = require('./update');

module.exports = {
  create,
  readById,
  readAll,
  deleteById,
  updateById
};