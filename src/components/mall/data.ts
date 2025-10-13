/* eslint-disable prettier/prettier */
export interface MallData {
  id: number;
  title: string;
  description: string;
  image: string;
  features: string[];
  level?: string;
  zone?: string;
}

export const mallData: MallData[] = [
  {
    id: 1,
    title: "PSR Infinity Mall",
    description: "Largest Mall in Telangana Outside Hyderabad - 2 Lakh Sq. Ft. Built-up Area",
    image: "/pdf-images/Multiplex.png",
    level: "9 Floors",
    zone: "Premium Retail & Entertainment",
    features: ["5-Screen Multiplex (1280+ Seating)", "15,000 Sq. Ft. Cine Lounge", "300+ Car Parking", "6 Lifts + 3 Basements"]
  },
  {
    id: 2,
    title: "Entertainment Hub", 
    description: "Premium cinema experience with integrated dining and entertainment",
    image: "/pdf-images/multiplex_2.png",
    level: "Multiplex Level", 
    zone: "Cinema & Dining",
    features: ["5 Cinema Screens", "Biggest in Warangal", "Food Meets Cinema", "Premium Movie Experience"]
  },
  {
    id: 3,
    title: "Shopping Experience",
    description: "Premium retail zones with luxury brands and lifestyle shopping",
    image: "/pdf-images/multiplex_3.png",
    level: "Retail Floors",
    zone: "Shopping & Lifestyle", 
    features: ["Luxury Brands", "Lifestyle Shopping", "Premium Retail", "Brand Mix Potential"]
  },
  {
    id: 4,
    title: "Grand Atrium",
    description: "Central atrium with 4,500 sq. ft. connecting all floors with open spaces",
    image: "/pdf-images/multiplex_4.png",
    level: "Ground Floor",
    zone: "Main Entrance & Atrium",
    features: ["4,500 Sq. Ft. Atrium", "50% Open Space", "20% Landscaped Area", "Grand Entry"]
  },
  // {
  //   id: 5,
  //   title: "Location Advantage",
  //   description: "Strategically placed across Warangal-Hanamkonda-Kazipet triangle",
  //   image: "/pdf-images/page-05.png",
  //   level: "Prime Location",
  //   zone: "Accessibility Hub",
  //   features: ["8 mins to Hanamkonda", "10 mins to Warangal", "25 mins to Kazipet", "1.1M Population Reach"]
  // },
  // {
  //   id: 6,
  //   title: "Architectural Design",
  //   description: "Modern architectural design with premium finishes and contemporary aesthetics",
  //   image: "/pdf-images/page-06.png",
  //   level: "Design Excellence",
  //   zone: "Architecture & Design",
  //   features: ["Modern Architecture", "Premium Finishes", "Contemporary Design", "Aesthetic Appeal"]
  // },
  // {
  //   id: 7,
  //   title: "Retail Zones",
  //   description: "Diverse retail zones catering to all shopping needs and preferences",
  //   image: "/pdf-images/page-07.png",
  //   level: "Multi-Level Retail",
  //   zone: "Shopping Zones",
  //   features: ["Fashion & Lifestyle", "Electronics & Gadgets", "Home & Decor", "Food & Beverages"]
  // },
  // {
  //   id: 8,
  //   title: "Parking & Accessibility",
  //   description: "Comprehensive parking solutions and easy accessibility for all visitors",
  //   image: "/pdf-images/page-08.png",
  //   level: "Basement Levels",
  //   zone: "Parking & Access",
  //   features: ["300+ Car Parking", "Basement Parking", "Easy Access", "Visitor Convenience"]
  // }
];
