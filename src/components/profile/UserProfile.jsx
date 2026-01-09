import React, { useState } from 'react';
import { Camera, Edit2, Save, X, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import Button from '../common/Button';
import Input, { Select } from '../common/Input';
import Alert from '../common/Alert';

const UserProfile = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    nom: user?.nom || '',
    prenom: user?.prenom || '',
    email: user?.email || '',
    telephone: user?.telephone || '',
    adresse: user?.adresse || '',
    ville: user?.ville || '',
    dateNaissance: user?.dateNaissance || '',
  });

  const villesOptions = [
    { value: '', label: 'Sélectionner une ville' },
    { value: 'libreville', label: 'Libreville' },
    { value: 'port-gentil', label: 'Port-Gentil' },
    { value: 'franceville', label: 'Franceville' },
    { value: 'oyem', label: 'Oyem' },
    { value: 'moanda', label: 'Moanda' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (onUpdate) {
        onUpdate(formData);
      }
      
      setSuccess(true);
      setIsEditing(false);
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Erreur de mise à jour:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      nom: user?.nom || '',
      prenom: user?.prenom || '',
      email: user?.email || '',
      telephone: user?.telephone || '',
      adresse: user?.adresse || '',
      ville: user?.ville || '',
      dateNaissance: user?.dateNaissance || '',
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {success && (
        <Alert
          type="success"
          message="Profil mis à jour avec succès !"
          className="m-6"
        />
      )}

      {/* Header avec photo */}
      <div className="relative h-32 bg-gradient-to-r from-green-600 to-green-800">
        <div className="absolute -bottom-16 left-8">
          <div className="relative">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-5xl border-4 border-white shadow-xl">
              {user?.avatar || '👤'}
            </div>
            <button className="absolute bottom-0 right-0 w-10 h-10 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center text-white shadow-lg transition">
              <Camera className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-4 right-4 bg-white hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2"
          >
            <Edit2 className="w-4 h-4" />
            Modifier
          </button>
        )}
      </div>

      <div className="pt-20 px-8 pb-8">
        {/* User Info Section */}
        {!isEditing ? (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {user?.prenom} {user?.nom}
            </h1>
            <p className="text-gray-600 mb-6">
              {user?.userType === 'producteur' ? 'Producteur' : 'Consommateur'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold text-gray-800">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Téléphone</p>
                  <p className="font-semibold text-gray-800">{user?.telephone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Adresse</p>
                  <p className="font-semibold text-gray-800">
                    {user?.adresse}, {user?.ville}
                  </p>
                </div>
              </div>

              {user?.dateNaissance && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date de naissance</p>
                    <p className="font-semibold text-gray-800">{user?.dateNaissance}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">{user?.ordersCount || 0}</p>
                <p className="text-sm text-gray-600">Commandes</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">{user?.favoritesCount || 0}</p>
                <p className="text-sm text-gray-600">Favoris</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">{user?.reviewsCount || 0}</p>
                <p className="text-sm text-gray-600">Avis</p>
              </div>
            </div>
          </div>
        ) : (
          /* Edit Form */
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Modifier le profil
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                />
                <Input
                  label="Prénom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                />
              </div>

              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              <Input
                label="Téléphone"
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
              />

              <Input
                label="Adresse"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Ville"
                  name="ville"
                  value={formData.ville}
                  onChange={handleChange}
                  options={villesOptions}
                />
                
                <Input
                  label="Date de naissance"
                  type="date"
                  name="dateNaissance"
                  value={formData.dateNaissance}
                  onChange={handleChange}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSubmit}
                  loading={loading}
                  icon={<Save className="w-5 h-5" />}
                >
                  Enregistrer
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  icon={<X className="w-5 h-5" />}
                >
                  Annuler
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;