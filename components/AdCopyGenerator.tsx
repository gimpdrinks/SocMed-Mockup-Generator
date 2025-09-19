import React from 'react';
import { Tone } from '../types';
import { TONES } from '../constants';

interface AdCopyGeneratorProps {
  productType: string;
  setProductType: (type: string) => void;
  productDetails: string;
  setProductDetails: (details: string) => void;
  selectedTone: Tone;
  setSelectedTone: (tone: Tone) => void;
  onGenerate: () => void;
  isLoading: boolean;
  selectedChannelName: string;
}

const AdCopyGenerator: React.FC<AdCopyGeneratorProps> = ({
  productType,
  setProductType,
  productDetails,
  setProductDetails,
  selectedTone,
  setSelectedTone,
  onGenerate,
  isLoading,
  selectedChannelName
}) => {
  const isGenerationDisabled = !productType || !productDetails;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-100 mb-1">Generate Ad Copy</h2>
        <p className="text-gray-400 mb-6">Create compelling captions for your selected channel (<span className="font-semibold text-purple-400">{selectedChannelName}</span>).</p>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <label htmlFor="product-type" className="block text-lg font-bold text-gray-100 mb-2">1. Product Type</label>
          <input
            id="product-type"
            type="text"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            placeholder="e.g., 'Handcrafted leather wallet'"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="product-details" className="block text-lg font-bold text-gray-100 mb-2">2. Product Details</label>
          <textarea
            id="product-details"
            value={productDetails}
            onChange={(e) => setProductDetails(e.target.value)}
            placeholder="e.g., 'Made from full-grain Italian leather, features RFID blocking, holds 8 cards.'"
            rows={4}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
          />
        </div>
      </div>
      
      {/* Tone Selector */}
      <div>
        <h3 className="text-lg font-bold text-gray-100 mb-3">3. Desired Tone</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {TONES.map((tone) => (
            <button
              key={tone.id}
              onClick={() => setSelectedTone(tone)}
              className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500
                ${selectedTone.id === tone.id 
                  ? 'bg-purple-600 text-white shadow-lg' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              {tone.name}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <div>
        <button
          onClick={onGenerate}
          disabled={isLoading || isGenerationDisabled}
          className="w-full mt-4 py-4 text-lg font-bold text-white rounded-lg transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500 disabled:bg-gray-600 disabled:bg-none"
        >
          {isLoading ? 'Writing...' : '✍️ Generate Captions'}
        </button>
      </div>
    </div>
  );
};

export default AdCopyGenerator;
