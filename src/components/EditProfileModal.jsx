import React, { useState } from 'react';
import { X, User, Mail, Phone, MapPin, Leaf, Building } from 'lucide-react';

const EditProfileModal = ({ isOpen, onClose, user, onUpdate }) => {
  const isProducer = user?.role === 'producteur' || user?.role === 'producer';

  const [formData, setFormData] = useState({
    // Consommateur
    first_name: user?.first_name || user?.prenom || '',
    last_name: user?.last_name || user?.nom || '',
    email: user?.email || '',
    phone: user?.phone || user?.telephone || '',
    
    // Producteur
    nomResponsable: user?.nomResponsable || '',
    nomStructure: user?.nomStructure || '',
    emailproducer: user?.emailproducer || '',
    phoneproducer: user?.phoneproducer || '',
    province: user?.province || '',
    villeProduction: user?.villeProduction || '',
    typesProduction: user?.typesProduction || [],
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleProductionTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      typesProduction: prev.typesProduction.includes(type)
        ? prev.typesProduction.filter(t => t !== type)
        : [...prev.typesProduction, type],
    }));
  };

  const validate = () => {
    if (isProducer) {
      if (!formData.nomResponsable?.trim()) {
        setError('Le nom du responsable est requis');
        return false;
      }
      if (!formData.emailproducer?.trim()) {
        setError('L\'email est requis');
        return false;
      }
      if (!/\S+@\S+\.\S+/.test(formData.emailproducer)) {
        setError('Email invalide');
        return false;
      }
      if (!formData.phoneproducer?.trim()) {
        setError('Le téléphone est requis');
        return false;
      }
    } else {
      if (!formData.first_name?.trim()) {
        setError('Le prénom est requis');
        return false;
      }
      if (!formData.last_name?.trim()) {
        setError('Le nom est requis');
        return false;
      }
      if (!formData.email?.trim()) {
        setError('L\'email est requis');
        return false;
      }
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setError('Email invalide');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validate()) return;

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const endpoint = isProducer 
        ? `${import.meta.env.VITE_API_URL}/producers/profile`
        : `${import.meta.env.VITE_API_URL}/users/profile`;

      // Préparer les données selon le type d'utilisateur
      const dataToSend = isProducer ? {
        nomResponsable: formData.nomResponsable,
        nomStructure: formData.nomStructure,
        emailproducer: formData.emailproducer,
        phoneproducer: formData.phoneproducer,
        province: formData.province,
        villeProduction: formData.villeProduction,
        typesProduction: formData.typesProduction,
      } : {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
      };

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      // Vérifier d'abord si la réponse est OK
      if (!response.ok) {
        // Essayer de parser le JSON d'erreur
        let errorMessage = 'Erreur lors de la mise à jour';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // Si le parsing JSON échoue, utiliser le message par défaut
          errorMessage = `Erreur ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      // Vérifier si la réponse contient du JSON
      const contentType = response.headers.get('content-type');
      let data = null;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        // Si pas de JSON, considérer que la mise à jour a réussi
        // et utiliser les données du formulaire
        data = { user: dataToSend };
      }

      // Appeler le callback pour mettre à jour l'utilisateur
      onUpdate(data.user || data.data || dataToSend);
      onClose();
    } catch (err) {
      console.error('Erreur lors de la mise à jour:', err);
      setError(err.message || 'Erreur lors de la mise à jour du profil');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const productionTypes = [
    'Fruits',
    'Légumes',
    'Céréales',
    'Produits laitiers',
    'Viande',
    'Œufs',
    'Miel',
    'Produits transformés',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          {/* Header */}
          <div className="bg-green-600 px-6 py-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">
              Modifier mes informations
            </h3>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="px-6 py-6">
            {/* Erreur */}
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {isProducer ? (
              // Formulaire Producteur
              <div className="space-y-6">
                {/* Responsable */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <User className="h-4 w-4 mr-2 text-green-600" />
                    Informations du responsable
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom du responsable <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="nomResponsable"
                        value={formData.nomResponsable}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Jean Dupont"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom de la structure
                      </label>
                      <input
                        type="text"
                        name="nomStructure"
                        value={formData.nomStructure}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Ferme Bio du Soleil"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-green-600" />
                    Coordonnées
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="emailproducer"
                        value={formData.emailproducer}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="contact@ferme.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phoneproducer"
                        value={formData.phoneproducer}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="06 12 34 56 78"
                      />
                    </div>
                  </div>
                </div>

                {/* Localisation */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-green-600" />
                    Localisation
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Province
                      </label>
                      <input
                        type="text"
                        name="province"
                        value={formData.province}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Île-de-France"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ville de production
                      </label>
                      <input
                        type="text"
                        name="villeProduction"
                        value={formData.villeProduction}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Paris"
                      />
                    </div>
                  </div>
                </div>

                {/* Types de production */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <Leaf className="h-4 w-4 mr-2 text-green-600" />
                    Types de production
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {productionTypes.map((type) => (
                      <label
                        key={type}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.typesProduction.includes(type)}
                          onChange={() => handleProductionTypeChange(type)}
                          className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <span className="text-sm text-gray-700">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Formulaire Consommateur
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Jean"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Dupont"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="jean.dupont@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="06 12 34 56 78"
                  />
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-6 flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;