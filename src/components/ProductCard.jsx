import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular, faStarHalfAlt } from '@fortawesome/free-regular-svg-icons';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(product.images.yellow);
  const [selectedColor, setSelectedColor] = useState('Yellow Gold');
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const imageContainerRef = useRef(null);

  const handleColorHover = (color, colorName) => {
    setCurrentImage(product.images[color]);
    setSelectedColor(colorName);
  };

  const handleImageMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleImageMouseLeave = () => {
    setIsZoomed(false);
  };

  const handleImageMouseMove = (e) => {
    if (!imageContainerRef.current) return;

    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  const formatPrice = (price) => {
    return `$${Math.round(price * 100) / 100} USD`;
  };

  const renderStars = (score) => {
    const starRating = (score / 100 * 5).toFixed(1);
    const starPercentage = score / 100 * 5;
    const stars = [];
    
    for (let i = 0; i < 5; i++) {
      if (starPercentage >= i + 1) {
        stars.push(
          <FontAwesomeIcon 
            key={i}
            icon={faStarSolid}
            className="star full"
            title={`${starRating}/5`}
          />
        );
      } else if (starPercentage > i && starPercentage < i + 1) {
        const halfStarPercentage = (starPercentage - i) * 100;
        stars.push(
          <div key={i} className="star-container" title={`${starRating}/5`}>
            <FontAwesomeIcon 
              icon={faStarHalfAlt}
              className="star half"
              style={{ 
                clipPath: `inset(0 ${100 - halfStarPercentage}% 0 0)`,
                color: '#ffd700'
              }}
            />
            <FontAwesomeIcon 
              icon={faStarRegular}
              className="star empty"
              style={{ position: 'absolute', left: 0 }}
            />
          </div>
        );
      } else {
        stars.push(
          <FontAwesomeIcon 
            key={i}
            icon={faStarRegular}
            className="star empty"
            title={`${starRating}/5`}
          />
        );
      }
    }

    return (
      <div className="stars-container">
        <div className="stars-wrapper">
          {stars}
        </div>
        <span className="rating-score">{starRating}/5</span>
      </div>
    );
  };

  return (
    <div className="product-card">
      <div className="product-image-container"
           ref={imageContainerRef}
           onMouseEnter={handleImageMouseEnter}
           onMouseLeave={handleImageMouseLeave}
           onMouseMove={handleImageMouseMove} >
        <img 
          src={currentImage} 
          alt={product.name} 
          className="product-image"
        />
        {isZoomed && (
          <div 
            className="zoom-view"
            style={{
              backgroundImage: `url(${currentImage})`,
              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`
            }}
          />
        )}
      </div>
      <h3 className="product-name">{product.name}</h3>
      <div className="product-details">
        <p className="price">{formatPrice(product.price)}</p>
      </div>
      <div className="color-options">
        <div 
          className="color-option yellow"
          onMouseEnter={() => handleColorHover('yellow', 'Yellow Gold')}
          title="Yellow Gold"
        />
        <div 
          className="color-option white"
          onMouseEnter={() => handleColorHover('white', 'White Gold')}
          title="White Gold"
        />
        <div 
          className="color-option rose"
          onMouseEnter={() => handleColorHover('rose', 'Rose Gold')}
          title="Rose Gold"
        />
      </div>
      <p className="selected-color">{selectedColor}</p>
      {renderStars(product.popularityScore)}
    </div>
  );
};

export default ProductCard;