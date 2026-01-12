import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, MapPin, Briefcase, Upload, Leaf, Package } from 'lucide-react';
import Button from '../common/Button';
import Input, { Select, Checkbox } from '../common/Input';
import UserTypeSelector from './UserTypeSelector';
import { useAuth } from '../../hooks/useAuth';
import Alert from '../common/Alert';

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
    responsibleName: '',
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
        setErrors(prev => ({ ...prev, identityDocument: 'Le fichier ne doit pas dépasser 5 MB' }));
        return;
      }
      // Check type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, identityDocument: 'Format non accepté. Utilisez JPG, PNG ou PDF' }));
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
      if (!formData.responsibleName.trim()) {
        newErrors.responsibleName = 'Nom du responsable requis';
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
      // Create FormData for file upload
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
        // For consumer, simple data
        Object.keys(formData).forEach(key => {
          if (formData[key] !== null && formData[key] !== '') {
            submitData.append(key, formData[key]);
          }
        });
      }

      const response = await register(submitData);
      setSuccess(true);
      
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        } else if (redirectTo) {
          navigate(redirectTo);
        } else {
          // Automatic redirect based on userType
          const userType = response?.user?.userType || response?.userType || formData.userType;
          if (userType === 'producer' || userType === 'producteur') {
            navigate('/dashboard/producteur');
          } else {
            navigate('/');
          }
        }
      }, 2000);
    } catch (err) {
      setError(err.message || 'Une erreur est survenue lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Inscription réussie !</h3>
        <p className="text-gray-600 mb-4">
          {formData.userType === 'producer' 
            ? 'Votre compte producteur a été créé avec succès. Redirection vers votre dashboard...' 
            : 'Votre compte a été créé avec succès. Redirection...'}
        </p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {error && (
        <Alert
          type="error"
          message={error}
          dismissible
          onDismiss={() => setError('')}
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
                placeholder="Jean"
                icon={<User />}
                error={errors.firstName}
                required
              />
              <Input
                label="Nom"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Dupont"
                icon={<User />}
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
              placeholder="exemple@email.com"
              icon={<Mail />}
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
              icon={<Phone />}
              error={errors.phone}
              required
            />

            <Input
              label="Adresse (optionnel)"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Votre adresse complète"
              icon={<MapPin />}
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
            <Input
              label="Nom complet du responsable"
              name="responsibleName"
              value={formData.responsibleName}
              onChange={handleChange}
              placeholder="Ex: Jean Dupont"
              icon={<User />}
              error={errors.responsibleName}
              required
            />

            {/* Structure name */}
            <Input
              label="Nom de la structure (optionnel)"
              name="structureName"
              value={formData.structureName}
              onChange={handleChange}
              placeholder="Ex: Ferme Bio du Gabon"
              icon={<Briefcase />}
            />

            {/* Production types */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Types de production <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {productionTypeOptions.map(option => (
                  <label
                    key={option.value}
                    className={`
                      flex items-center p-3 rounded-lg border-2 cursor-pointer transition
                      ${formData.productionTypes.includes(option.value)
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <input
                      type="checkbox"
                      checked={formData.productionTypes.includes(option.value)}
                      onChange={() => handleProductionTypeChange(option.value)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.productionTypes && (
                <p className="text-red-500 text-sm mt-1">{errors.productionTypes}</p>
              )}
            </div>

            {/* Other production */}
            <Input
              label="Autre type de production"
              name="otherProduction"
              value={formData.otherProduction}
              onChange={handleChange}
              placeholder="Si autre, précisez..."
              icon={<Leaf />}
            />

            {/* Location */}
            <div>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Select
                    label="Ville"
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
                    label="Village (optionnel)"
                    name="productionVillage"
                    value={formData.productionVillage}
                    onChange={handleChange}
                    placeholder="Nom du village"
                    icon={<MapPin />}
                  />
                </div>
              )}
            </div>

            {/* Cultivated area / Capacity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Surface cultivée / Capacité (optionnel)"
                name="cultivatedArea"
                type="number"
                value={formData.cultivatedArea}
                onChange={handleChange}
                placeholder="Ex: 5"
                icon={<Package />}
              />
              <Select
                label="Unité"
                name="areaUnit"
                value={formData.areaUnit}
                onChange={handleChange}
                options={[
                  { value: 'hectare', label: 'Hectare (ha)' },
                  { value: 'metre-carre', label: 'Mètre carré (m²)' },
                ]}
              />
            </div>

            {/* Available quantity */}
            <Input
              label="Quantité disponible (optionnel)"
              name="availableQuantity"
              value={formData.availableQuantity}
              onChange={handleChange}
              placeholder="Ex: 500 kg, 100 unités..."
              icon={<Package />}
            />

            {/* Producer phone */}
            <div>
              <Input
                label="Numéro de téléphone"
                type="tel"
                name="producerPhone"
                value={formData.producerPhone}
                onChange={handleChange}
                placeholder="+241 XX XX XX XX"
                icon={<Phone />}
                error={errors.producerPhone}
                required
              />
              <div className="mt-2">
                <Checkbox
                  name="isWhatsApp"
                  checked={formData.isWhatsApp}
                  onChange={handleChange}
                  label="Ce numéro est aussi sur WhatsApp"
                />
              </div>
            </div>

            {/* Producer email */}
            <Input
              label="Adresse email (optionnel)"
              type="email"
              name="producerEmail"
              value={formData.producerEmail}
              onChange={handleChange}
              placeholder="exemple@email.com"
              icon={<Mail />}
              error={errors.producerEmail}
            />

            {/* Delivery possibility */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Possibilité de livraison (optionnel)
              </label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="deliveryPossibility"
                    value="oui"
                    checked={formData.deliveryPossibility === 'oui'}
                    onChange={handleChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Oui</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="deliveryPossibility"
                    value="non"
                    checked={formData.deliveryPossibility === 'non'}
                    onChange={handleChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Non</span>
                </label>
              </div>
            </div>

            {/* Identity document */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pièce d'identité <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex items-center">
                <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-gray-500 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-50 transition">
                  <Upload className="h-8 w-8 mb-2" />
                  <span className="text-sm">
                    {formData.identityDocument 
                      ? formData.identityDocument.name 
                      : 'Cliquez pour télécharger (JPG, PNG, PDF - max 5MB)'}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              {errors.identityDocument && (
                <p className="text-red-500 text-sm mt-1">{errors.identityDocument}</p>
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
          placeholder="••••••••"
          icon={<Lock />}
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
          placeholder="••••••••"
          icon={<Lock />}
          error={errors.confirmPassword}
          required
        />

        {/* Terms */}
        <div>
          <Checkbox
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            label={
              <span className="text-sm">
                J'accepte les{' '}
                <Link to="/conditions" className="text-green-600 hover:underline font-semibold">
                  conditions d'utilisation
                </Link>{' '}
                et la{' '}
                <Link to="/confidentialite" className="text-green-600 hover:underline font-semibold">
                  politique de confidentialité
                </Link>
              </span>
            }
          />
          {errors.acceptTerms && (
            <p className="text-red-500 text-sm mt-1">{errors.acceptTerms}</p>
          )}
        </div>

        {/* Submit */}
        <Button
          fullWidth
          size="lg"
          loading={loading}
          onClick={handleSubmit}
        >
          {loading ? 'Inscription...' : 'S\'inscrire'}
        </Button>

        {/* Login Link */}
        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-gray-600">
            Vous avez déjà un compte ?{' '}
            <Link 
              to="/connexion" 
              className="text-green-600 hover:text-green-700 font-bold hover:underline"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;