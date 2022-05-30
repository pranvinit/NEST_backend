import { User } from '../../users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  lng: number;

  @Column()
  lat: number;

  @Column()
  mileage: number;

  @Column()
  price: number;

  // causes a change to the database
  // adds a new User column in the reports table
  @ManyToOne(() => User, (user) => user.report)
  user: User;

  // sets approved to false by default
  @Column({ default: false })
  approved: boolean;
}
