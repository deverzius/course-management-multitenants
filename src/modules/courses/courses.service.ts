import { BadRequestException, Inject, Injectable, Scope } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { DataSource, EntitySchema, Repository } from 'typeorm';
import { DATA_SOURCE_TENANT, ROLE } from 'src/constants';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable({ scope: Scope.REQUEST })
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @Inject(DATA_SOURCE_TENANT)
    private readonly dataSource: DataSource,
  ) {}

  create(createCourseDto: CreateCourseDto) {
    const result = this.dataSource.getRepository(Course).save(createCourseDto);
    return result;
  }

  findAll() {
    return this.dataSource.getRepository(Course).find();
  }

  findOne(courseId: string) {
    return this.dataSource
      .getRepository(Course)
      .findOne({ where: { courseId: courseId } });
  }

  async update(courseId: string, updateCourseDto: UpdateCourseDto) {
    console.log(updateCourseDto);
    const result = await this.dataSource
      .getRepository(Course)
      .update({ courseId: courseId }, updateCourseDto);
    
    if (result.affected === 0) { 
      throw new BadRequestException('Course ID is missing or invalid');
    }
    return this.findOne(courseId);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} course`;
  // }
}
