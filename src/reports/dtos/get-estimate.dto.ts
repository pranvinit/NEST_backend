import {
  IsString,
  IsNumber,
  IsLongitude,
  IsLatitude,
  Max,
  Min,
} from 'class-validator';

import { Transform } from 'class-transformer';

export class GetEstimateDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1930)
  @Max(2060)
  year: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  lng: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  lat: number;

  @Transform(({ value }) => Number(value))
  @Min(0)
  @Max(1000000)
  @IsNumber()
  mileage: number;
}
