import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getPropertyById } from "@/data/properties";
import { 
  ArrowLeft, Heart, Share2, MapPin, Bed, Bath, Square, 
  Star, Calendar, Phone, Mail, MessageCircle, Wifi, 
  Car, Dumbbell, Waves, Shield, Clock 
} from "lucide-react";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const property = id ? getPropertyById(id) : null;
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Property not found</h1>
          <Button asChild>
            <Link to="/properties">Back to Properties</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Mock additional images and data for detail page
  const images = [
    property.image,
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
  ];

  const amenities = [
    { icon: Wifi, name: "High-Speed WiFi" },
    { icon: Car, name: "Parking Space" },
    { icon: Dumbbell, name: "Fitness Center" },
    { icon: Waves, name: "Swimming Pool" },
  ];

  const features = [
    "Central Air Conditioning",
    "Hardwood Floors",
    "Stainless Steel Appliances",
    "In-Unit Laundry",
    "Walk-in Closets",
    "Balcony/Patio",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="border-b border-border bg-background sticky top-16 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild>
              <Link to="/properties">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Properties
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-[16/10] rounded-lg overflow-hidden">
                <img
                  src={images[selectedImage]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-md overflow-hidden border-2 ${
                      selectedImage === index ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Property Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge>{property.type}</Badge>
                  {property.featured && (
                    <Badge variant="secondary">Featured</Badge>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {property.title}
                </h1>
                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{property.location}</span>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    <span>{property.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    <span>{property.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-4 w-4 mr-1" />
                    <span>{property.area} sqft</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Description
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  This stunning {property.type.toLowerCase()} offers modern living at its finest. 
                  Located in the heart of {property.location}, you'll enjoy easy access to shopping, 
                  dining, and entertainment. The spacious layout features {property.bedrooms} bedrooms 
                  and {property.bathrooms} bathrooms across {property.area} square feet of thoughtfully 
                  designed living space. Perfect for anyone seeking comfort, convenience, and style.
                </p>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Features & Amenities
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-foreground mb-2">Property Features</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-2">Building Amenities</h3>
                    <div className="space-y-2">
                      {amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center text-sm text-muted-foreground">
                          <amenity.icon className="h-4 w-4 mr-2" />
                          {amenity.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Reviews & Rating
                </h2>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                    <span className="text-lg font-semibold">{property.rating}</span>
                  </div>
                  <span className="text-muted-foreground">
                    Based on {property.reviews} reviews
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Tenants love the location, amenities, and responsive management. 
                  View all reviews to learn more about this property.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-2xl font-bold">
                    ${property.price.toLocaleString()}<span className="text-base font-normal text-muted-foreground">/month</span>
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Security Deposit</span>
                    <div className="font-semibold">${(property.price * 1.5).toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Available</span>
                    <div className="font-semibold">Immediately</div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-3">
                  <Button className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Tour
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Agent
                  </Button>
                  <Button variant="outline" className="w-full">
                    Apply Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Property Manager</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">JD</span>
                  </div>
                  <div>
                    <div className="font-semibold">Jane Doe</div>
                    <div className="text-sm text-muted-foreground">Licensed Agent</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    (555) 123-4567
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    jane@renthome.com
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Trust & Safety */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Trust & Safety
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  Verified property information
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Shield className="h-4 w-4 mr-2" />
                  Secure payment processing
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Star className="h-4 w-4 mr-2" />
                  Background-checked agents
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;