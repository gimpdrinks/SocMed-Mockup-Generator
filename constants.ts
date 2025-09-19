import { Scene, Channel, Tone } from './types';
import InstagramIcon from './components/icons/InstagramIcon';
import TikTokIcon from './components/icons/TikTokIcon';
import LinkedInIcon from './components/icons/LinkedInIcon';
import FacebookIcon from './components/icons/FacebookIcon';
import XIcon from './components/icons/XIcon';

export const SCENES: Scene[] = [
  { id: 'lifestyle', name: 'Lifestyle' },
  { id: 'flatlay', name: 'Flat Lay' },
  { id: 'outdoor', name: 'Outdoor' },
  { id: 'seasonal', name: 'Seasonal' },
  { id: 'minimal', name: 'Minimal' },
  { id: 'studio', name: 'Studio Lit' },
];

export const CHANNELS: Channel[] = [
  { id: 'instagram', name: 'Instagram', icon: InstagramIcon },
  { id: 'tiktok', name: 'TikTok', icon: TikTokIcon },
  { id: 'linkedin', name: 'LinkedIn', icon: LinkedInIcon },
  { id: 'facebook', name: 'Facebook', icon: FacebookIcon },
  { id: 'x', name: 'X', icon: XIcon },
];

export const TONES: Tone[] = [
    { id: 'playful', name: 'Playful' },
    { id: 'luxury', name: 'Luxury' },
    { id: 'urgent', name: 'Urgent' },
    { id: 'professional', name: 'Professional' },
    { id: 'witty', name: 'Witty' },
    { id: 'minimalist', name: 'Minimalist' },
];
