import { Document, Model } from "mongoose";

// mongoose helper generic types

// internal types
type ExtractDoc<T> = T extends Model<infer U> ? U : never;
export type ExtractI<T> = Pick<T, Exclude<keyof T, keyof Document>>;

// external types
export type ExtractEntity<T> = ExtractI<ExtractDoc<T>> & { _id: string };
export type ExtractDocument<T extends abstract new (...args: any) => any> =
    InstanceType<T>;
