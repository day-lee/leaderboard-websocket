export interface Athlete {
  id: string;
  name?: string;
  country?: string; 
  bib?: string;
  speedKmh: number;
  distance: number;
  rank: number;
}

export interface RaceUpdateMessage {
  type: 'RACE_UPDATE';
  timestamp: number;
  athletes: Athlete[];
}

export type ConnectionStatus = 'Connected' | 'Disconnected' | 'Error';