import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from 'typeorm';
  
@Entity()
export class BlogEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    author: string;
}