import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

import { format, startOfMonth, startOfWeek } from 'date-fns';

import { Trip } from 'src/modules/trip/repositories/entities';

import { MonthlyStatsType, WeeklyStatsType } from '../types';

@Injectable()
export class StatsService {
  constructor(
    // Normally data could be taken from StatsRepository to lose modules coupling
    // but there was no time
    // also this could be moved to repository layer to decouple from framework
    @InjectRepository(Trip) private readonly tripRepository: Repository<Trip>,
  ) {}

  async getWeeklyStats(): Promise<WeeklyStatsType> {
    let totalDistanceInMeters = 0;
    let totalPrice = 0;
    // This should be in a repository as getTripsByTimeRange
    const trips = await this.tripRepository.find({
      where: {
        date: Between(startOfWeek(new Date()), new Date()),
      },
    });

    for (const trip of trips) {
      totalDistanceInMeters = totalDistanceInMeters + trip.distanceInMeeters;
      totalPrice = totalPrice + Number(trip.price);
    }

    return {
      // This could be VO
      total_distance: `${Math.floor(totalDistanceInMeters / 1000)}km`,
      // This could be VO
      total_price: `${totalPrice}PLN`,
    };
  }

  async getMonthlyStats(): Promise<MonthlyStatsType> {
    const dailyStatsMap = new Map();
    let totalDistanceInMeters = 0;
    let totalPrice = 0;
    // This should be in a repository as getTripsByTimeRange
    const trips = await this.tripRepository.find({
      where: {
        date: Between(startOfMonth(new Date()), new Date()),
      },
      order: {
        date: 'ASC',
      },
    });

    for (const trip of trips) {
      const currentDailyStatsList: Trip[] = dailyStatsMap.get(trip.date) || [];
      currentDailyStatsList.push(trip);
      dailyStatsMap.set(trip.date, currentDailyStatsList);
    }

    const results = [];

    for (const day of dailyStatsMap.entries()) {
      const date = format(new Date(day[0]), 'LLL, d');
      const trips: Trip[] = day[1];
      let distanceSum = 0;
      let priceSum = 0;

      for (const trip of trips) {
        distanceSum = distanceSum + Number(trip.distanceInMeeters);
        priceSum = priceSum + Number(trip.price);
      }

      const distanceSumInKM = Math.floor(distanceSum / 1000);

      results.push({
        day: date,
        total_distance: `${distanceSumInKM}km`,
        av_ride: `${Math.floor(distanceSumInKM / trips.length)}km`,
        avg_price: `${priceSum / trips.length}PLN`,
      });
    }

    return results;
  }
}
