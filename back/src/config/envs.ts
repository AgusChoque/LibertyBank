import "dotenv/config";

export const PORT: number = Number(process.env.PORT);
export const DATABASE: string | undefined = process.env.DATABASE;
export const PORTDB: number = Number(process.env.PORTDB);
export const PASSWORD: string | undefined = process.env.PASSWORD;
export const USER: string | undefined = process.env.USER;
export const HOST: string | undefined = process.env.HOST;