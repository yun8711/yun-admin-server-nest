import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('test')
export class TestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  username: string;

  @Column({
    length: 50,
  })
  password: string;

  @Column()
  age: number;

  @Column({
    length: 50,
  })
  email: string;

  @Column({
    length: 50,
    unique: true,
    primary: true,
  })
  phone: string;

  @Column({
    length: 50,
  })
  address: string;
}
