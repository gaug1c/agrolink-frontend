import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Users, TrendingUp } from 'lucide-react';
import Button from '../common/Button';

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] bg-gradient-to-r from-green-900 to-green-700 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-green-500 rounded-full opacity-10 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-green-400 rounded-full opacity-10 blur-3xl" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-green-600 bg-opacity-50 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
              <span className="text-sm font-semibold">100% Produits Locaux</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Connectons producteurs et consommateurs pour une agriculture{' '}
              <span className="text-green-300">gabonaise plus forte</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-green-100 mb-8 max-w-xl">
              Agrolink Gabon facilite la mise en relation, la vente et la distribution 
              des produits agricoles locaux grâce au digital.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <ShoppingBag className="w-5 h-5 text-green-300" />
                  <span className="text-2xl font-bold">500+</span>
                </div>
                <p className="text-sm text-green-200">Produits</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-5 h-5 text-green-300" />
                  <span className="text-2xl font-bold">200+</span>
                </div>
                <p className="text-sm text-green-200">Producteurs</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-5 h-5 text-green-300" />
                  <span className="text-2xl font-bold">98%</span>
                </div>
                <p className="text-sm text-green-200">Satisfaction</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products">
                <Button 
                  size="lg"
                  className="bg-white text-green-800 hover:bg-green-50"
                  icon={<ShoppingBag className="w-5 h-5" />}
                >
                  Explorer les produits
                </Button>
              </Link>
              <Link to="/a-propos">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-green-800"
                  icon={<ArrowRight className="w-5 h-5" />}
                  iconPosition="right"
                >
                  En savoir plus
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Main Card */}
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20">
                <div className="text-9xl mb-4 text-center">🌾</div>
                <h3 className="text-white text-2xl font-bold text-center mb-2">
                  Agriculture Durable
                </h3>
                <p className="text-green-200 text-center">
                  Des produits frais, locaux et de qualité directement chez vous
                </p>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-8 -right-8 bg-green-600 rounded-2xl p-4 shadow-2xl animate-float">
                <div className="text-4xl mb-2">🍅</div>
                <p className="text-white text-sm font-semibold">Légumes frais</p>
              </div>

              <div className="absolute -bottom-8 -left-8 bg-green-500 rounded-2xl p-4 shadow-2xl animate-float" style={{ animationDelay: '1s' }}>
                <div className="text-4xl mb-2">🥕</div>
                <p className="text-white text-sm font-semibold">Bio & Local</p>
              </div>

              <div className="absolute top-1/2 -right-12 bg-green-400 rounded-2xl p-4 shadow-2xl animate-float" style={{ animationDelay: '2s' }}>
                <div className="text-4xl mb-2">🌽</div>
                <p className="text-white text-sm font-semibold">100% Naturel</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;