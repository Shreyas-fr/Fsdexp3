import type {
  Product,
  Alternative,
  RecyclingCenter,
  Achievement,
  ScanResult,
  WeeklyDataPoint,
} from '../types';

// ═══════════════════════════════════════════════════════════
//  PRODUCTS (20+)
// ═══════════════════════════════════════════════════════════
export const mockProducts: Product[] = [
  {
    id: 'p1', name: 'Ocean Breeze Shampoo', brand: 'AquaPure',
    category: 'Personal Care', imageUrl: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=200',
    score: 7, breakdown: { packaging: 2, production: 2, ethics: 2, lifecycle: 1 },
    certifications: ['Cruelty-Free', 'Vegan'], description: 'Sulfate-free shampoo in partially recycled bottle.',
  },
  {
    id: 'p2', name: 'EcoWash Laundry Sheets', brand: 'GreenClean',
    category: 'Household', imageUrl: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=200',
    score: 9, breakdown: { packaging: 3, production: 3, ethics: 2, lifecycle: 1 },
    certifications: ['B-Corp', 'Carbon Neutral', 'Plastic-Free'], description: 'Zero-waste laundry detergent sheets, biodegradable and plastic-free.',
  },
  {
    id: 'p3', name: 'Classic Cola 500ml', brand: 'FizzCorp',
    category: 'Beverages', imageUrl: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=200',
    score: 2, breakdown: { packaging: 0, production: 1, ethics: 1, lifecycle: 0 },
    certifications: [], description: 'Single-use plastic bottle, high-sugar beverage with global supply chain.',
  },
  {
    id: 'p4', name: 'Bamboo Toothbrush Pack', brand: 'EcoSmile',
    category: 'Personal Care', imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=200',
    score: 9, breakdown: { packaging: 3, production: 2, ethics: 2, lifecycle: 2 },
    certifications: ['FSC Certified', 'Plastic-Free', 'Compostable'], description: 'Biodegradable bamboo toothbrushes with plant-based bristles.',
  },
  {
    id: 'p5', name: 'Fast Fashion T-Shirt', brand: 'TrendWear',
    category: 'Clothing', imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200',
    score: 1, breakdown: { packaging: 0, production: 0, ethics: 1, lifecycle: 0 },
    certifications: [], description: 'Polyester-blend t-shirt, manufactured overseas with poor labor transparency.',
  },
  {
    id: 'p6', name: 'Organic Fair Trade Coffee', brand: 'MountainBrew',
    category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200',
    score: 8, breakdown: { packaging: 2, production: 3, ethics: 2, lifecycle: 1 },
    certifications: ['Fair Trade', 'USDA Organic', 'Rainforest Alliance'], description: 'Shade-grown arabica beans in compostable packaging.',
  },
  {
    id: 'p7', name: 'Reusable Silicone Food Bags', brand: 'Stasher',
    category: 'Kitchen', imageUrl: 'https://images.unsplash.com/photo-1605522561233-768ad7a8fabf?w=200',
    score: 8, breakdown: { packaging: 2, production: 2, ethics: 2, lifecycle: 2 },
    certifications: ['B-Corp', 'Platinum Silicone'], description: 'Medical-grade silicone bags replacing single-use plastic bags.',
  },
  {
    id: 'p8', name: 'Disposable Razor 10-Pack', brand: 'SharpEdge',
    category: 'Personal Care', imageUrl: 'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=200',
    score: 1, breakdown: { packaging: 0, production: 0, ethics: 0, lifecycle: 1 },
    certifications: [], description: 'Plastic-handled disposable razors in blister packaging.',
  },
  {
    id: 'p9', name: 'Hemp Canvas Backpack', brand: 'TerraCarry',
    category: 'Accessories', imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200',
    score: 8, breakdown: { packaging: 2, production: 3, ethics: 2, lifecycle: 1 },
    certifications: ['Fair Trade', 'Organic'], description: 'Durable hemp backpack made by artisan cooperatives.',
  },
  {
    id: 'p10', name: 'Plastic Water Bottle 24-Pack', brand: 'HydroFresh',
    category: 'Beverages', imageUrl: 'https://images.unsplash.com/photo-1616118132534-381148898bb4?w=200',
    score: 0, breakdown: { packaging: 0, production: 0, ethics: 0, lifecycle: 0 },
    certifications: [], description: 'Single-use PET plastic bottles, non-recycled source.',
  },
  {
    id: 'p11', name: 'Beeswax Food Wraps', brand: 'WrapNatural',
    category: 'Kitchen', imageUrl: 'https://images.unsplash.com/photo-1611068661807-6a82e98661a3?w=200',
    score: 9, breakdown: { packaging: 3, production: 2, ethics: 2, lifecycle: 2 },
    certifications: ['GOTS Organic', 'Compostable'], description: 'Organic cotton wraps with beeswax, jojoba oil, and tree resin coating.',
  },
  {
    id: 'p12', name: 'Synthetic Running Shoes', brand: 'SpeedStride',
    category: 'Footwear', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200',
    score: 3, breakdown: { packaging: 1, production: 1, ethics: 1, lifecycle: 0 },
    certifications: [], description: 'Performance running shoes with petroleum-based materials.',
  },
  {
    id: 'p13', name: 'Recycled Aluminum Water Bottle', brand: 'PathWater',
    category: 'Drinkware', imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200',
    score: 8, breakdown: { packaging: 3, production: 2, ethics: 1, lifecycle: 2 },
    certifications: ['1% for the Planet'], description: 'Infinitely recyclable aluminum bottle filled with purified water.',
  },
  {
    id: 'p14', name: 'Chemical All-Purpose Cleaner', brand: 'SparkleMax',
    category: 'Household', imageUrl: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=200',
    score: 2, breakdown: { packaging: 0, production: 1, ethics: 1, lifecycle: 0 },
    certifications: [], description: 'Conventional cleaner with VOCs in non-recyclable spray bottle.',
  },
  {
    id: 'p15', name: 'Organic Cotton Towels', brand: 'Coyuchi',
    category: 'Home', imageUrl: 'https://images.unsplash.com/photo-1583845112203-29329902332e?w=200',
    score: 7, breakdown: { packaging: 2, production: 2, ethics: 2, lifecycle: 1 },
    certifications: ['GOTS', 'Fair Trade'], description: 'Organic cotton towels woven in a certified ethical factory.',
  },
  {
    id: 'p16', name: 'Plant-Based Protein Bar', brand: 'GoMacro',
    category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1622484212850-eb596d769edc?w=200',
    score: 7, breakdown: { packaging: 1, production: 3, ethics: 2, lifecycle: 1 },
    certifications: ['USDA Organic', 'Vegan', 'Non-GMO'], description: 'Organic, plant-based protein bar with compostable inner wrapper.',
  },
  {
    id: 'p17', name: 'Microfiber Cleaning Cloths', brand: 'WipeRight',
    category: 'Household', imageUrl: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=200',
    score: 3, breakdown: { packaging: 1, production: 1, ethics: 1, lifecycle: 0 },
    certifications: [], description: 'Synthetic microfiber cloths that shed microplastics when washed.',
  },
  {
    id: 'p18', name: 'Solar-Powered Phone Charger', brand: 'SunJuice',
    category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=200',
    score: 6, breakdown: { packaging: 1, production: 2, ethics: 1, lifecycle: 2 },
    certifications: ['Energy Star'], description: 'Portable solar panel charger with recycled casing.',
  },
  {
    id: 'p19', name: 'Compostable Trash Bags', brand: 'BioBag',
    category: 'Household', imageUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=200',
    score: 8, breakdown: { packaging: 3, production: 2, ethics: 1, lifecycle: 2 },
    certifications: ['BPI Certified', 'OK Compost'], description: 'Made from plant starches, certified compostable in 90 days.',
  },
  {
    id: 'p20', name: 'Petroleum Lip Balm', brand: 'GlossyLips',
    category: 'Personal Care', imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200',
    score: 2, breakdown: { packaging: 0, production: 1, ethics: 0, lifecycle: 1 },
    certifications: [], description: 'Petroleum-based lip balm in plastic tube packaging.',
  },
  {
    id: 'p21', name: 'Refillable Glass Soap Dispenser', brand: 'Blueland',
    category: 'Household', imageUrl: 'https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=200',
    score: 9, breakdown: { packaging: 3, production: 3, ethics: 2, lifecycle: 1 },
    certifications: ['B-Corp', 'Plastic-Free', 'EPA Safer Choice'], description: 'Forever bottle with dissolvable tablet refills, eliminating single-use plastic.',
  },
  {
    id: 'p22', name: 'Conventional Cling Wrap', brand: 'WrapIt',
    category: 'Kitchen', imageUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=200',
    score: 0, breakdown: { packaging: 0, production: 0, ethics: 0, lifecycle: 0 },
    certifications: [], description: 'PVC cling wrap, non-recyclable, non-compostable single-use plastic.',
  },
];

// ═══════════════════════════════════════════════════════════
//  ALTERNATIVES — keyed by product category
// ═══════════════════════════════════════════════════════════
export const mockAlternatives: Record<string, Alternative[]> = {
  'Personal Care': [
    { id: 'a1', name: 'Ethique Shampoo Bar', brand: 'Ethique', score: 9, priceRange: '$12–$16', certifications: ['B-Corp', 'Plastic-Free', 'Vegan'], retailer: 'Whole Foods', imageUrl: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=200', description: 'Concentrated solid shampoo bar, zero plastic waste.', availableOnline: true },
    { id: 'a2', name: 'by Humankind Refillable Deodorant', brand: 'by Humankind', score: 8, priceRange: '$14–$18', certifications: ['Plastic-Free', 'Cruelty-Free'], retailer: 'Target', imageUrl: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=200', description: 'Refillable deodorant container with compostable refill pods.', availableOnline: true },
    { id: 'a3', name: 'Leaf Razor', brand: 'Leaf Shave', score: 9, priceRange: '$79–$89', certifications: ['Plastic-Free', 'B-Corp'], retailer: 'REI', imageUrl: 'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=200', description: 'All-metal pivoting razor with recyclable blades.', availableOnline: true },
    { id: 'a4', name: 'Organic Lip Balm', brand: 'Hurraw!', score: 8, priceRange: '$4–$6', certifications: ['USDA Organic', 'Vegan'], retailer: 'Whole Foods', imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200', description: 'Cold-pressed organic oils in a recyclable tube.', availableOnline: true },
    { id: 'a5', name: 'Plaine Products Shampoo', brand: 'Plaine Products', score: 8, priceRange: '$28–$32', certifications: ['B-Corp', 'Vegan'], retailer: 'Thrive Market', imageUrl: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=200', description: 'Aluminum bottle with return & refill program.', availableOnline: true },
  ],
  Beverages: [
    { id: 'a6', name: 'SodaStream Sparkling Maker', brand: 'SodaStream', score: 7, priceRange: '$69–$99', certifications: ['BPA-Free'], retailer: 'Target', imageUrl: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=200', description: 'Home sparkling water maker eliminating single-use bottles.', availableOnline: true },
    { id: 'a7', name: 'Boxed Water', brand: 'Boxed Water Is Better', score: 7, priceRange: '$2–$3', certifications: ['1% for the Planet'], retailer: 'Whole Foods', imageUrl: 'https://images.unsplash.com/photo-1616118132534-381148898bb4?w=200', description: 'Carton-based water, 92% plant-based packaging.', availableOnline: true },
    { id: 'a8', name: 'LARQ Self-Cleaning Bottle', brand: 'LARQ', score: 9, priceRange: '$95–$118', certifications: ['BPA-Free', 'UV-C Purification'], retailer: 'REI', imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200', description: 'UV-C LED purifying water bottle with rechargeable battery.', availableOnline: true },
    { id: 'a9', name: 'Klean Kanteen Insulated', brand: 'Klean Kanteen', score: 8, priceRange: '$25–$45', certifications: ['B-Corp', '1% for the Planet'], retailer: 'REI', imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200', description: 'Double-wall insulated stainless steel bottle.', availableOnline: true },
    { id: 'a10', name: 'Olipop Prebiotic Soda', brand: 'Olipop', score: 6, priceRange: '$2–$3', certifications: ['Non-GMO'], retailer: 'Target', imageUrl: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=200', description: 'Low-sugar prebiotic soda in recyclable aluminum can.', availableOnline: true },
  ],
  Household: [
    { id: 'a11', name: 'Blueland Cleaning Kit', brand: 'Blueland', score: 9, priceRange: '$29–$39', certifications: ['B-Corp', 'EPA Safer Choice', 'Plastic-Free'], retailer: 'Target', imageUrl: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=200', description: 'Forever bottles with dissolvable tablet refills.', availableOnline: true },
    { id: 'a12', name: 'Swedish Dishcloths', brand: 'SKOY', score: 8, priceRange: '$8–$12', certifications: ['Compostable', 'Reusable'], retailer: 'Local', imageUrl: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=200', description: 'Each cloth replaces 15 rolls of paper towels. Fully compostable.', availableOnline: true },
    { id: 'a13', name: 'Tru Earth Laundry Strips', brand: 'Tru Earth', score: 9, priceRange: '$16–$20', certifications: ['Plastic-Free', 'Vegan', 'Hypoallergenic'], retailer: 'Amazon', imageUrl: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=200', description: 'Ultra-concentrated laundry strips in compostable packaging.', availableOnline: true },
    { id: 'a14', name: 'Dropps Dishwasher Pods', brand: 'Dropps', score: 8, priceRange: '$15–$22', certifications: ['B-Corp', 'Septic-Safe'], retailer: 'Thrive Market', imageUrl: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=200', description: 'Mineral-based pods in compostable cardboard packaging.', availableOnline: true },
    { id: 'a15', name: 'Branch Basics Concentrate', brand: 'Branch Basics', score: 8, priceRange: '$49–$59', certifications: ['Made Safe', 'EWG Verified'], retailer: 'Thrive Market', imageUrl: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=200', description: 'One plant-based concentrate replaces all conventional cleaners.', availableOnline: true },
  ],
  Kitchen: [
    { id: 'a16', name: 'Bee\'s Wrap Variety Pack', brand: 'Bee\'s Wrap', score: 9, priceRange: '$18–$24', certifications: ['GOTS Organic', 'B-Corp'], retailer: 'Whole Foods', imageUrl: 'https://images.unsplash.com/photo-1611068661807-6a82e98661a3?w=200', description: 'Organic beeswax wraps in assorted sizes.', availableOnline: true },
    { id: 'a17', name: 'Stasher Sandwich Bag', brand: 'Stasher', score: 8, priceRange: '$12–$15', certifications: ['B-Corp', 'Platinum Silicone'], retailer: 'Target', imageUrl: 'https://images.unsplash.com/photo-1605522561233-768ad7a8fabf?w=200', description: 'Endlessly reusable platinum silicone bag.', availableOnline: true },
    { id: 'a18', name: 'If You Care Parchment Paper', brand: 'If You Care', score: 7, priceRange: '$5–$7', certifications: ['FSC Certified', 'Unbleached'], retailer: 'Whole Foods', imageUrl: 'https://images.unsplash.com/photo-1611068661807-6a82e98661a3?w=200', description: 'Unbleached, FSC-certified parchment from renewable sources.', availableOnline: true },
    { id: 'a19', name: 'Glass Food Containers Set', brand: 'Pyrex', score: 7, priceRange: '$25–$40', certifications: ['BPA-Free'], retailer: 'Target', imageUrl: 'https://images.unsplash.com/photo-1605522561233-768ad7a8fabf?w=200', description: 'Durable glass containers replacing single-use plastic.', availableOnline: true },
    { id: 'a20', name: 'Compostable Sponge Pack', brand: 'EcoCoconut', score: 8, priceRange: '$8–$10', certifications: ['Vegan', 'Plastic-Free'], retailer: 'Local', imageUrl: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=200', description: 'Coconut husk sponges, fully biodegradable.', availableOnline: true },
  ],
  default: [
    { id: 'a21', name: 'Patagonia Recycled Tee', brand: 'Patagonia', score: 8, priceRange: '$35–$45', certifications: ['Fair Trade', 'Bluesign'], retailer: 'REI', imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200', description: '100% recycled polyester t-shirt with Fair Trade sewing.', availableOnline: true },
    { id: 'a22', name: 'Allbirds Tree Runners', brand: 'Allbirds', score: 7, priceRange: '$98–$110', certifications: ['B-Corp', 'Carbon Neutral'], retailer: 'Target', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200', description: 'Eucalyptus-fiber sneakers with carbon-neutral footprint.', availableOnline: true },
    { id: 'a23', name: 'Pela Compostable Phone Case', brand: 'Pela', score: 9, priceRange: '$35–$45', certifications: ['B-Corp', 'Compostable'], retailer: 'Amazon', imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=200', description: 'Plant-based, compostable phone case with shock absorption.', availableOnline: true },
    { id: 'a24', name: 'Meow Meow Tweet Deodorant', brand: 'Meow Meow Tweet', score: 8, priceRange: '$14–$18', certifications: ['Vegan', 'Plastic-Free'], retailer: 'Local', imageUrl: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=200', description: 'Push-up tube deodorant in compostable cardboard.', availableOnline: false },
    { id: 'a25', name: 'Package Free Shop Bundle', brand: 'Package Free', score: 9, priceRange: '$20–$30', certifications: ['Plastic-Free'], retailer: 'Thrive Market', imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=200', description: 'Curated bundle of zero-waste essentials.', availableOnline: true },
  ],
};

/**
 * Get alternatives for a product, falling back to category defaults.
 */
export function getAlternativesForProduct(product: Product): Alternative[] {
  return mockAlternatives[product.category] ?? mockAlternatives['default']!;
}

// ═══════════════════════════════════════════════════════════
//  RECYCLING CENTERS (50+)
// ═══════════════════════════════════════════════════════════

function rc(
  id: string, name: string, address: string,
  lat: number, lng: number, phone: string, hours: string,
  acceptedTypes: RecyclingCenter['acceptedTypes'], rating: number
): RecyclingCenter {
  return { id, name, address, lat, lng, phone, hours, acceptedTypes, rating };
}

export const mockRecyclingCenters: RecyclingCenter[] = [
  // San Francisco Bay Area cluster
  rc('rc1', 'GreenCycle SF', '450 Recycling Way, San Francisco, CA', 37.7749, -122.4194, '(415) 555-0101', 'Mon–Fri 8AM–6PM, Sat 9AM–3PM', ['plastic', 'glass', 'paper', 'metal'], 4.5),
  rc('rc2', 'Bay Area E-Waste Hub', '1200 Tech Blvd, San Jose, CA', 37.3382, -121.8863, '(408) 555-0102', 'Mon–Sat 9AM–5PM', ['e-waste', 'metal'], 4.2),
  rc('rc3', 'Oakland Compost Collective', '890 Organic Ln, Oakland, CA', 37.8044, -122.2712, '(510) 555-0103', 'Daily 7AM–7PM', ['compost', 'paper'], 4.8),
  rc('rc4', 'Peninsula Glass Recyclers', '322 Crystal Ave, Palo Alto, CA', 37.4419, -122.1430, '(650) 555-0104', 'Mon–Fri 8AM–5PM', ['glass'], 4.0),
  rc('rc5', 'SunRecycle Center', '567 Solar Dr, Sunnyvale, CA', 37.3688, -122.0363, '(408) 555-0105', 'Mon–Sat 8AM–6PM', ['plastic', 'metal', 'e-waste'], 4.3),
  rc('rc6', 'Marin Zero Waste', '120 Green Valley Rd, San Rafael, CA', 37.9735, -122.5311, '(415) 555-0106', 'Tue–Sat 9AM–4PM', ['plastic', 'glass', 'paper', 'compost', 'textiles'], 4.7),
  rc('rc7', 'EcoStation Berkeley', '456 University Ave, Berkeley, CA', 37.8716, -122.2727, '(510) 555-0107', 'Mon–Fri 7AM–6PM', ['plastic', 'glass', 'metal', 'paper'], 4.4),

  // New York cluster
  rc('rc8', 'NYC Material Recovery', '21 Green St, New York, NY', 40.7128, -74.0060, '(212) 555-0108', 'Mon–Fri 7AM–7PM', ['plastic', 'glass', 'paper', 'metal'], 4.1),
  rc('rc9', 'Brooklyn E-Waste Drop', '340 Atlantic Ave, Brooklyn, NY', 40.6860, -73.9797, '(718) 555-0109', 'Wed–Sun 10AM–5PM', ['e-waste'], 4.0),
  rc('rc10', 'Harlem Compost Hub', '155 W 126th St, New York, NY', 40.8093, -73.9467, '(212) 555-0110', 'Sat–Sun 9AM–3PM', ['compost'], 4.6),
  rc('rc11', 'Queens Recycling Center', '67-01 Fresh Meadow Ln, Queens, NY', 40.7282, -73.7949, '(718) 555-0111', 'Mon–Sat 8AM–5PM', ['plastic', 'glass', 'paper', 'metal', 'textiles'], 4.3),
  rc('rc12', 'Lower East Side Textile Bank', '88 Delancey St, New York, NY', 40.7185, -73.9884, '(212) 555-0112', 'Daily 8AM–8PM', ['textiles'], 4.5),

  // Chicago cluster
  rc('rc13', 'Windy City Recycling', '800 W Lake St, Chicago, IL', 41.8781, -87.6298, '(312) 555-0113', 'Mon–Fri 7AM–5PM', ['plastic', 'glass', 'paper', 'metal'], 4.2),
  rc('rc14', 'Lakeview E-Waste', '3200 N Sheffield Ave, Chicago, IL', 41.9403, -87.6546, '(773) 555-0114', 'Tue–Sat 9AM–4PM', ['e-waste', 'metal'], 3.9),
  rc('rc15', 'South Side Compost', '6500 S Cottage Grove, Chicago, IL', 41.7758, -87.6059, '(773) 555-0115', 'Mon–Fri 8AM–4PM', ['compost', 'paper'], 4.1),

  // Los Angeles cluster
  rc('rc16', 'LA EcoCenter', '4th & Main St, Los Angeles, CA', 34.0522, -118.2437, '(213) 555-0116', 'Mon–Sat 7AM–6PM', ['plastic', 'glass', 'paper', 'metal'], 4.4),
  rc('rc17', 'Hollywood Recycles', '6925 Sunset Blvd, Los Angeles, CA', 34.0981, -118.3408, '(323) 555-0117', 'Mon–Fri 8AM–5PM', ['plastic', 'glass', 'e-waste'], 4.0),
  rc('rc18', 'Santa Monica Green Depot', '2500 Michigan Ave, Santa Monica, CA', 34.0195, -118.4912, '(310) 555-0118', 'Daily 8AM–6PM', ['plastic', 'glass', 'paper', 'compost', 'metal', 'textiles'], 4.8),
  rc('rc19', 'Pasadena Textile Recovery', '180 S Oak Knoll Ave, Pasadena, CA', 34.1478, -118.1445, '(626) 555-0119', 'Wed–Sun 10AM–4PM', ['textiles'], 4.2),
  rc('rc20', 'Venice Compost Co-op', '1600 Ocean Front Walk, Venice, CA', 33.9850, -118.4695, '(310) 555-0120', 'Sat–Sun 8AM–2PM', ['compost'], 4.7),

  // Seattle cluster
  rc('rc21', 'Seattle ReUse Hub', '500 1st Ave S, Seattle, WA', 47.6062, -122.3321, '(206) 555-0121', 'Mon–Sat 9AM–6PM', ['plastic', 'glass', 'paper', 'metal', 'e-waste'], 4.6),
  rc('rc22', 'Capitol Hill Compost', '1122 E Pike St, Seattle, WA', 47.6143, -122.3168, '(206) 555-0122', 'Daily 7AM–8PM', ['compost'], 4.5),
  rc('rc23', 'Ballard Textile Bank', '5300 Ballard Ave NW, Seattle, WA', 47.6684, -122.3841, '(206) 555-0123', 'Tue–Sun 10AM–5PM', ['textiles', 'paper'], 4.3),

  // Austin cluster
  rc('rc24', 'Austin Zero Waste', '2514 S Congress Ave, Austin, TX', 30.2672, -97.7431, '(512) 555-0124', 'Mon–Fri 8AM–5PM, Sat 9AM–1PM', ['plastic', 'glass', 'paper', 'metal'], 4.4),
  rc('rc25', 'East Austin E-Waste', '1156 Hargrave St, Austin, TX', 30.2631, -97.7173, '(512) 555-0125', 'Mon–Sat 9AM–5PM', ['e-waste', 'metal'], 4.1),
  rc('rc26', 'South Austin Compost', '4800 S 1st St, Austin, TX', 30.2241, -97.7651, '(512) 555-0126', 'Daily 6AM–6PM', ['compost'], 4.7),

  // Portland cluster
  rc('rc27', 'Portland EcoDepot', '6161 SE Foster Rd, Portland, OR', 45.5152, -122.6784, '(503) 555-0127', 'Mon–Sat 8AM–5PM', ['plastic', 'glass', 'paper', 'metal', 'textiles'], 4.6),
  rc('rc28', 'Alberta Arts E-Waste', '2800 NE Alberta St, Portland, OR', 45.5590, -122.6413, '(503) 555-0128', 'Wed–Sun 10AM–5PM', ['e-waste'], 4.3),
  rc('rc29', 'SE Portland Compost', '4040 SE Division St, Portland, OR', 45.5046, -122.6182, '(503) 555-0129', 'Mon–Sat 7AM–6PM', ['compost', 'paper'], 4.5),

  // Denver cluster
  rc('rc30', 'Mile High Recycling', '1801 Blake St, Denver, CO', 39.7392, -104.9903, '(720) 555-0130', 'Mon–Fri 7AM–5PM', ['plastic', 'glass', 'paper', 'metal'], 4.2),
  rc('rc31', 'RiNo E-Waste Center', '2936 Larimer St, Denver, CO', 39.7620, -104.9800, '(720) 555-0131', 'Tue–Sat 9AM–4PM', ['e-waste', 'metal'], 4.0),
  rc('rc32', 'Capitol Hill Compost Denver', '1300 E Colfax Ave, Denver, CO', 39.7401, -104.9734, '(720) 555-0132', 'Daily 7AM–7PM', ['compost'], 4.4),

  // Miami cluster
  rc('rc33', 'Miami Green Recovery', '100 NE 2nd Ave, Miami, FL', 25.7617, -80.1918, '(305) 555-0133', 'Mon–Sat 8AM–6PM', ['plastic', 'glass', 'paper', 'metal'], 4.1),
  rc('rc34', 'Wynwood E-Waste', '2520 NW 2nd Ave, Miami, FL', 25.7960, -80.1990, '(305) 555-0134', 'Wed–Sun 10AM–5PM', ['e-waste'], 3.8),
  rc('rc35', 'Coconut Grove Compost', '3300 Grand Ave, Coconut Grove, FL', 25.7260, -80.2411, '(305) 555-0135', 'Sat–Sun 8AM–2PM', ['compost', 'paper'], 4.6),

  // Boston cluster
  rc('rc36', 'Boston Material Recovery', '55 Frontage Rd, Boston, MA', 42.3601, -71.0589, '(617) 555-0136', 'Mon–Fri 7AM–5PM', ['plastic', 'glass', 'paper', 'metal'], 4.3),
  rc('rc37', 'Cambridge E-Waste', '245 First St, Cambridge, MA', 42.3656, -71.1025, '(617) 555-0137', 'Tue–Sat 9AM–5PM', ['e-waste', 'metal'], 4.1),
  rc('rc38', 'Somerville Textile Bank', '50 Inner Belt Rd, Somerville, MA', 42.3876, -71.0995, '(617) 555-0138', 'Mon–Sat 8AM–4PM', ['textiles'], 4.4),

  // Washington DC cluster
  rc('rc39', 'DC RecycleRight', '1350 Pennsylvania Ave, Washington, DC', 38.9072, -77.0369, '(202) 555-0139', 'Mon–Fri 7AM–6PM', ['plastic', 'glass', 'paper', 'metal'], 4.2),
  rc('rc40', 'Georgetown Compost', '1045 Wisconsin Ave NW, Washington, DC', 38.9064, -77.0631, '(202) 555-0140', 'Sat 8AM–1PM', ['compost'], 4.5),

  // Minneapolis cluster
  rc('rc41', 'Twin Cities EcoStation', '2929 5th Ave S, Minneapolis, MN', 44.9778, -93.2650, '(612) 555-0141', 'Mon–Sat 8AM–5PM', ['plastic', 'glass', 'paper', 'metal', 'compost'], 4.4),
  rc('rc42', 'St Paul E-Waste', '1100 University Ave, St Paul, MN', 44.9558, -93.0995, '(651) 555-0142', 'Wed–Sat 10AM–4PM', ['e-waste', 'metal'], 4.0),

  // Philadelphia
  rc('rc43', 'Philly Recycling Co', '640 S 2nd St, Philadelphia, PA', 39.9526, -75.1652, '(215) 555-0143', 'Mon–Fri 7AM–5PM, Sat 8AM–2PM', ['plastic', 'glass', 'paper', 'metal'], 4.3),
  rc('rc44', 'Northern Liberties Compost', '900 N 2nd St, Philadelphia, PA', 39.9680, -75.1401, '(215) 555-0144', 'Sat–Sun 9AM–3PM', ['compost', 'paper'], 4.6),

  // Nashville
  rc('rc45', 'Music City Recycling', '1720 West End Ave, Nashville, TN', 36.1627, -86.7816, '(615) 555-0145', 'Mon–Sat 8AM–5PM', ['plastic', 'glass', 'paper', 'metal', 'textiles'], 4.2),
  rc('rc46', 'East Nashville E-Waste', '1000 Main St, Nashville, TN', 36.1770, -86.7586, '(615) 555-0146', 'Tue–Fri 10AM–4PM', ['e-waste'], 3.9),

  // San Diego
  rc('rc47', 'SD EcoCenter', '8364 Clairemont Mesa, San Diego, CA', 32.7157, -117.1611, '(619) 555-0147', 'Mon–Sat 7AM–6PM', ['plastic', 'glass', 'paper', 'metal', 'compost'], 4.5),
  rc('rc48', 'Pacific Beach Compost', '4500 Mission Blvd, San Diego, CA', 32.7933, -117.2537, '(619) 555-0148', 'Daily 7AM–5PM', ['compost'], 4.7),

  // Atlanta
  rc('rc49', 'Atlanta Green Recycling', '44 Broad St NW, Atlanta, GA', 33.7490, -84.3880, '(404) 555-0149', 'Mon–Fri 8AM–5PM', ['plastic', 'glass', 'paper', 'metal'], 4.1),
  rc('rc50', 'Decatur E-Waste Hub', '101 E Court Sq, Decatur, GA', 33.7748, -84.2963, '(404) 555-0150', 'Wed–Sat 9AM–4PM', ['e-waste', 'metal'], 4.3),

  // Phoenix
  rc('rc51', 'Phoenix Desert Recyclers', '1625 N Central Ave, Phoenix, AZ', 33.4484, -112.0740, '(602) 555-0151', 'Mon–Sat 6AM–4PM', ['plastic', 'glass', 'paper', 'metal'], 4.0),
  rc('rc52', 'Scottsdale Glass Works', '7135 E Camelback Rd, Scottsdale, AZ', 33.5092, -111.9280, '(480) 555-0152', 'Mon–Fri 8AM–3PM', ['glass', 'metal'], 4.2),
  rc('rc53', 'Tempe Textile Donation', '600 S Mill Ave, Tempe, AZ', 33.4255, -111.9400, '(480) 555-0153', 'Daily 9AM–6PM', ['textiles'], 4.5),
];

// ═══════════════════════════════════════════════════════════
//  ACHIEVEMENTS (10+)
// ═══════════════════════════════════════════════════════════
export const mockAchievements: Achievement[] = [
  { id: 'ach1', title: 'First Scan', description: 'Scan your very first product', icon: '🔍', threshold: 1, thresholdType: 'scans' },
  { id: 'ach2', title: 'Curious Consumer', description: 'Scan 5 products', icon: '🧐', threshold: 5, thresholdType: 'scans' },
  { id: 'ach3', title: 'Eco Explorer', description: 'Scan 20 products', icon: '🌿', threshold: 20, thresholdType: 'scans' },
  { id: 'ach4', title: 'Sustainability Sage', description: 'Scan 50 products', icon: '🧙', threshold: 50, thresholdType: 'scans' },
  { id: 'ach5', title: 'Carbon Cutter', description: 'Save 10 kg CO₂', icon: '✂️', threshold: 10, thresholdType: 'co2' },
  { id: 'ach6', title: 'Climate Champion', description: 'Save 100 kg CO₂', icon: '🏆', threshold: 100, thresholdType: 'co2' },
  { id: 'ach7', title: 'Planet Protector', description: 'Save 500 kg CO₂', icon: '🌍', threshold: 500, thresholdType: 'co2' },
  { id: 'ach8', title: 'Alt Seeker', description: 'Choose 3 eco alternatives', icon: '🔄', threshold: 3, thresholdType: 'alternatives' },
  { id: 'ach9', title: 'Green Guru', description: 'Choose 15 eco alternatives', icon: '🌱', threshold: 15, thresholdType: 'alternatives' },
  { id: 'ach10', title: 'Streak Starter', description: 'Maintain a 3-day streak', icon: '🔥', threshold: 3, thresholdType: 'streak' },
  { id: 'ach11', title: 'Unstoppable', description: 'Maintain a 7-day streak', icon: '⚡', threshold: 7, thresholdType: 'streak' },
  { id: 'ach12', title: 'Month-Long Mission', description: 'Maintain a 30-day streak', icon: '🌟', threshold: 30, thresholdType: 'streak' },
];

// ═══════════════════════════════════════════════════════════
//  MOCK AI RESPONSE GENERATOR
// ═══════════════════════════════════════════════════════════

export function generateMockAIResponse(productName: string): ScanResult {
  // Find product by name similarity, or pick a random one
  const found = mockProducts.find(
    (p) => p.name.toLowerCase().includes(productName.toLowerCase()) ||
           productName.toLowerCase().includes(p.name.toLowerCase())
  );
  const product = found ?? mockProducts[Math.floor(Math.random() * mockProducts.length)]!;

  const tips: string[] = [];
  if (product.breakdown.packaging < 2) tips.push('Look for products in recyclable or compostable packaging.');
  if (product.breakdown.production < 2) tips.push('Choose products from companies with transparent supply chains.');
  if (product.breakdown.ethics < 1) tips.push('Opt for Fair Trade or B-Corp certified brands.');
  if (product.breakdown.lifecycle < 1) tips.push('Consider reusable or refillable alternatives to reduce waste.');
  if (tips.length === 0) tips.push('Great choice! Keep supporting sustainable brands.');

  const summaries: Record<string, string> = {
    high: `${product.name} by ${product.brand} demonstrates strong sustainability practices across packaging, production, and ethical sourcing. This product is a solid eco-friendly choice in the ${product.category} category.`,
    mid: `${product.name} by ${product.brand} shows moderate sustainability effort. While some aspects like production are decent, there's room for improvement in packaging and end-of-life considerations.`,
    low: `${product.name} by ${product.brand} has significant sustainability concerns. The product relies on non-recyclable packaging, opaque supply chains, and materials with poor lifecycle prospects. Consider switching to a greener alternative.`,
  };

  const level = product.score >= 7 ? 'high' : product.score >= 4 ? 'mid' : 'low';

  return {
    id: `scan-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    product: { ...product, name: found ? product.name : productName },
    scannedAt: new Date().toISOString(),
    inputMethod: 'manual',
    aiSummary: summaries[level]!,
    tips,
  };
}

// ═══════════════════════════════════════════════════════════
//  WEEKLY PROGRESS (seed data)
// ═══════════════════════════════════════════════════════════
export const mockWeeklyData: WeeklyDataPoint[] = [
  { day: 'Mon', scans: 3, co2Saved: 2.4 },
  { day: 'Tue', scans: 1, co2Saved: 0.8 },
  { day: 'Wed', scans: 4, co2Saved: 3.6 },
  { day: 'Thu', scans: 2, co2Saved: 1.5 },
  { day: 'Fri', scans: 5, co2Saved: 4.2 },
  { day: 'Sat', scans: 2, co2Saved: 1.9 },
  { day: 'Sun', scans: 3, co2Saved: 2.7 },
];
