import { Location } from './location.model';
import { Astronomy } from './astronomy.model';

export interface AstronomyData {
  location: Location;
  astronomy: Astronomy;
}

export class AstronomyData  {
  constructor(
    public location: Location,
    public astronomy: Astronomy,
  ) {}
}
