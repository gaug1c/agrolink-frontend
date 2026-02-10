import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShoppingBag, Heart, Settings, LogOut, Store, Leaf, MapPin, Phone, Mail, Package, CheckCircle, Edit } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import EditProfileModal from '../components/EditProfileModal';

const ProfilePage = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/connexion');
  };

  const handleUpdateProfile = (updatedUser) => {
    // Mettre à jour l'utilisateur dans le contexte
    updateUser(updatedUser);
    
    // Afficher un message de succès
    setSuccessMessage('Profil mis à jour avec succès !');
    
    // Masquer le message après 5 secondes
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  };

  // Déterminer si l'utilisateur est un producteur
  const isProducer = user?.role === 'producteur' || user?.role === 'producer';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Message de succès */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <p className="text-sm text-green-800">{successMessage}</p>
          </div>
        )}

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
                    ? (user?.nomResponsable || user?.first_name) 
                    : `${user?.first_name || user?.prenom || ''} ${user?.last_name || user?.nom || ''}`}
                </h3>
                <p className="text-gray-600 text-sm">{user?.email || user?.emailproducer}</p>
                <span className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${
                  isProducer 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {isProducer ? 'Producteur' : 'Consommateur'}
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
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition"
                    >
                      <Store className="h-5 w-5" />
                      <span>Mon dashboard</span>
                    </button>
                    <button 
                      onClick={() => navigate('/producer/products')}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition"
                    >
                      <Package className="h-5 w-5" />
                      <span>Mes produits</span>
                    </button>
                    <button 
                      onClick={() => navigate('/producer/commandes')}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition"
                    >
                      <ShoppingBag className="h-5 w-5" />
                      <span>Mes ventes</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition">
                      <ShoppingBag className="h-5 w-5" />
                      <span>Mes commandes</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition">
                      <Heart className="h-5 w-5" />
                      <span>Favoris</span>
                    </button>
                  </>
                )}
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition">
                  <Settings className="h-5 w-5" />
                  <span>Paramètres</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition"
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  {isProducer ? 'Informations du producteur' : 'Informations personnelles'}
                </h2>
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  <Edit className="h-4 w-4" />
                  <span>Modifier</span>
                </button>
              </div>
              
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
            </div>
          </main>
        </div>
      </div>

      {/* Modal d'édition */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
        onUpdate={handleUpdateProfile}
      />
    </div>
  );
};

export default ProfilePage;