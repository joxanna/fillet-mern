const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const itemService = require('../services/item');
const { Item } = require('../models/item');

describe('Item Schema Tests', () => {
  let mongoServer;
  let validItemId = '507f1f77bcf86cd799439011';
  let itemId;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });
  
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('should create a new item successfully', async () => {
    const itemData = {
      name: 'Laptop',
      description: 'Sturdy laptop suitable for all needs.',
      price: 999.99,
      quantity: 10,
    };

    const item = await itemService.create(itemData);

    itemId = item._id;

    const itemDb = await Item.findOne({ name: 'Laptop' });

    expect(itemDb).not.toBeNull();
    expect(itemDb.name).toBe('Laptop');
    expect(itemDb.description).toBe('Sturdy laptop suitable for all needs.');
    expect(itemDb.price).toBe(999.99);
    expect(itemDb.quantity).toBe(10);
  });

  it('should not allow creating an item without a name', async () => {
    const invalidItemData = {
      description: 'Sturdy laptop suitable for all needs.',
      price: 999.99,
      quantity: 10,
    };

    let error;

    try {
      const item = await itemService.create(invalidItemData);
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.name).toBeDefined();
  });

  it('should not allow creating an item without a description', async () => {
    const invalidItemData = {
      name: 'Laptop',
      price: 999.99,
      quantity: 10,
    };

    let error;

    try {
      const item = await itemService.create(invalidItemData);
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.description).toBeDefined();
  });

  it('should not allow creating an item without a price', async () => {
    const invalidItemData = {
      name: 'Laptop',
      description: 'Sturdy laptop suitable for all needs.',
      quantity: 10,
    };

    let error;

    try {
      const item = await itemService.create(invalidItemData);
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.price).toBeDefined();
  });

  it('should throw an error if price is negative', async () => {
    const invalidItemData = {
      name: 'Smartwatch',
      description: 'Sturdy laptop suitable for all needs.',
      price: -199.99,
      quantity: 1,
    };

    let error;

    try {
      const item = await itemService.create(invalidItemData);
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.price).toBeDefined();
  });

  it('should not allow creating an item without a quanity', async () => {
    const invalidItemData = {
      name: 'Laptop',
      description: 'Sturdy laptop suitable for all needs.',
      price: 10,
    };

    let error;

    try {
      const item = await itemService.create(invalidItemData);
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.quantity).toBeDefined();
  });

  it('should throw an error if quantity is negative', async () => {
    const invalidItemData = {
      name: 'Smartwatch',
      description: 'Sturdy laptop suitable for all needs.',
      price: 199.99,
      quantity: -1,
    };

    let error;

    try {
      const item = await itemService.create(invalidItemData);
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.quantity).toBeDefined();
  });

  it('should read by id with valid id', async () => {
    const itemDb = await itemService.readById(itemId);

    expect(itemDb).not.toBeNull();
    expect(itemDb.name).toBe('Laptop');
    expect(itemDb.description).toBe('Sturdy laptop suitable for all needs.');
    expect(itemDb.price).toBe(999.99);
    expect(itemDb.quantity).toBe(10);
  });

  it('should return undefined for an invalid MongoDB ID', async () => {
    const itemDb = await itemService.readById("invalidID");
    const spy = jest.spyOn(Item, 'findById'); 

    expect(itemDb).toBeUndefined();
    expect(spy).not.toHaveBeenCalledWith();
  });

  it('should return undefined if the item is not found', async () => {
    const itemDb = await itemService.readById(validItemId);
    const spy = jest.spyOn(Item, 'findById'); 

    expect(itemDb).toBeUndefined();
    expect(spy).toHaveBeenCalledWith(validItemId);
  });

  it('should successfully update an item by ID', async () => {
    const updatedProps = { price: 1200, quantity: 999 };

    const updatedItem = await itemService.updateById(itemId, updatedProps);

    const itemDb = await Item.findById(itemId);
    expect(itemDb).not.toBeNull();
    expect(itemDb.price).toBe(updatedProps.price);
    expect(itemDb.quantity).toBe(updatedProps.quantity);
  });

  it('should throw an error if item is not found', async () => {
    await expect(itemService.updateById(validItemId, { price: 1500 }))
      .rejects
      .toThrow(`Cannot find item with ID: ${validItemId}`);
  });

  it('should ignore invalid properties and update valid ones', async () => {
    const updatedProps = { invalidProp: 'Some value', price: 1200 };

    const updatedItem = await itemService.updateById(itemId, updatedProps);

    expect(updatedItem.invalidProp).toBeUndefined();

    expect(updatedItem.price).toBe(updatedProps.price);
  });

  it('should throw an error if item is not found', async () => {
    await expect(itemService.deleteById(validItemId))
      .rejects
      .toThrow(`Cannot find item with ID: ${validItemId}`);
  });

  it('should throw an error if deletion fails', async () => {
    const mockFindByIdAndDelete = jest.spyOn(Item, 'findByIdAndDelete').mockResolvedValue(null);

    await expect(itemService.deleteById(itemId))
      .rejects
      .toThrow(`Failed to delete item with ID: ${itemId}`);

    mockFindByIdAndDelete.mockRestore();
  });

  it('should successfully delete an item by ID', async () => {
    const deletedItem = await itemService.deleteById(itemId);

    expect(deletedItem).not.toBeNull();

    const itemInDb = await Item.findById(itemId);
    expect(itemInDb).toBeNull();
  });
});
