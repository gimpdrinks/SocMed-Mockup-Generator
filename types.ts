import React from 'react';

export interface Scene {
  id: string;
  name: string;
}

export interface Channel {
  id:string;
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface Tone {
  id: string;
  name: string;
}
