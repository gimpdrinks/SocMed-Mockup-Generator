import React, { useState, useCallback } from 'react';
import { Scene, Channel, Tone } from './types';
import { SCENES, CHANNELS, TONES } from './constants';
import { generateAdMockup, generateAdCopy } from './services/geminiService';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ControlPanel from './components/ControlPanel';
import GeneratedImage from './components/GeneratedImage';
import AdCopyGenerator from './components/AdCopyGenerator';
import AdCopyDisplay from './components/AdCopyDisplay';

const App: React.FC = () => {
  // State for Image Generation
  const [productImage, setProductImage] = useState<string | null>(null);
  const [productImageMimeType, setProductImageMimeType] = useState<string | null>(null);
  const [customBackground, setCustomBackground] = useState<string | null>(null);
  const [customBackgroundMimeType, setCustomBackgroundMimeType] = useState<string | null>(null);
  const [backgroundMode, setBackgroundMode] = useState<'scene' | 'custom'>('scene');
  const [placementInstructions, setPlacementInstructions] = useState<string>('');
  const [selectedScene, setSelectedScene] = useState<Scene>(SCENES[0]);
  const [selectedChannel, setSelectedChannel] = useState<Channel>(CHANNELS[0]);
  const [adText, setAdText] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
  const [imageError, setImageError] = useState<string | null>(null);

  // State for Ad Copy Generation
  const [productType, setProductType] = useState<string>('');
  const [productDetails, setProductDetails] = useState<string>('');
  const [selectedTone, setSelectedTone] = useState<Tone>(TONES[0]);
  const [generatedCaptions, setGeneratedCaptions] = useState<string[]>([]);
  const [isCopyLoading, setIsCopyLoading] = useState<boolean>(false);
  const [copyError, setCopyError] = useState<string | null>(null);


  const handleImageUpload = (base64Image: string, mimeType: string) => {
    setProductImage(base64Image);
    setProductImageMimeType(mimeType);
    setGeneratedImage(null);
    setImageError(null);
  };
  
  const handleBackgroundUpload = (base64Image: string, mimeType: string) => {
    setCustomBackground(base64Image);
    setCustomBackgroundMimeType(mimeType);
    setGeneratedImage(null);
    setImageError(null);
  };

  const handleGenerateImage = useCallback(async () => {
    if (!productImage || !productImageMimeType) {
      setImageError('Please upload a product image first.');
      return;
    }
    if (backgroundMode === 'custom' && (!customBackground || !customBackgroundMimeType)) {
      setImageError('Please upload a custom background image.');
      return;
    }

    setIsImageLoading(true);
    setImageError(null);
    setGeneratedImage(null);

    const background = backgroundMode === 'scene'
      ? { type: 'scene' as const, value: selectedScene.name }
      : { type: 'custom' as const, image: customBackground!, mimeType: customBackgroundMimeType! };

    try {
      const generated = await generateAdMockup(
        productImage,
        productImageMimeType,
        background,
        selectedChannel.name,
        adText,
        placementInstructions
      );
      setGeneratedImage(generated);
    } catch (e) {
      console.error(e);
      setImageError('Failed to generate ad mockup. Please try again.');
    } finally {
      setIsImageLoading(false);
    }
  }, [
    productImage, 
    productImageMimeType, 
    backgroundMode,
    customBackground,
    customBackgroundMimeType,
    selectedScene, 
    selectedChannel, 
    adText,
    placementInstructions
  ]);

  const handleGenerateCopy = useCallback(async () => {
     if (!productType || !productDetails) {
      setCopyError('Please provide both a product type and details.');
      return;
    }
    setIsCopyLoading(true);
    setCopyError(null);
    setGeneratedCaptions([]);

    try {
      const captions = await generateAdCopy(
        selectedChannel.name,
        productType,
        productDetails,
        selectedTone.name
      );
      setGeneratedCaptions(captions);
    } catch(e) {
      console.error(e);
      setCopyError('Failed to generate ad copy. Please try again.');
    } finally {
      setIsCopyLoading(false);
    }
  }, [selectedChannel, productType, productDetails, selectedTone]);


  const isGenerationDisabled = !productImage || (backgroundMode === 'custom' && !customBackground);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: Controls */}
          <div className="flex flex-col space-y-8">
            <ImageUploader title="1. Upload Product Image" onImageUpload={handleImageUpload} uploadedImage={productImage} />
            <ControlPanel
              selectedScene={selectedScene}
              setSelectedScene={setSelectedScene}
              selectedChannel={selectedChannel}
              setSelectedChannel={setSelectedChannel}
              adText={adText}
              setAdText={setAdText}
              onGenerate={handleGenerateImage}
              isLoading={isImageLoading}
              isGenerationDisabled={isGenerationDisabled}
              backgroundMode={backgroundMode}
              setBackgroundMode={setBackgroundMode}
              onBackgroundUpload={handleBackgroundUpload}
              customBackground={customBackground}
              placementInstructions={placementInstructions}
              setPlacementInstructions={setPlacementInstructions}
            />
            <div className="border-t border-gray-700 !mt-12 pt-8">
               <AdCopyGenerator 
                productType={productType}
                setProductType={setProductType}
                productDetails={productDetails}
                setProductDetails={setProductDetails}
                selectedTone={selectedTone}
                setSelectedTone={setSelectedTone}
                onGenerate={handleGenerateCopy}
                isLoading={isCopyLoading}
                selectedChannelName={selectedChannel.name}
              />
            </div>
          </div>

          {/* Right Column: Output */}
          <div className="flex flex-col space-y-8">
             <div>
                <h2 className="text-2xl font-bold text-gray-100 mb-4">Generated Mockup</h2>
                <GeneratedImage 
                  generatedImage={generatedImage} 
                  isLoading={isImageLoading}
                  error={imageError}
                />
             </div>
             <div>
                <h2 className="text-2xl font-bold text-gray-100 mb-4">Generated Ad Copy</h2>
                <AdCopyDisplay
                  captions={generatedCaptions}
                  isLoading={isCopyLoading}
                  error={copyError}
                />
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;