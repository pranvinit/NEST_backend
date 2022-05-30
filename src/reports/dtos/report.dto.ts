import { Expose, Transform } from 'class-transformer';
import { User } from '../../users/entities/user.entity';

export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  mileage: number;

  @Expose()
  price: number;

  @Expose()
  // obj is a reference to User
  // return value is assigned to userId
  @Transform(({ obj }) => obj.id)
  userId: number;
}
