import * as dotenv from 'dotenv';

dotenv.config();

const {
  PORT,
  GLOBAL_PREFIX,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = process.env;

const CONFIG = {
  PORT,
  GLOBAL_PREFIX,
  POSTGRES_HOST,
  POSTGRES_PORT: Number(POSTGRES_PORT),
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
};

export default CONFIG;
