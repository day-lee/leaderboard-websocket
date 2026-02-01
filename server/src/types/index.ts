export interface AthleteData {
  id: string;
  name: string;
  country: string;
  bib: string;
  speedKmh: number;
  distance: number;
}

export interface Athlete {
  id: string;
  name?: string;
  country?: string; 
  bib?: string;
  speedKmh: number;
  distance: number;
  rank: number;
}

export interface RaceStartMessage {
  type: 'RACE_START';
  startTime: number;
}

export interface RaceUpdateMessage {
  type: 'RACE_UPDATE';
  timestamp: number;
  athletes: Athlete[];
}

export interface AckMessage {
  type: 'ACK';
  status: string;
  message: string;
}