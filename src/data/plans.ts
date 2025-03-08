
export interface PhonePlan {
  id: string;
  provider: {
    name: string;
    logo: string;
  };
  name: string;
  price: number;
  data: string;
  calls: string;
  sms: string;
  commitment: 'No contract' | '12 months' | '24 months';
  network: '4G' | '5G' | '4G/5G';
  features: string[];
  isFeatured?: boolean;
  isSponsored?: boolean;
}

export const phonePlans: PhonePlan[] = [
  {
    id: "1",
    provider: {
      name: "Orange",
      logo: "/placeholder.svg"
    },
    name: "5G Débutant",
    price: 19.99,
    data: "100 Go",
    calls: "Illimité",
    sms: "Illimité",
    commitment: "24 months",
    network: "5G",
    features: ["EU Roaming", "5G Network", "Mobile Hotspot"],
    isFeatured: true,
    isSponsored: true
  },
  {
    id: "2",
    provider: {
      name: "SFR",
      logo: "/placeholder.svg"
    },
    name: "4G Liberté",
    price: 14.99,
    data: "80 Go",
    calls: "Illimité",
    sms: "Illimité",
    commitment: "No contract",
    network: "4G",
    features: ["EU Roaming", "Mobile Hotspot"]
  },
  {
    id: "3",
    provider: {
      name: "Bouygues Telecom",
      logo: "/placeholder.svg"
    },
    name: "Premium 5G",
    price: 24.99,
    data: "150 Go",
    calls: "Illimité",
    sms: "Illimité",
    commitment: "24 months",
    network: "5G",
    features: ["EU Roaming", "5G Network", "Mobile Hotspot", "Family Discounts"],
    isFeatured: true
  },
  {
    id: "4",
    provider: {
      name: "Free Mobile",
      logo: "/placeholder.svg"
    },
    name: "Free Mini",
    price: 9.99,
    data: "50 Go",
    calls: "Illimité",
    sms: "Illimité",
    commitment: "No contract",
    network: "4G",
    features: ["EU Roaming", "Mobile Hotspot"]
  },
  {
    id: "5",
    provider: {
      name: "Free Mobile",
      logo: "/placeholder.svg"
    },
    name: "Free Illimité",
    price: 19.99,
    data: "Illimité",
    calls: "Illimité",
    sms: "Illimité",
    commitment: "12 months",
    network: "4G/5G",
    features: ["EU Roaming", "5G Network", "Mobile Hotspot", "Unlimited Data"]
  },
  {
    id: "6",
    provider: {
      name: "Orange",
      logo: "/placeholder.svg"
    },
    name: "Orange Basique",
    price: 12.99,
    data: "40 Go",
    calls: "Illimité",
    sms: "Illimité",
    commitment: "No contract",
    network: "4G",
    features: ["EU Roaming", "Mobile Hotspot"]
  },
  {
    id: "7",
    provider: {
      name: "SFR",
      logo: "/placeholder.svg"
    },
    name: "SFR Ultra",
    price: 29.99,
    data: "200 Go",
    calls: "Illimité",
    sms: "Illimité",
    commitment: "24 months",
    network: "5G",
    features: ["EU Roaming", "5G Network", "Mobile Hotspot", "Premium Support", "Music Streaming Included"],
    isSponsored: true
  },
  {
    id: "8",
    provider: {
      name: "Bouygues Telecom",
      logo: "/placeholder.svg"
    },
    name: "Bouygues Light",
    price: 8.99,
    data: "20 Go",
    calls: "Illimité",
    sms: "Illimité",
    commitment: "No contract",
    network: "4G",
    features: ["EU Roaming"]
  }
];

export interface FilterOptions {
  minPrice: number;
  maxPrice: number;
  dataAmount: string[];
  commitment: string[];
  network: string[];
}

export const initialFilterOptions: FilterOptions = {
  minPrice: 0,
  maxPrice: 100,
  dataAmount: [],
  commitment: [],
  network: []
};

export const providers = [
  {
    name: "Orange",
    logo: "/placeholder.svg"
  },
  {
    name: "SFR",
    logo: "/placeholder.svg"
  },
  {
    name: "Bouygues Telecom",
    logo: "/placeholder.svg"
  },
  {
    name: "Free Mobile",
    logo: "/placeholder.svg"
  }
];
