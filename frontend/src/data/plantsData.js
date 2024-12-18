const plantsData = [
  // Indoor Plants
  { id: 1, name: 'Monstera', category: 'indoor', description: 'Indoor plant, easy to care', image: '/images/monstera.jpg', careTips: 'Water every 1-2 weeks, allow soil to dry between waterings. Thrives in bright, indirect sunlight.' },
  { id: 2, name: 'Snake Plant', category: 'indoor', description: 'Low light, air purifying', image: '/images/snake_plant.jpg', careTips: 'Water every 2-3 weeks. Tolerates low light, prefers indirect sunlight.' },
  { id: 3, name: 'Fiddle Leaf Fig', category: 'indoor', description: 'Trendy indoor plant, requires bright light', image: '/images/fiddle_leaf_fig.jpg', careTips: 'Water when top 1-2 inches of soil are dry. Needs bright, indirect sunlight.' },
  { id: 4, name: 'Pothos', category: 'indoor', description: 'Easy to care, great for beginners', image: '/images/pothos.jpg', careTips: 'Water every 1-2 weeks. Can thrive in low or bright indirect sunlight.' },
  { id: 5, name: 'Peace Lily', category: 'indoor', description: 'Beautiful flowering indoor plant', image: '/images/peace_lily.png', careTips: 'Keep soil moist. Prefers low to medium light.' },
  { id: 6, name: 'Bamboo Palm', category: 'indoor', description: 'Air purifying plant, low light tolerant', image: '/images/bamboo_palm.jpg', careTips: 'Water once a week. Grows best in indirect light.' },
  { id: 7, name: 'Ferns', category: 'indoor', description: 'Lush greenery, prefers humid environments', image: '/images/ferns.jpg', careTips: 'Water regularly to keep soil moist. Prefers indirect light and high humidity.' },
  { id: 8, name: 'ZZ Plant', category: 'indoor', description: 'Very low maintenance, tolerates neglect', image: '/images/zz_plant.jpg', careTips: 'Water every 2-3 weeks. Tolerates low light but grows best in bright indirect sunlight.' },
  { id: 9, name: 'Dracaena', category: 'indoor', description: 'Stylish indoor plant, easy to care', image: '/images/dracaena.jpg', careTips: 'Water when the top inch of soil feels dry. Prefers bright indirect light.' },

  // Herbal Plants
  { id: 10, name: 'Aloe Vera', category: 'herbal', description: 'Healing plant, herbal', image: '/images/aloevera.jpg', careTips: 'Water deeply but infrequently, allowing soil to dry between waterings. Loves bright, direct sunlight.' },
  { id: 11, name: 'Tulsi', category: 'herbal', description: 'Medicinal plant, herbal', image: '/images/tulsi.jpg', careTips: 'Water regularly to keep the soil moist. Prefers bright sunlight.' },
  { id: 12, name: 'Lavender', category: 'herbal', description: 'Fragrant herb, known for calming properties', image: '/images/lavender.jpg', careTips: 'Water when the soil is dry. Requires full sunlight.' },
  { id: 13, name: 'Mint', category: 'herbal', description: 'Popular herb, used in cooking and tea', image: '/images/mint.jpg', careTips: 'Water regularly to keep the soil moist. Grows best in full or partial sunlight.' },
  { id: 14, name: 'Basil', category: 'herbal', description: 'Aromatic herb, essential in cooking', image: '/images/basil.jpg', careTips: 'Water every 1-2 days. Prefers full sunlight.' },

  // Outdoor Plants
  { id: 15, name: 'Rose', category: 'outdoor', description: 'Beautiful outdoor plant', image: '/images/rose.jpg', careTips: 'Water regularly, keeping soil moist. Thrives in full sunlight.' },
  { id: 16, name: 'Cactus', category: 'outdoor', description: 'Low maintenance, thrives in dry conditions', image: '/images/cactus.jpg', careTips: 'Water sparingly, about once every 2-3 weeks. Prefers full sunlight.' },
  { id: 17, name: 'Orchid', category: 'outdoor', description: 'Exotic flowering plant, requires special care', image: '/images/orchid.jpg', careTips: 'Water weekly, allowing water to drain. Requires bright, indirect light.' },
  { id: 18, name: 'Sunflower', category: 'outdoor', description: 'Bright, cheerful flower, loves the sun', image: '/images/sunflower.jpg', careTips: 'Water regularly and ensure they get full sunlight.' },
  { id: 19, name: 'Hibiscus', category: 'outdoor', description: 'Beautiful flowers, likes full sun', image: '/images/hibiscus.jpg', careTips: 'Water regularly to keep the soil moist. Prefers full sunlight.' },
  { id: 20, name: 'Daisy', category: 'outdoor', description: 'Classic garden flower, cheerful appearance', image: '/images/daisy.jpg', careTips: 'Water regularly to keep soil moist. Needs full sun.' },
  { id: 21, name: 'Pansy', category: 'outdoor', description: 'Bright, colorful flowers for gardens', image: '/images/pansy.jpg', careTips: 'Water regularly. Thrives in partial shade to full sunlight.' },
  { id: 22, name: 'Petunia', category: 'outdoor', description: 'Popular flowering plant, vibrant colors', image: '/images/petunia.jpg', careTips: 'Water regularly. Prefers full sunlight.' },
  { id: 23, name: 'Coleus', category: 'outdoor', description: 'Colorful foliage, great for borders', image: '/images/coleus.jpg', careTips: 'Water daily during the growing season. Thrives in partial to full sunlight.' },

  // Pet-Friendly Plants
  { id: 24, name: 'Spider Plant', category: 'pet-friendly', description: 'Safe for pets', image: '/images/spider_plant.jpg', careTips: 'Water regularly to keep soil moist. Thrives in indirect light.' },
  { id: 25, name: 'Areca Palm', category: 'pet-friendly', description: 'Safe for pets, great air purifier', image: '/images/areca_palm.jpg', careTips: 'Water weekly to keep soil moist. Prefers bright, indirect light.' },
  { id: 26, name: 'Boston Fern', category: 'pet-friendly', description: 'Pet-friendly fern, lush and beautiful', image: '/images/boston_fern.jpg', careTips: 'Keep the soil moist. Prefers indirect light and high humidity.' },
  { id: 27, name: 'Calathea', category: 'pet-friendly', description: 'Colorful leaves, safe for pets', image: '/images/calathea.jpg', careTips: 'Water every 1-2 weeks. Grows best in low to bright indirect sunlight.' },
  { id: 28, name: 'Lady Palm', category: 'pet-friendly', description: 'Beautiful palm, safe for both pets and kids', image: '/images/lady_palm.jpg', careTips: 'Water weekly to keep the soil moist. Prefers indirect light.' },

  // Gift Plants
  { id: 29, name: 'Bonsai Tree', category: 'gifts', description: 'Artfully shaped, perfect for gifting', image: '/images/bonsai.jpg', careTips: 'Water regularly, keeping the soil moist but not waterlogged. Prefers bright indirect light.' },
  { id: 30, name: 'Kokedama', category: 'gifts', description: 'Japanese moss ball, unique gift option', image: '/images/kokedama.jpg', careTips: 'Mist regularly to keep the moss moist. Prefers indirect light.' },
  { id: 31, name: 'Gerbera Daisy', category: 'gifts', description: 'Bright and cheerful flower, ideal for gifts', image: '/images/gerbera_daisy.jpg', careTips: 'Water regularly, allowing the soil to dry out between waterings. Needs full sunlight.' },
  { id: 32, name: 'African Violet', category: 'gifts', description: 'Beautiful indoor flowering plant, easy to care for', image: '/images/african_violet.jpg', careTips: 'Water when the top inch of soil feels dry. Prefers indirect sunlight.' },
  { id: 33, name: 'Chrysanthemum', category: 'gifts', description: 'Beautiful flowers, known for their longevity', image: '/images/chrysanthemum.jpg', careTips: 'Water regularly. Requires full sunlight to thrive.' },
];

export default plantsData;
