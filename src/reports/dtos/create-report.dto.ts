import {
  IsString,
  IsNumber,
  IsLongitude,
  IsLatitude,
  Max,
  Min,
} from 'class-validator';

export class CreateReportDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1930)
  @Max(2060)
  year: number;

  @IsLongitude()
  lng: number;

  @IsLatitude()
  lat: number;

  @Min(0)
  @Max(1000000)
  @IsNumber()
  mileage: number;

  @Min(0)
  @Max(1000000)
  @IsNumber()
  price: number;
}
