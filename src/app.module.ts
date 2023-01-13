import { Module } from '@nestjs/common';
import { TripModule } from './modules/trip/trip.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsModule } from './modules/reports/reports.module';

import CONFIG from './config';
import { Trip } from './modules/trip/repositories/entities';

@Module({
  imports: [
    TripModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: CONFIG.POSTGRES_HOST,
      port: CONFIG.POSTGRES_PORT,
      username: CONFIG.POSTGRES_USERNAME,
      password: CONFIG.POSTGRES_PASSWORD,
      database: CONFIG.POSTGRES_DB,
      entities: [Trip],
      synchronize: true,
    }),
    ReportsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
