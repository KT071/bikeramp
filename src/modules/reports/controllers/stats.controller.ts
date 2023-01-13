import { Controller, Get } from '@nestjs/common';
import { StatsService } from '../services';
import { MonthlyStatsType, WeeklyStatsType } from '../types';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}
  @Get('/weekly')
  getWeeklyStats(): Promise<WeeklyStatsType> {
    return this.statsService.getWeeklyStats();
  }

  @Get('/monthly')
  getMonthlyStats(): Promise<MonthlyStatsType> {
    return this.statsService.getMonthlyStats();
  }
}
