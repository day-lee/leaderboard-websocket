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
  message: string;
}

export interface RaceStatusMessage {
  type: 'RACE_STATUS';
  isActive: boolean;
}

export type ServerMessage = 
  | RaceStartMessage 
  | RaceUpdateMessage 
  | AckMessage 
  | RaceStatusMessage;

export type ConnectionStatus = 'Connected' | 'Disconnected' | 'Error';