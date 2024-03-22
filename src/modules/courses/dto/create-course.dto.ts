import { PartialType } from '@nestjs/mapped-types';

export class CreateCourseDto {
	courseId: string;
	name: string;
	description: string;
	videoLinks: string[];
}
