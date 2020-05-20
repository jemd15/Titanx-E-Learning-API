import { Module } from '@nestjs/common';
import { CoursesController } from './controllers/courses.controller';
import { CoursesService } from './services/courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesRepository } from './repositories/courses.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CoursesRepository])],
  controllers: [CoursesController],
  providers: [CoursesService]
})
export class CoursesModule {}
