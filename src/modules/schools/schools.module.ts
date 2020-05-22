import { Module } from '@nestjs/common';
import { SchoolsController } from './controllers/schools.controller';
import { SchoolsService } from './services/schools.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolsRepository } from './repositories/schools.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolsRepository])],
  controllers: [SchoolsController],
  providers: [SchoolsService]
})
export class SchoolsModule {}
