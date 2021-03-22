export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
}

export class Location {
  constructor(
    public name: string,
    public region: string,
    public country: string,
    public lat: number,
    public lon: number
  ) {}
}
