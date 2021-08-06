import { config } from 'dotenv';
config();

const { env: EV } = process;

export const { DATABASE_CONNECTION } = EV;
export const { DATABASE_NAME } = EV;
