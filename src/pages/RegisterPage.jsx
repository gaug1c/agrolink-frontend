import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, MapPin, Briefcase, Upload, Leaf, Package } from 'lucide-react';
import Button from '../components/common/Button';
import Input, { Select, Checkbox } from '../components/common/Input';
import UserTypeSelector from '../components/auth/UserTypeSelector';
import { useAuth } from '../hooks/useAuth';
import Alert from '../components/common/Alert';

const RegisterForm = ({ onSuccess, redirectTo }) => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    userType: 'consumer',
    
    // Common fields
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    
    // Consumer fields
    lastName: '',
    firstName: '',
    phone: '',
    address: '',
    city: '',
    
    // Producer fields
    responsibleLastName: '',
    responsibleFirstName: '',
    structureName: '',
    productionTypes: [],
    otherProduction: '',
    province: '',
    productionCity: '',
    productionVillage: '',
    cultivatedArea: '',
    areaUnit: 'hectare',
    availableQuantity: '',
    producerPhone: '',
    isWhatsApp: false,
    producerEmail: '',
    deliveryPossibility: '',
    identityDocument: null,
  });

  const [errors, setErrors] = useState({});

  // Options for consumers
  const cityOptions = [
    { value: '', label: 'Sélectionner une ville' },
    { value: 'libreville', label: 'Libreville' },
    { value: 'port-gentil', label: 'Port-Gentil' },
    { value: 'franceville', label: 'Franceville' },
    { value: 'oyem', label: 'Oyem' },
    { value: 'moanda', label: 'Moanda' },
  ];

  // Options for producers
  const provinceOptions = [
    { value: '', label: 'Sélectionner une province' },
    { value: 'estuaire', label: 'Estuaire' },
    { value: 'haut-ogooue', label: 'Haut-Ogooué' },
    { value: 'moyen-ogooue', label: 'Moyen-Ogooué' },
    { value: 'ngounie', label: 'Ngounié' },
    { value: 'nyanga', label: 'Nyanga' },
    { value: 'ogooue-ivindo', label: 'Ogooué-Ivindo' },
    { value: 'ogooue-lolo', label: 'Ogooué-Lolo' },
    { value: 'ogooue-maritime', label: 'Ogooué-Maritime' },
    { value: 'woleu-ntem', label: 'Woleu-Ntem' },
  ];

  const citiesByProvince = {
    'estuaire': ['Libreville', 'Owendo', 'Akanda', 'Ntoum', 'Kango'],
    'haut-ogooue': ['Franceville', 'Moanda', 'Mounana', 'Okondja', 'Lékoni'],
    'moyen-ogooue': ['Lambaréné', 'Ndjolé', 'Bifoun'],
    'ngounie': ['Mouila', 'Ndendé', 'Mimongo', 'Mbigou', 'Lebamba'],
    'nyanga': ['Tchibanga', 'Mayumba', 'Moabi'],
    'ogooue-ivindo': ['Makokou', 'Mékambo', 'Booué', 'Ovan'],
    'ogooue-lolo': ['Koulamoutou', 'Lastoursville', 'Pana'],
    'ogooue-maritime': ['Port-Gentil', 'Omboué', 'Gamba'],
    'woleu-ntem': ['Oyem', 'Bitam', 'Mitzic', 'Minvoul'],
  };

  const productionTypeOptions = [
    { value: 'banane', label: 'Banane' },
    { value: 'manioc', label: 'Manioc' },
    { value: 'tomate', label: 'Tomate' },
    { value: 'aubergine', label: 'Aubergine' },
    { value: 'piment', label: 'Piment' },
    { value: 'maïs', label: 'Maïs' },
    { value: 'arachide', label: 'Arachide' },
    { value: 'poisson', label: 'Poisson' },
    { value: 'poulet', label: 'Poulet' },
    { value: 'porc', label: 'Porc' },
    { value: 'œufs', label: 'Œufs' },
    { value: 'légumes', label: 'Légumes' },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleProductionTypeChange = (value) => {
    setFormData(prev => {
      const productionTypes = prev.productionTypes.includes(value)
        ? prev.productionTypes.filter(t => t !== value)
        : [...prev.productionTypes, value];
      
      return { ...prev, productionTypes };
    });

    if (errors.productionTypes) {
      setErrors(prev => ({ ...prev, productionTypes: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          identityDocument: 'Le fichier ne doit pas dépasser 5 MB'
        }));
        return;
      }

      // Check type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          identityDocument: 'Format non accepté. Utilisez JPG, PNG ou PDF'
        }));
        return;
      }

      setFormData(prev => ({ ...prev, identityDocument: file }));
      setErrors(prev => ({ ...prev, identityDocument: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (formData.userType === 'consumer') {
      // Consumer validation
      if (!formData.lastName.trim()) newErrors.lastName = 'Nom requis';
      if (!formData.firstName.trim()) newErrors.firstName = 'Prénom requis';
      if (!formData.email) {
        newErrors.email = 'Email requis';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email invalide';
      }
      if (!formData.phone) {
        newErrors.phone = 'Téléphone requis';
      } else if (!/^(\+241)?[0-9]{8,}$/.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Numéro invalide';
      }
      if (!formData.city) newErrors.city = 'Ville requise';
    } else if (formData.userType === 'producer') {
      // Producer validation
      if (!formData.responsibleLastName.trim()) {
        newErrors.responsibleLastName = 'Nom du responsable requis';
      }
      if (formData.productionTypes.length === 0 && !formData.otherProduction.trim()) {
        newErrors.productionTypes = 'Sélectionnez au moins un type de production';
      }
      if (!formData.province) {
        newErrors.province = 'Province requise';
      }
      if (!formData.productionCity && !formData.productionVillage) {
        newErrors.productionCity = 'Ville ou village requis';
      }
      if (!formData.producerPhone) {
        newErrors.producerPhone = 'Numéro de téléphone requis';
      } else if (!/^(\+241)?[0-9]{8,}$/.test(formData.producerPhone.replace(/\s/g, ''))) {
        newErrors.producerPhone = 'Numéro invalide';
      }
      if (formData.producerEmail && !/\S+@\S+\.\S+/.test(formData.producerEmail)) {
        newErrors.producerEmail = 'Email invalide';
      }
      if (!formData.identityDocument) {
        newErrors.identityDocument = 'Pièce d\'identité requise';
      }
    }

    // Common validation
    if (!formData.password) {
      newErrors.password = 'Mot de passe requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Au moins 6 caractères';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Vous devez accepter les conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validate()) return;

    setLoading(true);

    try {
      const submitData = new FormData();

      if (formData.userType === 'producer') {
        Object.keys(formData).forEach(key => {
          if (key === 'productionTypes') {
            submitData.append(key, JSON.stringify(formData[key]));
          } else if (key === 'identityDocument' && formData[key]) {
            submitData.append(key, formData[key]);
          } else if (formData[key] !== null && formData[key] !== '') {
            submitData.append(key, formData[key]);
          }
        });
      } else {
        Object.keys(formData).forEach(key => {
          if (formData[key] !== null && formData[key] !== '') {
            submitData.append(key, formData[key]);
          }
        });
      }

      const response = await register(submitData);

      // Check that registration succeeded on backend
      if (!response?.data?.user || !response?.data?.token) {
        throw new Error(response?.data?.message || "Impossible de créer le compte");
      }

      // Success
      setSuccess(true);

      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        } else if (redirectTo) {
          navigate(redirectTo);
        } else {
          const userType = response.data.user.userType || formData.userType;
          if (userType === 'producer' || userType === 'producteur') {
            navigate('/producteur/dashboard');
          } else {
            navigate('/');
          }
        }
      }, 2000);

    } catch (err) {
      console.error('Erreur inscription:', err);
      console.log('Données de l\'erreur:', err.response?.data);
      setError(err.response?.data?.message || err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4">
        <Alert
          type="success"
          title="Inscription réussie !"
          message={
            formData.userType === 'producer'
              ? 'Votre compte producteur a été créé avec succès. Redirection vers votre dashboard...'
              : 'Votre compte a été créé avec succès. Redirection...'
          }
          className="max-w-md"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Créer un compte
            </h2>
            <p className="text-gray-600">
              Rejoignez AgriConnect pour {formData.userType === 'consumer' ? 'acheter' : 'vendre'} des produits locaux
            </p>
          </div>

          {error && (
            <Alert
              type="error"
              title="Erreur"
              message={error}
              onClose={() => setError('')}
              className="mb-6"
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Selector */}
            <UserTypeSelector
              selected={formData.userType}
              onChange={(type) => setFormData(prev => ({ ...prev, userType: type }))}
            />

            {/* CONSUMER FIELDS */}
            {formData.userType === 'consumer' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Prénom"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    icon={<User className="w-5 h-5 text-gray-400" />}
                    error={errors.firstName}
                    required
                  />
                  <Input
                    label="Nom"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    icon={<User className="w-5 h-5 text-gray-400" />}
                    error={errors.lastName}
                    required
                  />
                </div>

                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  icon={<Mail className="w-5 h-5 text-gray-400" />}
                  error={errors.email}
                  required
                />

                <Input
                  label="Téléphone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+241 XX XX XX XX"
                  icon={<Phone className="w-5 h-5 text-gray-400" />}
                  error={errors.phone}
                  required
                />

                <Input
                  label="Adresse"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  icon={<MapPin className="w-5 h-5 text-gray-400" />}
                />

                <Select
                  label="Ville"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  options={cityOptions}
                  error={errors.city}
                  required
                />
              </>
            )}

            {/* PRODUCER FIELDS */}
            {formData.userType === 'producer' && (
              <>
                {/* Responsible name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Nom du responsable"
                    name="responsibleLastName"
                    value={formData.responsibleLastName}
                    onChange={handleChange}
                    icon={<User className="w-5 h-5 text-gray-400" />}
                    error={errors.responsibleLastName}
                    required
                  />
                  <Input
                    label="Prénom du responsable"
                    name="responsibleFirstName"
                    value={formData.responsibleFirstName}
                    onChange={handleChange}
                    icon={<User className="w-5 h-5 text-gray-400" />}
                  />
                </div>

                {/* Structure name */}
                <Input
                  label="Nom de la structure (optionnel)"
                  name="structureName"
                  value={formData.structureName}
                  onChange={handleChange}
                  icon={<Briefcase className="w-5 h-5 text-gray-400" />}
                />

                {/* Production types */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Types de production *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {productionTypeOptions.map(option => (
                      <label
                        key={option.value}
                        className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.productionTypes.includes(option.value)}
                          onChange={() => handleProductionTypeChange(option.value)}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.productionTypes && (
                    <p className="mt-1 text-sm text-red-600">{errors.productionTypes}</p>
                  )}
                </div>

                {/* Other production */}
                <Input
                  label="Autre production (si non listée)"
                  name="otherProduction"
                  value={formData.otherProduction}
                  onChange={handleChange}
                  icon={<Leaf className="w-5 h-5 text-gray-400" />}
                />

                {/* Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Province"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    options={provinceOptions}
                    error={errors.province}
                    required
                  />

                  {formData.province && citiesByProvince[formData.province] && (
                    <div className="space-y-4">
                      <Select
                        label="Ville de production"
                        name="productionCity"
                        value={formData.productionCity}
                        onChange={handleChange}
                        options={[
                          { value: '', label: 'Sélectionner une ville' },
                          ...citiesByProvince[formData.province].map(v => ({ value: v, label: v }))
                        ]}
                        error={errors.productionCity}
                      />
                      <Input
                        label="Village de production"
                        name="productionVillage"
                        value={formData.productionVillage}
                        onChange={handleChange}
                        placeholder="Nom du village"
                      />
                    </div>
                  )}
                </div>

                {/* Cultivated area / Capacity */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Surface cultivée / Capacité"
                    name="cultivatedArea"
                    type="number"
                    value={formData.cultivatedArea}
                    onChange={handleChange}
                    placeholder="Ex: 2"
                    className="md:col-span-2"
                  />
                  <Select
                    label="Unité"
                    name="areaUnit"
                    value={formData.areaUnit}
                    onChange={handleChange}
                    options={[
                      { value: 'hectare', label: 'Hectare' },
                      { value: 'm2', label: 'm²' },
                      { value: 'tetes', label: 'Têtes' },
                    ]}
                  />
                </div>

                {/* Available quantity */}
                <Input
                  label="Quantité disponible / Production mensuelle"
                  name="availableQuantity"
                  value={formData.availableQuantity}
                  onChange={handleChange}
                  placeholder="Ex: 500 kg/mois"
                  icon={<Package className="w-5 h-5 text-gray-400" />}
                />

                {/* Producer phone */}
                <div className="space-y-2">
                  <Input
                    label="Numéro de téléphone"
                    type="tel"
                    name="producerPhone"
                    value={formData.producerPhone}
                    onChange={handleChange}
                    placeholder="+241 XX XX XX XX"
                    icon={<Phone className="w-5 h-5 text-gray-400" />}
                    error={errors.producerPhone}
                    required
                  />
                  <Checkbox
                    label="Ce numéro est sur WhatsApp"
                    name="isWhatsApp"
                    checked={formData.isWhatsApp}
                    onChange={handleChange}
                  />
                </div>

                {/* Producer email */}
                <Input
                  label="Email (optionnel)"
                  type="email"
                  name="producerEmail"
                  value={formData.producerEmail}
                  onChange={handleChange}
                  icon={<Mail className="w-5 h-5 text-gray-400" />}
                  error={errors.producerEmail}
                />

                {/* Delivery possibility */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Possibilité de livraison (optionnel)
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="deliveryPossibility"
                        value="oui"
                        checked={formData.deliveryPossibility === 'oui'}
                        onChange={handleChange}
                        className="h-4 w-4 text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Oui</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="deliveryPossibility"
                        value="non"
                        checked={formData.deliveryPossibility === 'non'}
                        onChange={handleChange}
                        className="h-4 w-4 text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Non</span>
                    </label>
                  </div>
                </div>

                {/* Identity document */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pièce d'identité *
                  </label>
                  <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition-colors">
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <span className="text-sm text-gray-600">
                        {formData.identityDocument
                          ? formData.identityDocument.name
                          : 'Cliquez pour télécharger (JPG, PNG, PDF - max 5MB)'}
                      </span>
                    </div>
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  {errors.identityDocument && (
                    <p className="mt-1 text-sm text-red-600">{errors.identityDocument}</p>
                  )}
                </div>
              </>
            )}

            {/* COMMON FIELDS */}
            
            {/* Password */}
            <Input
              label="Mot de passe"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              icon={<Lock className="w-5 h-5 text-gray-400" />}
              error={errors.password}
              required
            />

            {/* Confirm password */}
            <Input
              label="Confirmer le mot de passe"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              icon={<Lock className="w-5 h-5 text-gray-400" />}
              error={errors.confirmPassword}
              required
            />

            {/* Terms */}
            <div className="space-y-2">
              <Checkbox
                label={
                  <span className="text-sm text-gray-600">
                    J'accepte les{' '}
                    <Link to="/terms" className="text-green-600 hover:text-green-700">
                      conditions d'utilisation
                    </Link>{' '}
                    et la{' '}
                    <Link to="/privacy" className="text-green-600 hover:text-green-700">
                      politique de confidentialité
                    </Link>
                  </span>
                }
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
              />
              {errors.acceptTerms && (
                <p className="text-sm text-red-600">{errors.acceptTerms}</p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Inscription...' : 'S\'inscrire'}
            </Button>

            {/* Login Link */}
            <div className="text-center text-sm text-gray-600">
              Vous avez déjà un compte ?{' '}
              <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
                Se connecter
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;