import React, { useRef, useState, useCallback } from 'react';
import { Scene, Channel } from '../types';
import { SCENES, CHANNELS } from '../constants';

interface CustomBackgroundUploaderProps {
  onUpload: (base64Image: string, mimeType: string) => void;
  uploadedImage: string | null;
}

const CustomBackgroundUploader: React.FC<CustomBackgroundUploaderProps> = ({ onUpload, uploadedImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = useCallback((files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result as string, file.type);
      };
      reader.readAsDataURL(file);
    }
  }, [onUpload]);

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files);
    }
  }, [handleFileChange]);

  const triggerFileSelect = () => fileInputRef.current?.click();

  return (
    <div 
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={triggerFileSelect}
      className={`relative flex flex-col items-center justify-center w-full h-48 mt-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200
        ${dragActive ? 'border-purple-400 bg-gray-800/80' : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'}`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e.target.files)}
        className="hidden"
      />
      {uploadedImage ? (
        <img src={uploadedImage} alt="Uploaded background" className="object-cover h-full w-full p-2 rounded-lg" />
      ) : (
        <div className="flex flex-col items-center justify-center text-center">
          <svg className="w-8 h-8 mb-3 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
          </svg>
          <p className="text-sm text-gray-400"><span className="font-semibold text-purple-400">Click to upload</span> or drag & drop</p>
        </div>
      )}
    </div>
  );
};

interface ControlPanelProps {
  selectedScene: Scene;
  setSelectedScene: (scene: Scene) => void;
  selectedChannel: Channel;
  setSelectedChannel: (channel: Channel) => void;
  adText: string;
  setAdText: (text: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  isGenerationDisabled: boolean;
  backgroundMode: 'scene' | 'custom';
  setBackgroundMode: (mode: 'scene' | 'custom') => void;
  onBackgroundUpload: (base64Image: string, mimeType: string) => void;
  customBackground: string | null;
  placementInstructions: string;
  setPlacementInstructions: (instructions: string) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  selectedScene,
  setSelectedScene,
  selectedChannel,
  setSelectedChannel,
  adText,
  setAdText,
  onGenerate,
  isLoading,
  isGenerationDisabled,
  backgroundMode,
  setBackgroundMode,
  onBackgroundUpload,
  customBackground,
  placementInstructions,
  setPlacementInstructions
}) => {
  return (
    <div className="space-y-8">
      {/* Background Selector */}
      <div>
        <h2 className="text-2xl font-bold text-gray-100 mb-4">2. Choose a Background</h2>
        <div className="flex space-x-2 rounded-lg bg-gray-800 p-1 mb-4">
          <button 
            onClick={() => setBackgroundMode('scene')}
            className={`w-full py-2.5 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${backgroundMode === 'scene' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
          >
            Preset Scenes
          </button>
          <button
            onClick={() => setBackgroundMode('custom')}
            className={`w-full py-2.5 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${backgroundMode === 'custom' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
          >
            Custom Background
          </button>
        </div>
        
        {backgroundMode === 'scene' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {SCENES.map((scene) => (
              <button
                key={scene.id}
                onClick={() => setSelectedScene(scene)}
                className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500
                  ${selectedScene.id === scene.id 
                    ? 'bg-purple-600 text-white shadow-lg' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              >
                {scene.name}
              </button>
            ))}
          </div>
        ) : (
          <CustomBackgroundUploader onUpload={onBackgroundUpload} uploadedImage={customBackground} />
        )}
      </div>

      {/* Placement Instructions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-100 mb-4">3. Add Placement Instructions <span className="text-gray-400 text-base font-normal">(Optional)</span></h2>
        <textarea
          value={placementInstructions}
          onChange={(e) => setPlacementInstructions(e.target.value)}
          placeholder="e.g., 'Place on the right, add a soft shadow'"
          rows={3}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
        />
      </div>

      {/* Channel Selector */}
      <div>
        <h2 className="text-2xl font-bold text-gray-100 mb-4">4. Select Social Channel</h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {CHANNELS.map((channel) => (
            <button
              key={channel.id}
              onClick={() => setSelectedChannel(channel)}
              className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500
                ${selectedChannel.id === channel.id 
                  ? 'bg-purple-600 text-white shadow-lg' 
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
            >
              <channel.icon className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">{channel.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Text Input */}
      <div>
        <h2 className="text-2xl font-bold text-gray-100 mb-4">5. Add Ad Text <span className="text-gray-400 text-base font-normal">(Optional)</span></h2>
        <input
          type="text"
          value={adText}
          onChange={(e) => setAdText(e.target.value)}
          placeholder="e.g., '50% Off Limited Time'"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
        />
      </div>

      {/* Generate Button */}
      <div>
        <button
          onClick={onGenerate}
          disabled={isLoading || isGenerationDisabled}
          className="w-full mt-4 py-4 text-lg font-bold text-white rounded-lg transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500 disabled:bg-gray-600 disabled:bg-none"
        >
          {isLoading ? 'Generating...' : '✨ Generate Mockup'}
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
