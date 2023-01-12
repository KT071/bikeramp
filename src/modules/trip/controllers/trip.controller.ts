import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { CreateTripRequest } from './requests';
import { TripService } from '../services';
import { CreateTripDto, CreateTripResultStatus } from '../services/dto';
import { Trip } from '../repositories/entities';

@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}
  @Post()
  async createTrip(
    @Body() createTripRequest: CreateTripRequest,
  ): Promise<Trip> {
    const createTripResult = await this.tripService.createTrip(
      plainToClass(CreateTripDto, createTripRequest),
    );

    if (createTripResult.status === CreateTripResultStatus.error)
      throw new HttpException(
        createTripResult.error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return createTripResult.trip;
  }
}
