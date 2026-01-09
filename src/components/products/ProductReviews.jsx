import React, { useState } from 'react';
import { Star, ThumbsUp, Flag, CheckCircle } from 'lucide-react';
import Button from '../common/Button';
import Modal from '../common/Modal';

const ProductReviews = ({ 
  productId,
  reviews = [],
  averageRating = 0,
  totalReviews = 0,
  onSubmitReview,
  className = '' 
}) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: '',
    name: '',
  });

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: reviews.length > 0 
      ? (reviews.filter(r => r.rating === rating).length / reviews.length) * 100 
      : 0,
  }));

  // Filter reviews
  const filteredReviews = filter === 'all' 
    ? reviews 
    : reviews.filter(r => r.rating === parseInt(filter));

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (onSubmitReview) {
      onSubmitReview(newReview);
    }
    setShowReviewModal(false);
    setNewReview({ rating: 5, title: '', comment: '', name: '' });
  };

  return (
    <div className={className}>
      {/* Overview */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Average Rating */}
          <div className="text-center">
            <div className="text-6xl font-bold text-gray-800 mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < Math.floor(averageRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600">
              Basé sur <span className="font-semibold">{totalReviews}</span> avis
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-3">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1 min-w-[80px]">
                  <span className="text-sm font-semibold">{rating}</span>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 min-w-[40px] text-right">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Write Review Button */}
        <div className="mt-8 text-center">
          <Button
            size="lg"
            onClick={() => setShowReviewModal(true)}
          >
            Écrire un avis
          </Button>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3 mb-6 overflow-x-auto">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
            filter === 'all'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Tous les avis
        </button>
        {[5, 4, 3, 2, 1].map(rating => (
          <button
            key={rating}
            onClick={() => setFilter(rating.toString())}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition flex items-center gap-1 ${
              filter === rating.toString()
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {rating} <Star className="w-4 h-4" />
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-600">Aucun avis pour le moment</p>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl shadow p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-lg">
                    {review.userName?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{review.userName}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{review.date}</span>
                      {review.verified && (
                        <span className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          Achat vérifié
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button className="text-gray-400 hover:text-gray-600 transition">
                  <Flag className="w-5 h-5" />
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Title */}
              {review.title && (
                <h5 className="font-bold text-gray-800 mb-2">{review.title}</h5>
              )}

              {/* Comment */}
              <p className="text-gray-700 mb-4">{review.comment}</p>

              {/* Images */}
              {review.images && review.images.length > 0 && (
                <div className="flex gap-2 mb-4">
                  {review.images.map((image, index) => (
                    <div key={index} className="w-20 h-20 bg-gray-200 rounded-lg">
                      {/* Image placeholder */}
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-4 text-sm">
                <button className="flex items-center gap-1 text-gray-600 hover:text-green-600 transition">
                  <ThumbsUp className="w-4 h-4" />
                  <span>Utile ({review.helpful || 0})</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Write Review Modal */}
      <Modal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        title="Écrire un avis"
        size="lg"
      >
        <div className="space-y-4">
          {/* Rating */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Votre note
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setNewReview({ ...newReview, rating })}
                  className="p-2 hover:scale-110 transition"
                >
                  <Star
                    className={`w-8 h-8 ${
                      rating <= newReview.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Votre nom
            </label>
            <input
              type="text"
              value={newReview.name}
              onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Votre nom"
              required
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Titre de l'avis
            </label>
            <input
              type="text"
              value={newReview.title}
              onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Résumez votre avis"
              required
            />
          </div>

          {/* Comment */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Votre avis
            </label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              placeholder="Partagez votre expérience..."
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            fullWidth
            size="lg"
            onClick={handleSubmitReview}
          >
            Publier l'avis
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductReviews;