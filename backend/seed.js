require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/annapurna_kitchen');
    console.log('MongoDB Connected for seeding...');

    // Clear existing users for a fresh seed
    await User.deleteMany();
    console.log('Cleared existing users.');

    const usersToCreate = [
      {
        name: 'System Admin',
        email: 'admin@annapurnakitchen.com',
        password: 'password123',
        role: 'admin',
      },
      {
        name: 'Restaurant Manager',
        email: 'manager@annapurnakitchen.com',
        password: 'password123',
        role: 'manager',
      },
      {
        name: 'Service Staff',
        email: 'staff@annapurnakitchen.com',
        password: 'password123',
        role: 'staff',
      }
    ];

    await User.create(usersToCreate);

    console.log('\n--- Seed Users Created Successfully! ---');
    console.log('1. Admin:   admin@annapurnakitchen.com   | pw: password123');
    console.log('2. Manager: manager@annapurnakitchen.com | pw: password123');
    console.log('3. Staff:   staff@annapurnakitchen.com   | pw: password123');
    console.log('------------------------------------------\n');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding DB:', error);
    process.exit(1);
  }
};

seedDB();
