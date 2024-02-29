import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  Query,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLE } from 'src/constants';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @Roles(ROLE.TENANT)
  get(@Query('id') courseId: string) {
    if (!courseId) {
      return this.coursesService.findAll();
    }
    return this.coursesService.findOne(courseId);
  }

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Patch()
  update(@Query('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    if (!id) {
      return new BadRequestException()
    }
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete()
  delete(@Query('id') id: string) {
    if (!id) {
      return new BadRequestException()
    }
    return this.coursesService.remove(id);
  }
}
