import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TripController } from './controllers/trip.controller';
import { TripService } from './services/trip.service';
import { Trip } from './repositories/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Trip])],
  controllers: [TripController],
  providers: [TripService],
})
export class TripModule {}
