import { Trip } from '../../repositories/entities';

export class CreateTripResultDto {
  status: CreateTripResultStatus;
  trip?: Trip;
  error?: Error;
}

export const enum CreateTripResultStatus {
  success = 'success',
  error = 'error',
}
