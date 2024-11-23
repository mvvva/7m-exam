import './Aside.css'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaFilter, FaTimes } from 'react-icons/fa';
import { setLoading as setLoadingBrands, saveBrands, setError as setErrorBrands } from '../../features/product/brandSlice';
import { setLoading as setLoadingColors, saveColors, setError as setErrorColors } from '../../features/product/colorSlice';

function Aside({ selectedBrand, setSelectedBrand, selectedColor, setSelectedColor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { colors, brands } = useSelector((store) => store);
  const { 
    loading: colorsLoading, 
    error: colorsError, 
    colors: colorsList 
  } = colors;
  const { 
    loading: brandsLoading, 
    error: brandsError, 
    brands: brandsList 
  } = brands;

  const dispatch = useDispatch();

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    async function fetchFilters() {
      dispatch(setLoadingColors(true));
      dispatch(setLoadingBrands(true));
      
      try {
        const [colorsRes, brandsRes] = await Promise.all([
          fetch("https://headphones-server.onrender.com/colors"),
          fetch("https://headphones-server.onrender.com/brands")
        ]);

        if (!colorsRes.ok || !brandsRes.ok) {
          throw new Error("Failed to fetch filters");
        }

        const colors = await colorsRes.json();
        const brands = await brandsRes.json();

        dispatch(saveColors(colors));
        dispatch(saveBrands(brands));
      } catch (error) {
        dispatch(setErrorColors(error.message));
        dispatch(setErrorBrands(error.message));
      } finally {
        dispatch(setLoadingColors(false));
        dispatch(setLoadingBrands(false));
      }
    }

    fetchFilters();
  }, [dispatch]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('aside-overlay')) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button - Only rendered on mobile */}
      {isMobile && (
        <button
          className="mobile-toggle"
          onClick={() => setIsOpen(true)}
          aria-label="Open filters"
        >
          <FaFilter className="w-5 h-5" />
        </button>
      )}

      {/* Overlay - Only rendered on mobile */}
      {isMobile && (
        <div 
          className={`aside-overlay ${isOpen ? 'open' : ''}`}
          onClick={handleOverlayClick}
        >
          {/* Close button for mobile */}
          <button
            className="mobile-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close filters"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
      )}
      
      {/* Aside Content */}
      <aside className={`aside-container  ${isOpen ? 'open' : ''}`}>
        <div className="aside-inner">
          <div className="filter-header">
            <h2 className="filter-title">Filters</h2>
            {isMobile && (
              <button
                onClick={() => setIsOpen(false)}
                className="close-button"
                aria-label="Close filters"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Brands Section */}
          <div className="filter-section">
            <h3 className="section-title">
              Brands
              {brandsLoading && (
                <span className="loading-spinner" />
              )}
            </h3>
            {brandsError ? (
              <p className="error-message">{brandsError}</p>
            ) : (
              <ul className="brands-wrapper">
                {brandsList.map((brand, index) => (
                  <li key={index}>
                    <label className="brand-item">
                      <input
                        type="radio"
                        name="brands"
                        checked={selectedBrand === brand}
                        onChange={() => setSelectedBrand(brand)}
                      />
                      <span className="brand-label">{brand}</span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Colors Section */}
          <div className="filter-section">
            <h3 className="section-title">
              Colors
              {colorsLoading && (
                <span className="loading-spinner" />
              )}
            </h3>
            {colorsError ? (
              <p className="error-message">{colorsError}</p>
            ) : (
              <div className="colors-wrapper">
                {colorsList.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`color-button ${selectedColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select ${color} color`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Reset Buttons */}
          <div className="reset-buttons">
            <button 
              onClick={() => setSelectedBrand("")}
              className="reset-btn reset-btn-brand"
              disabled={!selectedBrand}
            >
              Reset Brand
            </button>
            <button 
              onClick={() => setSelectedColor("")}
              className="reset-btn reset-btn-color"
              disabled={!selectedColor}
            >
              Reset Color
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Aside;