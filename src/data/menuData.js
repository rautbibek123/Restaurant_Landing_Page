import momoImg from '../assets/images/momo.jpg';
import jholMomoImg from '../assets/images/jhol_momo.jpg';
import choilaImg from '../assets/images/choila.jpg';
import alooChopImg from '../assets/images/aloo_chop.jpg';
import chatamariImg from '../assets/images/chatamari.jpg';
import dalBhatImg from '../assets/images/dal_bhat.jpg';
import thakaliImg from '../assets/images/thakali.jpg';
import sekuwaImg from '../assets/images/sekuwa.jpg';
import saagPaneerImg from '../assets/images/saag_paneer.jpg';
import kwatiImg from '../assets/images/kwati.jpg';
import jujuDhauImg from '../assets/images/juju_dhau.jpg';
import kheerImg from '../assets/images/kheer.jpg';
import selRotiImg from '../assets/images/sel_roti.jpg';
import chaiImg from '../assets/images/chai.jpg';
import tongbaImg from '../assets/images/tongba.jpg';
import lassiImg from '../assets/images/lassi.jpg';

export const menuCategories = ["All", "Starters", "Main Course", "Desserts", "Drinks"];

export const menuItems = [
  // Starters
  {
    id: 1,
    category: "Starters",
    name: "Steamed Momo",
    nepali: "भाप मम",
    description: "Hand-crafted dumplings filled with seasoned chicken or vegetables, served with spiced tomato achar.",
    price: 350,
    badge: "Bestseller",
    isVeg: false,
    spice: 2,
    image: momoImg,
  },
  {
    id: 2,
    category: "Starters",
    name: "Jhol Momo",
    nepali: "झोल मम",
    description: "Tender momos submerged in a rich, tangy sesame-tomato broth. A Kathmandu street-food staple.",
    price: 400,
    badge: null,
    isVeg: true,
    spice: 3,
    image: jholMomoImg,
  },
  {
    id: 3,
    category: "Starters",
    name: "Chicken Choila",
    nepali: "कुखुरा चोइला",
    description: "Flame-charred marinated chicken tossed with mustard oil, spices, ginger & fenugreek.",
    price: 480,
    badge: "Chef's Pick",
    isVeg: false,
    spice: 3,
    image: choilaImg,
  },
  {
    id: 4,
    category: "Starters",
    name: "Aloo Chop",
    nepali: "आलु चप",
    description: "Crispy golden-fried potato patties stuffed with spiced filling, served with green chutney.",
    price: 250,
    badge: null,
    isVeg: true,
    spice: 1,
    image: alooChopImg,
  },
  {
    id: 5,
    category: "Starters",
    name: "Chatamari",
    nepali: "चतांमरी",
    description: "Nepal's own rice crepe — topped with minced meat, egg & spiced onions. The Newar pizza.",
    price: 420,
    badge: "Traditional",
    isVeg: false,
    spice: 2,
    image: chatamariImg,
  },

  // Main Course
  {
    id: 6,
    category: "Main Course",
    name: "Dal Bhat Thali",
    nepali: "दाल भात थाली",
    description: "Nepal's national meal — lentil soup, steamed rice, seasonal vegetables, achaar & papad. Refills included.",
    price: 650,
    badge: "Bestseller",
    isVeg: true,
    spice: 2,
    image: dalBhatImg,
  },
  {
    id: 7,
    category: "Main Course",
    name: "Thakali Khana Set",
    nepali: "थकाली खाना सेट",
    description: "A feast from the Mustang highlands — buckwheat bread, saag, marinated mutton, pickle & kheer.",
    price: 850,
    badge: "Chef's Pick",
    isVeg: false,
    spice: 2,
    image: thakaliImg,
  },
  {
    id: 8,
    category: "Main Course",
    name: "Chicken Sekuwa",
    nepali: "कुखुरा सेकुवा",
    description: "Juicy bone-in chicken marinated in yogurt & Himalayan spices, slow-grilled over charcoal.",
    price: 720,
    badge: null,
    isVeg: false,
    spice: 3,
    image: sekuwaImg,
  },
  {
    id: 9,
    category: "Main Course",
    name: "Saag Paneer",
    nepali: "साग पनीर",
    description: "Fresh cottage cheese simmered in a velvety spinach sauce seasoned with cumin, garlic & garam masala.",
    price: 580,
    badge: null,
    isVeg: true,
    spice: 1,
    image: saagPaneerImg,
  },
  {
    id: 10,
    category: "Main Course",
    name: "Kwati",
    nepali: "क्वाँटी",
    description: "A sacred Newari mixed-bean soup, slow-cooked with nine varieties of sprouted beans and fragrant spices.",
    price: 450,
    badge: "Traditional",
    isVeg: true,
    spice: 2,
    image: kwatiImg,
  },

  // Desserts
  {
    id: 11,
    category: "Desserts",
    name: "Juju Dhau",
    nepali: "जुजु धौ",
    description: "The 'King Curd' from Bhaktapur — thick, creamy, slightly sweet yogurt set in clay pots. A royal indulgence.",
    price: 280,
    badge: "Bestseller",
    isVeg: true,
    spice: 0,
    image: jujuDhauImg,
  },
  {
    id: 12,
    category: "Desserts",
    name: "Rice Kheer",
    nepali: "खिर",
    description: "Slow-cooked rice pudding with saffron, cardamom, pistachios & rose water. Served warm or chilled.",
    price: 250,
    badge: null,
    isVeg: true,
    spice: 0,
    image: kheerImg,
  },
  {
    id: 13,
    category: "Desserts",
    name: "Sel Roti",
    nepali: "सेल रोटी",
    description: "Traditional ring-shaped rice bread, crispy outside and soft inside. Best enjoyed with Juju Dhau.",
    price: 220,
    badge: "Traditional",
    isVeg: true,
    spice: 0,
    image: selRotiImg,
  },

  // Drinks
  {
    id: 14,
    category: "Drinks",
    name: "Masala Chai",
    nepali: "मसाला चिया",
    description: "Aromatic spiced milk tea brewed with cardamom, ginger, cinnamon & cloves. The Himalayan warm-up.",
    price: 150,
    badge: "Bestseller",
    isVeg: true,
    spice: 1,
    image: chaiImg,
  },
  {
    id: 15,
    category: "Drinks",
    name: "Tongba",
    nepali: "टोङ्बा",
    description: "A warm Himalayan millet brew served in a bamboo vessel with a wooden straw. Earthy and unique.",
    price: 380,
    badge: "Traditional",
    isVeg: true,
    spice: 0,
    image: tongbaImg,
  },
  {
    id: 16,
    category: "Drinks",
    name: "Mango Lassi",
    nepali: "म्यांगो लस्सी",
    description: "Thick, chilled yogurt blended with ripe Alphonso mangoes and a hint of cardamom.",
    price: 280,
    badge: null,
    isVeg: true,
    spice: 0,
    image: lassiImg,
  },
];

export const specials = [
  {
    id: 1,
    name: "Himalayan Feast",
    nepali: "हिमाली दावत",
    description: "A curated 6-course tasting experience through the flavors of every Nepali region. Perfect for two.",
    price: 2200,
    tag: "Weekend Special",
  },
  {
    id: 2,
    name: "Dashain Thali",
    nepali: "दसैँ थाली",
    description: "Celebrate Nepal's greatest festival with a ceremonial spread: mutton, rice, lentils & sweets.",
    price: 1200,
    tag: "Festival Menu",
  },
  {
    id: 3,
    name: "Chef's Sekuwa Platter",
    nepali: "सेकुवा प्लेटर",
    description: "A grand sharing platter of charcoal-grilled chicken, lamb & vegetables with house sauces.",
    price: 1500,
    tag: "Chef's Pick",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Food Blogger",
    text: "Annapurna Kitchen transported me straight to the streets of Kathmandu. The Jhol Momo is life-changing. Best Nepali food I've had outside Nepal!",
    rating: 5,
    avatar: "PS",
  },
  {
    id: 2,
    name: "James Mitchell",
    role: "Travel Journalist",
    text: "The Thakali Khana Set is a masterpiece. Authentic flavors, warm hospitality, and an atmosphere that makes you feel like you're dining in the Himalayas.",
    rating: 5,
    avatar: "JM",
  },
  {
    id: 3,
    name: "Anita Gurung",
    role: "Regular Guest",
    text: "Dal Bhat Thali with unlimited refills — that's the definition of happiness. I come here every week. The staff feels like family.",
    rating: 5,
    avatar: "AG",
  },
  {
    id: 4,
    name: "Rajan Thapa",
    role: "Chef & Restaurateur",
    text: "As a chef myself, I respect the authenticity here. They haven't compromised tradition for trends. The Juju Dhau alone is worth the visit.",
    rating: 5,
    avatar: "RT",
  },
  {
    id: 5,
    name: "Sophie Laurent",
    role: "Cultural Tourist",
    text: "I visited Nepal last year and missed the food terribly. Annapurna Kitchen has filled that void perfectly. The Choila is addictive!",
    rating: 5,
    avatar: "SL",
  },
];

export const galleryImages = [
  { id: 1, image: momoImg, label: "Momo Feast", size: "large", desc: 'Steamed & Jhol Momo' },
  { id: 2, image: dalBhatImg, label: "Dal Bhat", size: "small", desc: "Nepal's national dish" },
  { id: 3, image: kheerImg, label: "Sweet Endings", size: "small", desc: 'Rice Kheer' },
  { id: 4, image: thakaliImg, label: "Thakali Set", size: "medium", desc: 'Mustang highlands feast' },
  { id: 5, image: sekuwaImg, label: "Sekuwa Grill", size: "small", desc: 'Charcoal-grilled perfection' },
  { id: 6, image: saagPaneerImg, label: "Himalayan Greens", size: "medium", desc: 'Saag Paneer' },
  { id: 7, image: jujuDhauImg, label: "Juju Dhau", size: "small", desc: 'King Curd from Bhaktapur' },
  { id: 8, image: chaiImg, label: "Masala Chai", size: "small", desc: 'Himalayan spiced tea' },
  { id: 9, image: chatamariImg, label: "Newari Chatamari", size: "medium", desc: 'Traditional Rice Crepe' },
];
