import { Inject, Injectable, Scope } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { DataSource, EntitySchema, Repository } from 'typeorm';
import { DATA_SOURCE_TENANT } from 'src/constants';

@Injectable({scope: Scope.REQUEST})
export class CoursesService {
  constructor(
    // @InjectRepository(Course)
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @Inject(DATA_SOURCE_TENANT)
    private readonly dataSource: DataSource,
  ) {}

  create(tenantId: string, createCourseDto: CreateCourseDto) {
    const schemaName = `tenant_${tenantId}`;
    const tableName = `${schemaName}.courses`
    console.log(tenantId)

    // const result = this.courseRepository.query(`INSERT INTO "${tenantId}".courses`)

    const result = this.courseRepository
      .createQueryBuilder(tableName)
      .insert()
      .values(createCourseDto)
      .execute();
    
    return result;
  }

  async findAll() {
    return await this.dataSource.getRepository(Course).find()
  }

  async findOne(tenantId: string, courseId: string) {
    return await this.courseRepository.query(`SELECT * FROM ${tenantId}.courses WHERE id = ${courseId}`)
      .then(res => res)
      .catch(err => []);
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
