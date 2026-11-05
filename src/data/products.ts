export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: number;
  cardImage?: number;
  description: string;
  specifications: { label: string; value: string }[];
};

export const PRODUCTS: Product[] = [
  {
    id: 'peugeot-lr01',
    name: 'PEUGEOT - LR01',
    category: 'Road Bike',
    price: 1_200_000,
    image: require('../../assets/images/peugeot-road-bike.png'),
    cardImage: require('../../assets/images/peugeot-road-bike-card.png'),
    description:
      "The LR01 uses the same design as the most iconic bikes from PEUGEOT Cycles' 130-year history and combines it with agile, dynamic performance that's perfectly suited to navigating today's cities. Its lugged steel frame and classic black-and-white detailing make every ride feel timeless.",
    specifications: [
      { label: 'Frame', value: 'Lugged steel' },
      { label: 'Drivetrain', value: 'Shimano Claris, 16-speed' },
      { label: 'Brakes', value: 'Dual pivot caliper' },
      { label: 'Weight', value: '10.8 kg' },
    ],
  },
  {
    id: 'pilot-chromoly-520',
    name: 'PILOT - CHROMOLY 520',
    category: 'Road Bike',
    price: 1_425_000,
    image: require('../../assets/images/pilot-chromoly-road.jpg'),
    cardImage: require('../../assets/images/pilot-chromoly-road.jpg'),
    description:
      'A confident all-road ride built around a responsive chromoly frame. Smooth handling, dependable components, and a clean silhouette make it ready for long days in the saddle.',
    specifications: [
      { label: 'Frame', value: 'Chromoly steel' },
      { label: 'Drivetrain', value: 'Shimano 105, 22-speed' },
      { label: 'Brakes', value: 'Hydraulic disc' },
      { label: 'Weight', value: '9.6 kg' },
    ],
  },
  {
    id: 'huffy-nighthawk-26',
    name: 'HUFFY - 26" NIGHTHAWK',
    category: 'Mountain',
    price: 280_000,
    image: require('../../assets/images/huffy-nighthawk.jpg'),
    description:
      'An easygoing 26-inch hardtail for neighborhood paths and weekend trails. The front suspension smooths out rough sections, while 18-speed twist shifting makes everyday climbs manageable.',
    specifications: [
      { label: 'Frame', value: 'Steel, 26-inch' },
      { label: 'Drivetrain', value: '18-speed twist shift' },
      { label: 'Suspension', value: 'Front suspension fork' },
      { label: 'Brakes', value: 'Front disc, rear linear-pull' },
    ],
  },
  {
    id: 'genesis-saracino-26',
    name: 'GENESIS - 26" SARACINO',
    category: 'Mountain',
    price: 408_000,
    image: require('../../assets/images/genesis-saracino.jpg'),
    description:
      'A capable 26-inch hardtail with an oversized aluminum frame, simple 1x gearing, and disc brakes at both ends. Ready for rough paths and daily city riding.',
    specifications: [
      { label: 'Frame', value: 'Oversized aluminum, 26-inch' },
      { label: 'Drivetrain', value: '1 x 8, MicroSHIFT' },
      { label: 'Suspension', value: 'Vitesse front fork' },
      { label: 'Brakes', value: 'Front and rear mechanical disc' },
    ],
  },
  {
    id: 'smith-trade-helmet',
    name: 'SMITH - Trade',
    category: 'Accessories',
    price: 180_000,
    image: require('../../assets/images/smith-road-helmet.png'),
    description:
      'Lightweight protection with a low-profile road fit. Thoughtful ventilation keeps air moving through hard efforts and everyday rides alike.',
    specifications: [
      { label: 'Shell', value: 'In-mold polycarbonate' },
      { label: 'Fit system', value: 'Adjustable dial' },
      { label: 'Ventilation', value: '20 fixed vents' },
      { label: 'Weight', value: '300 g' },
    ],
  },
];