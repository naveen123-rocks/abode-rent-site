import { Property } from "@/components/PropertyCard";

export const mockProperties: Property[] = [
  {
    id: "1",
    title: "Modern Downtown Apartment",
    location: "Downtown, New York, NY",
    price: 2500,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    type: "Apartment",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    rating: 4.8,
    reviews: 124,
    featured: true,
  },
  {
    id: "2",
    title: "Cozy Suburban House",
    location: "Suburbs, Austin, TX",
    price: 1800,
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    type: "House",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    rating: 4.6,
    reviews: 89,
  },
  {
    id: "3",
    title: "Luxury Beachfront Condo",
    location: "Miami Beach, FL",
    price: 3200,
    bedrooms: 2,
    bathrooms: 2,
    area: 1400,
    type: "Condo",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
    rating: 4.9,
    reviews: 156,
    featured: true,
  },
  {
    id: "4",
    title: "Charming Studio Loft",
    location: "Arts District, Los Angeles, CA",
    price: 1600,
    bedrooms: 1,
    bathrooms: 1,
    area: 800,
    type: "Apartment",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    rating: 4.4,
    reviews: 67,
  },
  {
    id: "5",
    title: "Family Townhouse",
    location: "Residential, Denver, CO",
    price: 2200,
    bedrooms: 3,
    bathrooms: 3,
    area: 2000,
    type: "Townhouse",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
    rating: 4.7,
    reviews: 98,
  },
  {
    id: "6",
    title: "Urban Penthouse",
    location: "Financial District, Seattle, WA",
    price: 4500,
    bedrooms: 3,
    bathrooms: 3,
    area: 2200,
    type: "Apartment",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
    rating: 4.9,
    reviews: 203,
    featured: true,
  },
  {
    id: "7",
    title: "Country Style House",
    location: "Countryside, Portland, OR",
    price: 1900,
    bedrooms: 4,
    bathrooms: 2,
    area: 2400,
    type: "House",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop",
    rating: 4.5,
    reviews: 74,
  },
  {
    id: "8",
    title: "Modern City Condo",
    location: "Midtown, Chicago, IL",
    price: 2800,
    bedrooms: 2,
    bathrooms: 2,
    area: 1300,
    type: "Condo",
    image: "https://images.unsplash.com/photo-1486304873000-235643847519?w=800&h=600&fit=crop",
    rating: 4.6,
    reviews: 112,
  },
  {
    id: "9",
    title: "Historic Brownstone",
    location: "Brooklyn Heights, NY",
    price: 3500,
    bedrooms: 3,
    bathrooms: 2,
    area: 1900,
    type: "Townhouse",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
    rating: 4.8,
    reviews: 167,
  },
  {
    id: "10",
    title: "Garden View Apartment",
    location: "Uptown, San Francisco, CA",
    price: 3000,
    bedrooms: 1,
    bathrooms: 1,
    area: 900,
    type: "Apartment",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    rating: 4.3,
    reviews: 85,
  },
  {
    id: "11",
    title: "Spacious Family Home",
    location: "Oak Park, Sacramento, CA",
    price: 2400,
    bedrooms: 4,
    bathrooms: 3,
    area: 2600,
    type: "House",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
    rating: 4.7,
    reviews: 134,
  },
  {
    id: "12",
    title: "Minimalist Studio",
    location: "SoHo, New York, NY",
    price: 2200,
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    type: "Apartment",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
    rating: 4.4,
    reviews: 56,
  }
];

export const getFeaturedProperties = () => mockProperties.filter(p => p.featured);
export const getPropertyById = (id: string) => mockProperties.find(p => p.id === id);
export const searchProperties = (filters: any) => {
  return mockProperties.filter(property => {
    if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    if (filters.bedrooms && filters.bedrooms !== "any" && property.bedrooms !== parseInt(filters.bedrooms)) {
      return false;
    }
    if (filters.propertyType && filters.propertyType !== "all" && property.type.toLowerCase() !== filters.propertyType.toLowerCase()) {
      return false;
    }
    if (filters.priceRange && filters.priceRange !== "any") {
      const [min, max] = filters.priceRange.split("-").map((p: string) => p.replace(/[^0-9]/g, ""));
      if (max) {
        if (property.price < parseInt(min) || property.price > parseInt(max)) {
          return false;
        }
      } else if (min) {
        if (property.price < parseInt(min)) {
          return false;
        }
      }
    }
    return true;
  });
};