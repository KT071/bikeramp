import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Trip } from '../repositories/entities';
import {
  CreateTripDto,
  CreateTripResultDto,
  CreateTripResultStatus,
} from './dto';

export class CreateUserResultDto {}

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Trip) private readonly tripRepository: Repository<Trip>,
  ) {}

  async createTrip(
    createTripData: CreateTripDto,
  ): Promise<CreateTripResultDto> {
    try {
      // There could be some mapper for this Trip object passed below
      const newTrip = this.tripRepository.create({
        startAddress: createTripData.start_address,
        destinationAddress: createTripData.destination_address,
        distanceInMeeters: this.calculateDistance(
          createTripData.start_address,
          createTripData.destination_address,
        ),
        price: createTripData.price,
        date: createTripData.date.toString(),
      });

      return {
        status: CreateTripResultStatus.success,
        trip: await this.tripRepository.save(newTrip),
      };
    } catch (error) {
      // Error handling, there might be some logging here
      return {
        status: CreateTripResultStatus.error,
        error: new Error('Cannot create Trip, unknown reason'),
      };
    }
  }

  calculateDistance(startAddress: string, destinationAddress: string): number {
    // There should be an API call to get te distance between places eg. google maps distance matrix
    return Math.floor(
      Math.random() * ((startAddress + destinationAddress).length * 100),
    );
  }
}
