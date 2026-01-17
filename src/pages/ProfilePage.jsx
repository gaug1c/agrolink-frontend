import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShoppingBag, Heart, Settings, LogOut, Store, Leaf, MapPin, Phone, Mail, Package, CheckCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // Redirection après déconnexion
    navigate('/connexion');
  };

  // Déterminer si l'utilisateur est un producteur
  const isProducer = user?.userType === 'producteur' || user?.userType === 'producer';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  {isProducer ? (
                    <Store className="h-12 w-12 text-green-600" />
                  ) : (
                    <User className="h-12 w-12 text-green-600" />
                  )}
                </div>
                <h3 className="font-semibold text-lg">
                  {isProducer 
                    ? (user?.nomResponsable || user?.firstName) 
                    : `${user?.firstName || user?.prenom || ''} ${user?.lastName || user?.nom || ''}`}
                </h3>
                <p className="text-gray-600 text-sm">{user?.email || user?.emailproducer}</p>
                <span className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${
                  isProducer 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {isProducer ? 'producteur' : 'consommateur'}
                </span>
              </div>
              <nav className="space-y-2">
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-green-50 text-green-600">
                  <User className="h-5 w-5" />
                  <span>Mon profil</span>
                </button>
                {isProducer ? (
                  <>
                    <button 
                      onClick={() => navigate('/producer/dashboard')}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50"
                    >
                      <Store className="h-5 w-5" />
                      <span>Mon dashboard</span>
                    </button>
                    <button 
                      onClick={() => navigate('/producer/produits')}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50"
                    >
                      <Package className="h-5 w-5" />
                      <span>Mes produits</span>
                    </button>
                    <button 
                      onClick={() => navigate('/producer/commandes')}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50"
                    >
                      <ShoppingBag className="h-5 w-5" />
                      <span>Mes ventes</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50">
                      <ShoppingBag className="h-5 w-5" />
                      <span>Mes commandes</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50">
                      <Heart className="h-5 w-5" />
                      <span>Favoris</span>
                    </button>
                  </>
                )}
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50">
                  <Settings className="h-5 w-5" />
                  <span>Paramètres</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Déconnexion</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">
                {isProducer ? 'Informations du producteur' : 'Informations personnelles'}
              </h2>
              
              {isProducer ? (
                // Informations Producteur
                <div className="space-y-6">
                  {/* Section Responsable */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <User className="h-5 w-5 mr-2 text-green-600" />
                      Responsable
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom complet
                        </label>
                        <input
                          type="text"
                          value={user?.nomResponsable || ''}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                          readOnly
                        />
                      </div>
                      {user?.nomStructure && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nom de la structure
                          </label>
                          <input
                            type="text"
                            value={user?.nomStructure || ''}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                            readOnly
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Section Production */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <Leaf className="h-5 w-5 mr-2 text-green-600" />
                      Production
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Types de production
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {user?.typesProduction && Array.isArray(user.typesProduction) && user.typesProduction.length > 0 ? (
                            user.typesProduction.map((type, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                              >
                                {type}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-500 text-sm">Non spécifié</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section Localisation */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-green-600" />
                      Localisation
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {user?.province && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Province
                          </label>
                          <input
                            type="text"
                            value={user?.province || ''}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 capitalize"
                            readOnly
                          />
                        </div>
                      )}
                      {user?.villeProduction && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ville
                          </label>
                          <input
                            type="text"
                            value={user?.villeProduction || ''}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                            readOnly
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Section Contact */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <Phone className="h-5 w-5 mr-2 text-green-600" />
                      Contact
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          value={user?.phoneproducer || user?.phone || ''}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                          readOnly
                        />
                      </div>
                      {user?.emailproducer && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            value={user?.emailproducer || ''}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                            readOnly
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                // Informations Consommateur
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prénom
                      </label>
                      <input
                        type="text"
                        value={user?.first_name || user?.prenom || ''}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom
                      </label>
                      <input
                        type="text"
                        value={user?.last_name || user?.nom || ''}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        readOnly
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={user?.phone || user?.telephone || ''}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      readOnly
                    />
                  </div>
                </div>
              )}

              {/* Bouton de modification */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                  Modifier mes informations
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;