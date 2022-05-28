import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';

// only exception to the [resource][action] TypeScript naming convention

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // We get a reference of the record instance with the 'this' keyword
  @AfterInsert()
  logInsert() {
    console.log(`Inserted user with id ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated user with id ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed user with id ${this.id}`);
  }
}
