import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Bed, Bath, Square, Star } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useAuth } from "@/contexts/AuthContext";

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: string;
  image: string;
  rating: number;
  reviews: number;
  featured?: boolean;
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { isAuthenticated } = useAuth();
  
  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      return;
    }
    
    if (isFavorite(property.id)) {
      removeFromFavorites(property.id);
    } else {
      addToFavorites(property.id);
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] animate-fade-in">
      <Link to={`/property/${property.id}`}>
        <div className="relative">
          {/* Image */}
          <div className="aspect-[4/3] overflow-hidden bg-muted">
            <img
              src={property.image}
              alt={property.title}
              className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                isImageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setIsImageLoaded(true)}
              loading="lazy"
            />
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-muted animate-pulse" />
            )}
          </div>

          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-all duration-200 ${
              isAuthenticated && isFavorite(property.id) ? "text-destructive" : "text-muted-foreground hover:text-destructive"
            }`}
            onClick={handleFavorite}
            disabled={!isAuthenticated}
          >
            <Heart className={`h-4 w-4 transition-colors duration-200 ${
              isAuthenticated && isFavorite(property.id) ? "fill-current" : ""
            }`} />
          </Button>

          {/* Featured Badge */}
          {property.featured && (
            <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground animate-pulse">
              Featured
            </Badge>
          )}

          {/* Price Badge */}
          <Badge className="absolute bottom-2 left-2 bg-background/90 text-foreground">
            ${property.price.toLocaleString()}/month
          </Badge>
        </div>

        <CardContent className="p-4">
          {/* Title and Location */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
              {property.title}
            </h3>
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="line-clamp-1">{property.location}</span>
            </div>
          </div>

          {/* Property Details */}
          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1" />
                <span>{property.bedrooms} bed</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                <span>{property.bathrooms} bath</span>
              </div>
              <div className="flex items-center">
                <Square className="h-4 w-4 mr-1" />
                <span>{property.area} sqft</span>
              </div>
            </div>
          </div>

          {/* Rating and Type */}
          <div className="flex items-center justify-between mt-3">
            <Badge variant="secondary">{property.type}</Badge>
            <div className="flex items-center text-sm">
              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
              <span className="font-medium">{property.rating}</span>
              <span className="text-muted-foreground ml-1">({property.reviews})</span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default PropertyCard;