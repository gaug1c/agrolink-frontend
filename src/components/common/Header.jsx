import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Search, Heart } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated, logout } = useAuth();
  const { cart } = useCart();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    // Logique de recherche
    console.log('Recherche:', searchQuery);
  };

  return (
    <header className="bg-green-800 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="hidden md:flex items-center justify-between py-2 text-sm border-b border-green-700">
          <div className="flex items-center gap-4">
            <span>📞 +241 074 22 54 06</span>
            <span>📧 menguegauthier30@gmail.com</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/aide" className="hover:text-green-300 transition">
              Aide
            </Link>
            <span>|</span>
            <Link to="/suivi-commande" className="hover:text-green-300 transition">
              Suivre ma commande
            </Link>
          </div>
        </div>

        {/* Main Header */}
        <div className="py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-2xl">
                🅰
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-lg">AGRO</div>
                <div className="text-xs text-green-300">LINK GABON</div>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <form 
              onSubmit={handleSearch}
              className="hidden lg:flex flex-1 max-w-2xl"
            >
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher des produits..."
                  className="w-full px-4 py-3 pl-12 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition"
                >
                  Rechercher
                </button>
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Search Icon - Mobile */}
              <button className="lg:hidden hover:bg-green-700 p-2 rounded-lg transition">
                <Search className="w-6 h-6" />
              </button>

              {/* Favorites */}
              <Link 
                to="/favoris"
                className="hidden md:flex hover:bg-green-700 p-2 rounded-lg transition relative"
              >
                <Heart className="w-6 h-6" />
              </Link>

              {/* Cart */}
              <Link 
                to="/panier"
                className="hover:bg-green-700 p-2 rounded-lg transition relative"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="hidden md:flex items-center gap-2 hover:bg-green-700 px-3 py-2 rounded-lg transition">
                    <User className="w-6 h-6" />
                    <span className="hidden lg:inline">{user?.prenom}</span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link 
                      to="/profil"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-t-lg"
                    >
                      Mon Profil
                    </Link>
                    <Link 
                      to="/commandes"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
                    >
                      Mes Commandes
                    </Link>
                    <Link 
                      to="/favoris"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
                    >
                      Mes Favoris
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-3 text-red-600 hover:bg-gray-100 rounded-b-lg"
                    >
                      Déconnexion
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/connexion"
                  className="hidden md:block bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition font-semibold"
                >
                  Connexion
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden hover:bg-green-700 p-2 rounded-lg transition"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:block border-t border-green-700">
          <div className="flex items-center gap-8 py-3">
            <Link to="/" className="hover:text-green-300 transition font-medium">
              Accueil
            </Link>
            <Link to="/products" className="hover:text-green-300 transition font-medium">
              Nos Produits
            </Link>
            <Link to="/producers" className="hover:text-green-300 transition font-medium">
              Nos Producteurs
            </Link>
            <Link to="/categories" className="hover:text-green-300 transition font-medium">
              Catégories
            </Link>
            <Link to="/a-propos" className="hover:text-green-300 transition font-medium">
              À Propos
            </Link>
            <Link to="/contact" className="hover:text-green-300 transition font-medium">
              Contact
            </Link>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-green-700">
            {/* Search Bar - Mobile */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher..."
                  className="w-full px-4 py-3 pl-10 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </form>

            <div className="flex flex-col gap-1">
              <Link 
                to="/" 
                className="px-4 py-3 hover:bg-green-700 rounded-lg transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link 
                to="/produits" 
                className="px-4 py-3 hover:bg-green-700 rounded-lg transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Nos Produits
              </Link>
              <Link 
                to="/producers" 
                className="px-4 py-3 hover:bg-green-700 rounded-lg transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Nos Producteurs
              </Link>
              <Link 
                to="/categories" 
                className="px-4 py-3 hover:bg-green-700 rounded-lg transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Catégories
              </Link>
              <Link 
                to="/a-propos" 
                className="px-4 py-3 hover:bg-green-700 rounded-lg transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                À Propos
              </Link>
              <Link 
                to="/contact" 
                className="px-4 py-3 hover:bg-green-700 rounded-lg transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>

              {isAuthenticated ? (
                <>
                  <div className="border-t border-green-700 my-2"></div>
                  <Link 
                    to="/profil" 
                    className="px-4 py-3 hover:bg-green-700 rounded-lg transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Mon Profil
                  </Link>
                  <Link 
                    to="/commandes" 
                    className="px-4 py-3 hover:bg-green-700 rounded-lg transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Mes Commandes
                  </Link>
                  <Link 
                    to="/favoris" 
                    className="px-4 py-3 hover:bg-green-700 rounded-lg transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Mes Favoris
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-left px-4 py-3 text-red-300 hover:bg-green-700 rounded-lg transition"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <div className="border-t border-green-700 my-2"></div>
                  <Link
                    to="/connexion"
                    className="px-4 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition text-center font-semibold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Connexion / Inscription
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;