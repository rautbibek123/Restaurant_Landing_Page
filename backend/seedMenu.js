require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('./src/models/MenuItem');

const menuItemsData = [
  // Starters
  {
    category: "Starters",
    name: "Steamed Momo",
    nepali: "भाप मम",
    description: "Hand-crafted dumplings filled with seasoned chicken or vegetables, served with spiced tomato achar.",
    price: 350,
    badge: "Bestseller",
    isVegetarian: false,
    spicyLevel: 2,
    image: "/src/assets/images/momo.jpg",
  },
  {
    category: "Starters",
    name: "Jhol Momo",
    nepali: "झोल मम",
    description: "Tender momos submerged in a rich, tangy sesame-tomato broth. A Kathmandu street-food staple.",
    price: 400,
    badge: null,
    isVegetarian: true,
    spicyLevel: 3,
    image: "/src/assets/images/jhol_momo.jpg",
  },
  {
    category: "Starters",
    name: "Chicken Choila",
    nepali: "कुखुरा चोइला",
    description: "Flame-charred marinated chicken tossed with mustard oil, spices, ginger & fenugreek.",
    price: 480,
    badge: "Chef's Pick",
    isVegetarian: false,
    spicyLevel: 3,
    image: "/src/assets/images/choila.jpg",
  },
  {
    category: "Starters",
    name: "Aloo Chop",
    nepali: "आलु चप",
    description: "Crispy golden-fried potato patties stuffed with spiced filling, served with green chutney.",
    price: 250,
    badge: null,
    isVegetarian: true,
    spicyLevel: 1,
    image: "/src/assets/images/aloo_chop.jpg",
  },
  {
    category: "Starters",
    name: "Chatamari",
    nepali: "चतांमरी",
    description: "Nepal's own rice crepe — topped with minced meat, egg & spiced onions. The Newar pizza.",
    price: 420,
    badge: "Traditional",
    isVegetarian: false,
    spicyLevel: 2,
    image: "/src/assets/images/chatamari.jpg",
  },

  // Main Course
  {
    category: "Main Course",
    name: "Dal Bhat Thali",
    nepali: "दाल भात थाली",
    description: "Nepal's national meal — lentil soup, steamed rice, seasonal vegetables, achaar & papad. Refills included.",
    price: 650,
    badge: "Bestseller",
    isVegetarian: true,
    spicyLevel: 2,
    image: "/src/assets/images/dal_bhat.jpg",
  },
  {
    category: "Main Course",
    name: "Thakali Khana Set",
    nepali: "थकाली खाना सेट",
    description: "A feast from the Mustang highlands — buckwheat bread, saag, marinated mutton, pickle & kheer.",
    price: 850,
    badge: "Chef's Pick",
    isVegetarian: false,
    spicyLevel: 2,
    image: "/src/assets/images/thakali.jpg",
  },
  {
    category: "Main Course",
    name: "Chicken Sekuwa",
    nepali: "कुखुरा सेकुवा",
    description: "Juicy bone-in chicken marinated in yogurt & Himalayan spices, slow-grilled over charcoal.",
    price: 720,
    badge: null,
    isVegetarian: false,
    spicyLevel: 3,
    image: "/src/assets/images/sekuwa.jpg",
  },
  {
    category: "Main Course",
    name: "Saag Paneer",
    nepali: "साग पनीर",
    description: "Fresh cottage cheese simmered in a velvety spinach sauce seasoned with cumin, garlic & garam masala.",
    price: 580,
    badge: null,
    isVegetarian: true,
    spicyLevel: 1,
    image: "/src/assets/images/saag_paneer.jpg",
  },
  {
    category: "Main Course",
    name: "Kwati",
    nepali: "क्वाँटी",
    description: "A sacred Newari mixed-bean soup, slow-cooked with nine varieties of sprouted beans and fragrant spices.",
    price: 450,
    badge: "Traditional",
    isVegetarian: true,
    spicyLevel: 2,
    image: "/src/assets/images/kwati.jpg",
  },

  // Desserts
  {
    category: "Desserts",
    name: "Juju Dhau",
    nepali: "जुजु धौ",
    description: "The 'King Curd' from Bhaktapur — thick, creamy, slightly sweet yogurt set in clay pots. A royal indulgence.",
    price: 280,
    badge: "Bestseller",
    isVegetarian: true,
    spicyLevel: 0,
    image: "/src/assets/images/juju_dhau.jpg",
  },
  {
    category: "Desserts",
    name: "Rice Kheer",
    nepali: "खिर",
    description: "Slow-cooked rice pudding with saffron, cardamom, pistachios & rose water. Served warm or chilled.",
    price: 250,
    badge: null,
    isVegetarian: true,
    spicyLevel: 0,
    image: "/src/assets/images/kheer.jpg",
  },
  {
    category: "Desserts",
    name: "Sel Roti",
    nepali: "सेल रोटी",
    description: "Traditional ring-shaped rice bread, crispy outside and soft inside. Best enjoyed with Juju Dhau.",
    price: 220,
    badge: "Traditional",
    isVegetarian: true,
    spicyLevel: 0,
    image: "/src/assets/images/sel_roti.jpg",
  },

  // Drinks
  {
    category: "Drinks",
    name: "Masala Chai",
    nepali: "मसाला चिया",
    description: "Aromatic spiced milk tea brewed with cardamom, ginger, cinnamon & cloves. The Himalayan warm-up.",
    price: 150,
    badge: "Bestseller",
    isVegetarian: true,
    spicyLevel: 1,
    image: "/src/assets/images/chai.jpg",
  },
  {
    category: "Drinks",
    name: "Tongba",
    nepali: "टोङ्बा",
    description: "A warm Himalayan millet brew served in a bamboo vessel with a wooden straw. Earthy and unique.",
    price: 380,
    badge: "Traditional",
    isVegetarian: true,
    spicyLevel: 0,
    image: "/src/assets/images/tongba.jpg",
  },
  {
    category: "Drinks",
    name: "Mango Lassi",
    nepali: "म्यांगो लस्सी",
    description: "Thick, chilled yogurt blended with ripe Alphonso mangoes and a hint of cardamom.",
    price: 280,
    badge: null,
    isVegetarian: true,
    spicyLevel: 0,
    image: "/src/assets/images/lassi.jpg",
  }
];

const seedMenu = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/annapurna_kitchen');
    console.log('MongoDB Connected for Menu Seeding...');

    await MenuItem.deleteMany();
    console.log('Cleared existing menu items.');

    await MenuItem.insertMany(menuItemsData);
    console.log(`Successfully seeded ${menuItemsData.length} true menu items from your frontend data!`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding DB:', error);
    process.exit(1);
  }
};

seedMenu();
