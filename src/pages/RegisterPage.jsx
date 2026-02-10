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
    // Champs communs
    email: '',
    password: '',
    password_confirmation: '',
    acceptTerms: false,
    
    // Champs communs: nom et prénom
    last_name: '',
    first_name: '',
    phone: '',
    adresse: '',
    city: '',
    
    // Champs producteur spécifiques
    nomStructure: '',
    typesProduction: [],
    autreProduction: '',
    province: '',
    cityProduction: '',
    villageProduction: '',
    surfaceCultivee: '',
    uniteSurface: 'hectare',
    quantiteDisponible: '',
    isWhatsApp: false,
    possibiliteLivraison: '',
    identityDocument: null,
  });

  const [errors, setErrors] = useState({});

  // Options pour consumers
  const citysOptions = [
    // { value: '', label: 'Sélectionner une ville' }, //delete
    { value: 'libreville', label: 'Libreville' },
    { value: 'port-gentil', label: 'Port-Gentil' },
    { value: 'franceville', label: 'Franceville' },
    { value: 'oyem', label: 'Oyem' },
    { value: 'moanda', label: 'Moanda' },
  ];

  // Options pour producteurs
  const provincesOptions = [
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

  const citysParProvince = {
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

  const productionTypesOptions = [
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
      const typesProduction = prev.typesProduction.includes(value)
        ? prev.typesProduction.filter(t => t !== value)
        : [...prev.typesProduction, value];
      return { ...prev, typesProduction };
    });
    if (errors.typesProduction) {
      setErrors(prev => ({ ...prev, typesProduction: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, identityDocument: 'Le fichier ne doit pas dépasser 5 MB' }));
        return;
      }
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

    // Validation commune
    if (!formData.first_name.trim()) newErrors.first_name = 'Prénom requis';
    if (!formData.last_name.trim()) newErrors.last_name = 'Nom requis';
    
    if (!formData.phone) {
      newErrors.phone = 'Téléphone requis';
    } else if (!/^(\+241)?[0-9]{8,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Numéro invalide';
    }

    if (!formData.city) newErrors.city = 'Ville requise';

    if (!formData.password) {
      newErrors.password = 'Mot de passe requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Au moins 8 caractères';
    }

    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = 'Les mots de passe ne correspondent pas';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Vous devez accepter les conditions';
    }

    if (formData.userType === 'consumer') {
      if (!formData.email) {
        newErrors.email = 'Email requis';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email invalide';
      }
    } else if (formData.userType === 'producer') {
      if (formData.typesProduction.length === 0 && !formData.autreProduction.trim()) {
        newErrors.typesProduction = 'Sélectionnez au moins un type de production';
      }

      if (!formData.province) {
        newErrors.province = 'Province requise';
      }

      if (!formData.cityProduction && !formData.villageProduction) {
        newErrors.cityProduction = 'Ville ou village requis';
      }

      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email invalide';
      }

      if (!formData.identityDocument) {
        newErrors.identityDocument = 'Pièce d\'identité requise';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    console.log('🚀 Formulaire soumis pour:', formData.userType);
    
    if (!validate()) {
      console.log('❌ Validation échouée:', errors);
      return;
    }

    setLoading(true);

    try {
      const submitData = new FormData();

      // CHAMPS COMMUNS
      submitData.append('userType', formData.userType);
      submitData.append('first_name', formData.first_name);
      submitData.append('last_name', formData.last_name);
      submitData.append('phone', formData.phone);
      submitData.append('password', formData.password);
      submitData.append('password_confirmation', formData.password_confirmation);
      submitData.append('city', formData.city);
      submitData.append('acceptTerms', '1');

      // CHAMPS SPÉCIFIQUES CONSUMER
      if (formData.userType === 'consumer') {
        submitData.append('email', formData.email);
        
        if (formData.adresse) {
          submitData.append('adresse', formData.adresse);
        }
      }

      // CHAMPS SPÉCIFIQUES PRODUCER
      if (formData.userType === 'producer') {
        submitData.append('province', formData.province);
        
        if (formData.typesProduction && formData.typesProduction.length > 0) {
          submitData.append('typesProduction', JSON.stringify(formData.typesProduction));
        }

        if (formData.nomStructure) {
          submitData.append('nomStructure', formData.nomStructure);
        }
        if (formData.autreProduction) {
          submitData.append('autreProduction', formData.autreProduction);
        }
        if (formData.cityProduction) {
          submitData.append('cityProduction', formData.cityProduction);
        }
        if (formData.villageProduction) {
          submitData.append('villageProduction', formData.villageProduction);
        }
        if (formData.surfaceCultivee) {
          submitData.append('surfaceCultivee', formData.surfaceCultivee);
        }
        if (formData.uniteSurface) {
          submitData.append('uniteSurface', formData.uniteSurface);
        }
        if (formData.quantiteDisponible) {
          submitData.append('quantiteDisponible', formData.quantiteDisponible);
        }
        if (formData.isWhatsApp !== undefined) {
          submitData.append('isWhatsApp', formData.isWhatsApp ? '1' : '0');
        }
        if (formData.email) {
          submitData.append('email', formData.email);
        }
        if (formData.possibiliteLivraison) {
          submitData.append('possibiliteLivraison', formData.possibiliteLivraison === 'oui' ? '1' : '0');
        }
        
        if (formData.identityDocument instanceof File) {
          submitData.append('identityDocument', formData.identityDocument);
        }
      }

      console.log('=== Données envoyées au backend ===');
      for (let pair of submitData.entries()) {
        console.log(pair[0] + ':', pair[1]);
      }

      console.log('📡 Envoi de la requête...');
      const response = await register(submitData);
      console.log('✅ Réponse reçue:', response);
      
      setSuccess(true);

      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        } else if (redirectTo) {
          navigate(redirectTo);
        } else {
          const userType = response?.user?.userType || response?.userType || formData.userType;
          if (userType === 'producteur' || userType === 'producer') {
            navigate('/producer/dashboard');
          } else {
            navigate('/');
          }
        }
      }, 1500);
    } catch (err) {
      console.error('❌ Erreur inscription:', err);

      if (err.response?.data) {
        console.log('Détails backend:', err.response.data);
        
        if (err.response.data.errors) {
          const errorMessages = Object.entries(err.response.data.errors)
            .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
            .join('\n');
          setError(errorMessages);
        } else if (err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError(JSON.stringify(err.response.data, null, 2));
        }
      } else {
        setError(err.message);
      }
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
        <UserTypeSelector
          selected={formData.userType}
          onChange={(type) => setFormData(prev => ({ ...prev, userType: type }))}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Prénom"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Jean"
            icon={<User />}
            error={errors.first_name}
            required
          />
          <Input
            label="Nom"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Dupont"
            icon={<User />}
            error={errors.last_name}
            required
          />
        </div>

        {formData.userType === 'consumer' && (
          <>
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
              name="adresse"
              value={formData.adresse}
              onChange={handleChange}
              placeholder="Votre adresse complète"
              icon={<MapPin />}
            />

            <Select
              label="Ville"
              name="city"
              value={formData.city}
              onChange={handleChange}
              options={citysOptions}
              error={errors.city}
              required
            />
          </>
        )}

        {formData.userType === 'producer' && (
          <>
            <Input
              label="Nom de la structure (optionnel)"
              name="nomStructure"
              value={formData.nomStructure}
              onChange={handleChange}
              placeholder="Ex: Ferme Bio du Gabon"
              icon={<Briefcase />}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Types de production <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {productionTypesOptions.map(option => (
                  <label
                    key={option.value}
                    className={`
                      flex items-center p-3 rounded-lg border-2 cursor-pointer transition
                      ${formData.typesProduction.includes(option.value)
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <input
                      type="checkbox"
                      checked={formData.typesProduction.includes(option.value)}
                      onChange={() => handleProductionTypeChange(option.value)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.typesProduction && (
                <p className="text-red-500 text-sm mt-1">{errors.typesProduction}</p>
              )}
            </div>

            <Input
              label="Autre type de production"
              name="autreProduction"
              value={formData.autreProduction}
              onChange={handleChange}
              placeholder="Si autre, précisez..."
              icon={<Leaf />}
            />

            <div>
              <Select
                label="Province"
                name="province"
                value={formData.province}
                onChange={handleChange}
                options={provincesOptions}
                error={errors.province}
                required
              />

              {formData.province && citysParProvince[formData.province] && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Select
                    label="Ville"
                    name="cityProduction"
                    value={formData.cityProduction}
                    onChange={handleChange}
                    options={[
                      { value: '', label: 'Sélectionner une ville' },
                      ...citysParProvince[formData.province].map(v => ({ value: v, label: v }))
                    ]}
                    error={errors.cityProduction}
                  />
                  <Input
                    label="Village (optionnel)"
                    name="villageProduction"
                    value={formData.villageProduction}
                    onChange={handleChange}
                    placeholder="Nom du village"
                    icon={<MapPin />}
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Surface cultivée / Capacité (optionnel)"
                name="surfaceCultivee"
                type="number"
                value={formData.surfaceCultivee}
                onChange={handleChange}
                placeholder="Ex: 5"
                icon={<Package />}
              />
              <Select
                label="Unité"
                name="uniteSurface"
                value={formData.uniteSurface}
                onChange={handleChange}
                options={[
                  { value: 'hectare', label: 'Hectare (ha)' },
                  { value: 'metre-carre', label: 'Mètre carré (m²)' },
                ]}
              />
            </div>

            <Input
              label="Quantité disponible (optionnel)"
              name="quantiteDisponible"
              value={formData.quantiteDisponible}
              onChange={handleChange}
              placeholder="Ex: 500 kg, 100 unités..."
              icon={<Package />}
            />

            <div>
              <Input
                label="Numéro de téléphone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+241 XX XX XX XX"
                icon={<Phone />}
                error={errors.phone}
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

            <Input
              label="Adresse email (optionnel)"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="exemple@email.com"
              icon={<Mail />}
              error={errors.email}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Possibilité de livraison (optionnel)
              </label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="possibiliteLivraison"
                    value="oui"
                    checked={formData.possibiliteLivraison === 'oui'}
                    onChange={handleChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Oui</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="possibiliteLivraison"
                    value="non"
                    checked={formData.possibiliteLivraison === 'non'}
                    onChange={handleChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Non</span>
                </label>
              </div>
            </div>

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

        <Input
          label="Confirmer le mot de passe"
          type="password"
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
          placeholder="••••••••"
          icon={<Lock />}
          error={errors.password_confirmation}
          required
        />

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

        <Button
          fullWidth
          size="lg"
          loading={loading}
          type="submit"
        >
          {loading ? 'Inscription...' : 'S\'inscrire'}
        </Button>

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