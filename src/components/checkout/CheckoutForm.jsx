import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import ShippingInfo from './ShippingInfo';
import PaymentMethod from './PaymentMethod';
import OrderSummary from './OrderSummary';
import Button from '../common/Button';

const CheckoutForm = ({ cartItems = [], onOrderComplete }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    // Shipping
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    ville: '',
    codePostal: '',
    instructions: '',
    
    // Payment
    paymentMethod: 'card',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCVV: '',
    mobileNumber: '',
  });

  const [errors, setErrors] = useState({});

  const steps = [
    { id: 1, title: 'Livraison', icon: '📦' },
    { id: 2, title: 'Paiement', icon: '💳' },
    { id: 3, title: 'Confirmation', icon: '✓' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateShipping = () => {
    const newErrors = {};
    
    if (!formData.nom.trim()) newErrors.nom = 'Nom requis';
    if (!formData.prenom.trim()) newErrors.prenom = 'Prénom requis';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!formData.telephone) newErrors.telephone = 'Téléphone requis';
    if (!formData.adresse.trim()) newErrors.adresse = 'Adresse requise';
    if (!formData.ville) newErrors.ville = 'Ville requise';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors = {};
    
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length !== 16) {
        newErrors.cardNumber = 'Numéro de carte invalide';
      }
      if (!formData.cardName.trim()) newErrors.cardName = 'Nom requis';
      if (!formData.cardExpiry || !/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
        newErrors.cardExpiry = 'Format MM/AA requis';
      }
      if (!formData.cardCVV || formData.cardCVV.length !== 3) {
        newErrors.cardCVV = 'CVV invalide';
      }
    } else if (formData.paymentMethod === 'mobile') {
      if (!formData.mobileNumber) {
        newErrors.mobileNumber = 'Numéro mobile requis';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateShipping()) return;
    if (currentStep === 2 && !validatePayment()) return;
    
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      // Simulation d'envoi de commande
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const orderData = {
        ...formData,
        items: cartItems,
        orderNumber: `ORD-${Date.now()}`,
        date: new Date().toISOString(),
      };

      if (onOrderComplete) {
        onOrderComplete(orderData);
      }

      navigate('/commande-confirmee', { state: { order: orderData } });
    } catch (error) {
      console.error('Erreur de commande:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/panier')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Retour au panier</span>
        </button>

        {/* Steps Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold
                      transition-all duration-300
                      ${currentStep >= step.id
                        ? 'bg-green-600 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-500'
                      }
                    `}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <span
                    className={`
                      mt-2 text-sm font-semibold
                      ${currentStep >= step.id ? 'text-green-600' : 'text-gray-500'}
                    `}
                  >
                    {step.title}
                  </span>
                </div>
                
                {index < steps.length - 1 && (
                  <div
                    className={`
                      w-16 md:w-32 h-1 mx-2 rounded transition-all duration-300
                      ${currentStep > step.id ? 'bg-green-600' : 'bg-gray-200'}
                    `}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              {/* Step 1: Shipping */}
              {currentStep === 1 && (
                <ShippingInfo
                  formData={formData}
                  errors={errors}
                  onChange={handleChange}
                />
              )}

              {/* Step 2: Payment */}
              {currentStep === 2 && (
                <PaymentMethod
                  formData={formData}
                  errors={errors}
                  onChange={handleChange}
                />
              )}

              {/* Step 3: Review */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Vérification de la commande
                  </h2>
                  
                  {/* Shipping Summary */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-bold text-gray-800 mb-3">Adresse de livraison</h3>
                    <p className="text-gray-700">
                      {formData.prenom} {formData.nom}<br />
                      {formData.adresse}<br />
                      {formData.ville}, {formData.codePostal}<br />
                      {formData.telephone}
                    </p>
                  </div>

                  {/* Payment Summary */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-bold text-gray-800 mb-3">Méthode de paiement</h3>
                    <p className="text-gray-700">
                      {formData.paymentMethod === 'card' && 'Carte bancaire'}
                      {formData.paymentMethod === 'mobile' && 'Mobile Money'}
                      {formData.paymentMethod === 'cash' && 'Paiement à la livraison'}
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    icon={<ArrowLeft className="w-5 h-5" />}
                  >
                    Retour
                  </Button>
                )}

                <Button
                  fullWidth={currentStep === 1}
                  onClick={currentStep === 3 ? handleSubmit : handleNext}
                  loading={loading}
                  className="flex-1"
                >
                  {currentStep === 3 ? 'Confirmer la commande' : 'Continuer'}
                </Button>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <OrderSummary items={cartItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;