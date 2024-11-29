const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const itemService = require('../services/item');
const { Item } = require('../models/item');

describe('Item Schema Tests', () => {
  let mongoServer;

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
});
