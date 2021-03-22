import { Astro } from './astro.model';

export interface Astronomy {
  astro: Astro;
}

export class Astronomy  {
  constructor(
    public astro: Astro,
  ) {}
}
