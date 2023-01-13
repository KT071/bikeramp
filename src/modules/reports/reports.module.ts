import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Trip } from '../trip/repositories/entities';

import { StatsController } from './controllers/stats.controller';
import { StatsService } from './services/';

@Module({
  imports: [TypeOrmModule.forFeature([Trip])],
  controllers: [StatsController],
  providers: [StatsService],
})
export class ReportsModule {}
