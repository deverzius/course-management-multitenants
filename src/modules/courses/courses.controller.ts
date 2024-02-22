import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { TENANT_HEADER } from 'src/constants';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

  @Get(':tenant-id/:id')
  get(@Param('tenant-id') tenantId: string, @Param('id') courseId: string) {
    return this.coursesService.findOne(tenantId, courseId);
  }

  @Post('new')
  create(@Body() createCourseDto: CreateCourseDto, @Headers(TENANT_HEADER) tenantId: string) {
    console.log(tenantId)
    return this.coursesService.create(tenantId, createCourseDto);
  }

  @Get()
  getAll() {
    return this.coursesService.findAll();
  }
}
