import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Truck, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const HowItWorks = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const steps = [
    {
      id: 1,
      icon: <Search className="w-10 h-10" />,
      title: 'Parcourez',
      description: 'Découvrez notre sélection de produits frais et locaux',
      color: 'from-blue-500 to-blue-600',
      emoji: '🔍',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop',
    },
    {
      id: 2,
      icon: <ShoppingCart className="w-10 h-10" />,
      title: 'Commandez',
      description: 'Ajoutez vos produits préférés au panier et validez',
      color: 'from-green-500 to-green-600',
      emoji: '🛒',
      image: 'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?w=800&h=600&fit=crop',
    },
    {
      id: 3,
      icon: <Truck className="w-10 h-10" />,
      title: 'Recevez',
      description: 'Livraison rapide à votre domicile en 24-48h',
      color: 'from-orange-500 to-orange-600',
      emoji: '🚚',
      image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&h=600&fit=crop',
    },
    {
      id: 4,
      icon: <CheckCircle className="w-10 h-10" />,
      title: 'Dégustez',
      description: 'Savourez des produits frais et de qualité',
      color: 'from-purple-500 to-purple-600',
      emoji: '😋',
      image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&h=600&fit=crop',
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, steps.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % steps.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + steps.length) % steps.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <>
      {/* Video Modal */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* YouTube Video Player */}
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/k6g5McPSNDU?autoplay=1"
                title="Tutoriel Agrolink"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video Info */}
            <div className="bg-gray-800 p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                Tutoriel Agrolink - Commandez en quelques clics
              </h3>
              <p className="text-gray-300 text-sm">
                Découvrez comment parcourir nos produits, passer commande et suivre votre livraison en temps réel.
              </p>
            </div>
          </div>
        </div>
      )}

      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-200 rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full opacity-10 blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Comment <span className="text-green-600">ça marche ?</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Commander vos produits locaux n'a jamais été aussi simple. Suivez ces 4 étapes faciles
            </p>
          </div>

          {/* Carousel Section */}
          <div className="mb-16">
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Slides Container */}
              <div className="relative h-96 md:h-[500px]">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      index === currentSlide
                        ? 'opacity-100 translate-x-0'
                        : index < currentSlide
                        ? 'opacity-0 -translate-x-full'
                        : 'opacity-0 translate-x-full'
                    }`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                      {/* Image Side */}
                      <div className="relative h-64 md:h-full overflow-hidden">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                        {/* Number Badge on Image */}
                        <div className="absolute top-6 left-6 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl">
                          <span className="text-3xl font-bold text-green-600">{step.id}</span>
                        </div>
                      </div>

                      {/* Content Side */}
                      <div className="flex flex-col justify-center p-8 md:p-12 bg-gradient-to-br from-gray-50 to-white">
                        <div
                          className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}
                        >
                          {step.icon}
                        </div>
                        <div className="text-6xl mb-4">{step.emoji}</div>
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 text-lg mb-6">
                          {step.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-300"
                              style={{ width: `${((index + 1) / steps.length) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-gray-500">
                            {index + 1}/{steps.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 z-10"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 z-10"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>

              {/* Dots Navigation */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentSlide
                        ? 'w-12 h-3 bg-green-600'
                        : 'w-3 h-3 bg-white/70 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Auto-play Control */}
            <div className="text-center mt-4">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="text-sm text-gray-600 hover:text-green-600 transition"
              >
                {isAutoPlaying ? '⏸ Pause' : '▶ Lecture automatique'}
              </button>
            </div>
          </div>

          {/* Why Choose Agrolink - Modern Cards */}
          <div className="mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
              Pourquoi choisir <span className="text-green-600">Agrolink</span> ?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 - Rapidité */}
              <div className="group relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-300 rounded-full opacity-20 -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-3">Ultra Rapide</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Commandez en quelques clics et recevez vos produits frais en <span className="font-semibold text-blue-600">24-48h</span>. Interface intuitive et paiement simplifié.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-4 transition-all">
                    <span>En savoir plus</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card 2 - Sécurité */}
              <div className="group relative bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-300 rounded-full opacity-20 -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-3">100% Sécurisé</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Paiement crypté et protection totale de vos données personnelles. Transactions <span className="font-semibold text-emerald-600">certifiées sécurisées</span>.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-emerald-600 font-semibold group-hover:gap-4 transition-all">
                    <span>En savoir plus</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card 3 - Local */}
              <div className="group relative bg-gradient-to-br from-amber-50 to-amber-100 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-300 rounded-full opacity-20 -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-3">Circuit Court</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Soutenez directement les <span className="font-semibold text-amber-600">producteurs gabonais</span>. Produits frais, traçables et respectueux de l'environnement.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-amber-600 font-semibold group-hover:gap-4 transition-all">
                    <span>En savoir plus</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className="mt-16 bg-gradient-to-r from-green-600 to-green-800 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <div className="inline-block bg-yellow-400 text-green-900 px-4 py-2 rounded-full text-sm font-bold mb-4">
                  🎥 Tutoriel vidéo
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Découvrez Agrolink en vidéo
                </h3>
                <p className="text-green-100 mb-6 text-lg leading-relaxed">
                  Regardez notre tutoriel complet pour découvrir comment utiliser la plateforme et commander vos produits préférés en toute simplicité.
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-green-50">Parcourir les produits locaux</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-green-50">Passer commande facilement</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-green-50">Suivre votre livraison en temps réel</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="bg-white text-green-800 hover:bg-green-50 font-bold py-4 px-8 rounded-xl transition-all hover:scale-105 hover:shadow-xl flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center group-hover:bg-green-700 transition-colors">
                    <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                  <span className="text-lg">Regarder la vidéo</span>
                </button>
                <p className="text-green-200 text-sm mt-4">⏱️ Durée : 3 minutes</p>
              </div>

              {/* Video Thumbnail */}
              <div
                className="relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
                onClick={() => setIsVideoModalOpen(true)}
              >
                <img
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=450&fit=crop"
                  alt="Aperçu vidéo tutoriel"
                  className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                    <svg className="w-10 h-10 text-green-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
                {/* Duration Badge */}
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-semibold">
                  3:00
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;