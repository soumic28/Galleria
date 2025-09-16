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
    title: "",
    description: "Premium shopping zones with luxury brands and multiplex theaters",
    image: "/mall_pic_1.png",
    level: "Level 2",
    zone: "Multiplex Zone",
    features: ["Luxury Brands", "Premium Cinema", "VIP Services", "Atrium Views"]
  },
  {
    id: 2,
    title: "", 
    description: "Entertainment hub with food courts and cine lounge facilities",
    image: "/mall_pic_2.png",
    level: "Level 1", 
    zone: "Entertainment Hub",
    features: ["Food Court 1", "Food Court 2", "Cine Lounge", "Entertainment Zone"]
  },
  {
    id: 3,
    title: "",
    description: "Technical services and projection rooms for premium cinema experience",
    image: "/mall_pic_3.png",
    level: "Service Level",
    zone: "Technical Zone", 
    features: ["Projection Rooms", "Technical Services", "Equipment Area", "Staff Facilities"]
  },
  {
    id: 4,
    title: "",
    description: "Grand entrance with central atrium connecting all floors",
    image: "/mall_pic_4.png",
    level: "Ground Floor",
    zone: "Main Entrance",
    features: ["Grand Entry", "Central Atrium", "Information Desk", "Floor Navigation"]
  }
];
