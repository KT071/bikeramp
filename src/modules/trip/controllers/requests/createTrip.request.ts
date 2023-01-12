import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateTripRequest {
  @IsString()
  start_address: string;

  @IsString()
  destination_address: string;

  @IsNumber()
  price: number;

  @IsDateString()
  date: Date;
}
