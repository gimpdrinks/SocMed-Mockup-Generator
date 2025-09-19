
import React from 'react';
import DownloadIcon from './icons/DownloadIcon';

interface GeneratedImageProps {
  generatedImage: string | null;
  isLoading: boolean;
  error: string | null;
}

const GeneratedImage: React.FC<GeneratedImageProps> = ({ generatedImage, isLoading, error }) => {
  const handleDownload = () => {
    if (!generatedImage) return;

    const link = document.createElement('a');
    link.href = generatedImage;
    
    // Extract file extension from mime type
    const mimeTypeMatch = generatedImage.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    let extension = 'png'; // default
    if (mimeTypeMatch && mimeTypeMatch.length > 1) {
      const mimeType = mimeTypeMatch[1];
      if (mimeType === 'image/jpeg') {
        extension = 'jpg';
      } else {
        extension = mimeType.split('/')[1] || 'png';
      }
    }

    link.download = `social-ad-mockup.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative w-full aspect-[4/5] bg-gray-800/50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-700 overflow-hidden">
      {isLoading && (
        <div className="flex flex-col items-center text-center text-gray-400">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mb-4"></div>
          <p className="font-semibold">Generating your ad...</p>
          <p className="text-sm">This can take a moment.</p>
        </div>
      )}
      {error && !isLoading && (
         <div className="p-4 text-center text-red-400">
           <p className="font-semibold">An Error Occurred</p>
           <p className="text-sm">{error}</p>
         </div>
      )}
      {!isLoading && !error && generatedImage && (
        <>
          <img src={generatedImage} alt="Generated ad mockup" className="object-contain w-full h-full" />
          <button
            onClick={handleDownload}
            className="absolute top-4 right-4 bg-gray-900/70 text-white font-semibold py-2 px-4 rounded-lg backdrop-blur-sm border border-gray-600 hover:bg-purple-600/80 transition-all duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500"
            aria-label="Download mockup image"
          >
            <DownloadIcon className="w-5 h-5" />
            <span>Download</span>
          </button>
        </>
      )}
      {!isLoading && !error && !generatedImage && (
        <div className="text-center text-gray-500 p-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          <p className="font-semibold">Your generated ad will appear here.</p>
          <p className="text-sm">Complete the steps to get started.</p>
        </div>
      )}
    </div>
  );
};

export default GeneratedImage;
