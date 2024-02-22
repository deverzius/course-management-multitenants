import { UUID } from 'crypto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ unique: true })
  courseId: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column("text", { array: true, default: [] })
  videoLinks: string[];
}
