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