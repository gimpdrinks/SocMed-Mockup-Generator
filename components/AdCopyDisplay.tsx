
import React, { useState } from 'react';
import ClipboardIcon from './icons/ClipboardIcon';
import DownloadIcon from './icons/DownloadIcon';

interface AdCopyDisplayProps {
  captions: string[];
  isLoading: boolean;
  error: string | null;
}

const CaptionCard: React.FC<{ text: string }> = ({ text }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 flex justify-between items-start gap-4">
            <p className="text-gray-300 whitespace-pre-wrap">{text}</p>
            <button 
                onClick={handleCopy}
                className="p-2 rounded-md hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 flex-shrink-0"
                aria-label="Copy caption"
            >
               {copied ? (
                <span className="text-sm text-purple-400">Copied!</span>
               ) : (
                <ClipboardIcon className="w-5 h-5 text-gray-400"/>
               )}
            </button>
        </div>
    );
};

const AdCopyDisplay: React.FC<AdCopyDisplayProps> = ({ captions, isLoading, error }) => {
  const handleDownloadAll = () => {
    if (captions.length === 0) return;

    const content = captions.join('\n\n---\n\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'ad-captions.txt';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  };
    
  return (
    <div className="w-full min-h-[20rem] bg-gray-800/50 rounded-lg flex flex-col p-4 border-2 border-dashed border-gray-700 overflow-hidden">
      {isLoading && (
        <div className="flex flex-col items-center justify-center text-center text-gray-400 h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mb-4"></div>
          <p className="font-semibold">Writing your captions...</p>
          <p className="text-sm">The AI is getting creative.</p>
        </div>
      )}
      {error && !isLoading && (
         <div className="p-4 text-center text-red-400 m-auto">
           <p className="font-semibold">An Error Occurred</p>
           <p className="text-sm">{error}</p>
         </div>
      )}
      {!isLoading && !error && captions.length > 0 && (
         <div className="flex flex-col h-full">
            <div className="flex-shrink-0 flex justify-between items-center pb-4 border-b border-gray-700 mb-4">
                <h3 className="font-bold text-lg text-gray-200">Generated Captions</h3>
                <button
                    onClick={handleDownloadAll}
                    className="bg-gray-700 text-white font-semibold py-2 px-3 rounded-lg hover:bg-purple-600 transition-colors duration-200 flex items-center gap-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500"
                    aria-label="Download all captions"
                >
                    <DownloadIcon className="w-4 h-4" />
                    <span>Download All</span>
                </button>
            </div>
            <div className="space-y-4 overflow-y-auto flex-grow">
                {captions.map((caption, index) => (
                    <CaptionCard key={index} text={caption} />
                ))}
            </div>
        </div>
      )}
      {!isLoading && !error && captions.length === 0 && (
        <div className="text-center text-gray-500 m-auto p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.25.75l.041.02a.75.75 0 01.318.67l-.006.062V6a.75.75 0 01-1.5 0V1.44l-7.22 7.22a.75.75 0 01-1.06 0l-1.06-1.062a.75.75 0 010-1.061l7.22-7.22H3.75a.75.75 0 010-1.5h7.5zM12.75 12a.75.75 0 01.75.75v7.5a.75.75 0 01-1.5 0v-7.5a.75.75 0 01.75-.75zM12 12.75a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h7.5a.75.75 0 00.75-.75z" /></svg>
          <p className="font-semibold">Your generated captions will appear here.</p>
          <p className="text-sm">Fill in the product details to start.</p>
        </div>
      )}
    </div>
  );
};

export default AdCopyDisplay;
