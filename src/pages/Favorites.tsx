import React from 'react';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useAuth } from '@/contexts/AuthContext';
import { mockProperties } from '@/data/properties';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth/AuthModal';
import { Heart, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const { favorites } = useFavorites();
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center animate-fade-in">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
            <Heart className="h-12 w-12 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Sign in to view favorites</h1>
            <p className="text-muted-foreground">
              Create an account or sign in to save your favorite properties and access them anytime.
            </p>
          </div>
          <div className="space-y-3">
            <Button onClick={() => setShowAuthModal(true)} className="w-full">
              Sign In / Sign Up
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link to="/properties">Browse Properties</Link>
            </Button>
          </div>
        </div>
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      </div>
    );
  }

  const favoriteProperties = mockProperties.filter(property => favorites.includes(property.id));

  if (favoriteProperties.length === 0) {
    return (
      <div className="min-h-screen bg-background py-8 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">No favorites yet</h1>
              <p className="text-muted-foreground">
                Start exploring properties and add them to your favorites to see them here.
              </p>
            </div>
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link to="/properties">
                  <Home className="h-4 w-4 mr-2" />
                  Browse Properties
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 animate-fade-in">
      <div className="container mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground flex items-center justify-center gap-3">
            <Heart className="h-8 w-8 text-destructive fill-destructive" />
            My Favorites
          </h1>
          <p className="text-muted-foreground">
            {favoriteProperties.length} {favoriteProperties.length === 1 ? 'property' : 'properties'} saved
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
          {favoriteProperties.map((property, index) => (
            <div
              key={property.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">Looking for more properties?</p>
          <Button asChild variant="outline">
            <Link to="/properties">
              <Home className="h-4 w-4 mr-2" />
              Explore More Properties
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Favorites;