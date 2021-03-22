export interface Astro {
  sunrise: string,
  sunset: string,
  moonrise: string,
  moonset: string,
  moon_phase: string,
  moon_illumination: number,
}

export class Astro  {
  constructor(
    public sunrise: string,
    public sunset: string,
    public moonrise: string,
    public moonset: string,
    public moon_phase: string,
    public moon_illumination: number,
  ) {}
}
