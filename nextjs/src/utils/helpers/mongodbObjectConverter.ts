import { ExtractEntity, ExtractI } from "../../lib/tsHelpers";
import mongoose from "mongoose";

// this is a stupid function and it assumes that the data is not circular and it will convert all the objectIds to string and there is no type checking, literally no type checking and will behave weirdly if the data is a mongodbObject instead of simple object
// i literally wrote this function so that i don't need to use JSON.parse(JSON.stringify(data)) to convert the mongodb object to simple object (as mongoose object.toObject() keeps the objectIds as objectIds instance instead of string and it is adding problems to server actions internal json convertor)
function mongodbRecursiveObjectConverter<T>(data: T): T {
    if (data instanceof Array) {
        return data.map((item: any) =>
            mongodbRecursiveObjectConverter(item),
        ) as any;
    }
    const result = {} as any;
    const modData = data as any;
    Object.entries(modData).forEach(([key, value]) => {
        // don't use mongoose.Types.ObjectId.isValid(value); as it will return true for some invalid values
        if (mongoose.isObjectIdOrHexString(value)) {
            const typeValue = value as mongoose.Types.ObjectId;
            result[key] = typeValue.toString();
        } else if (value instanceof Date) {
            result[key] = value.toISOString();
        } else if (value instanceof Object) {
            result[key] = mongodbRecursiveObjectConverter(value);
        } else {
            result[key] = value;
        }
    });
    return result;
}

// expects a array of mongodb objects and will convert them to simple objects with objectIds as string
function mongodbArrayConverter<T>(data: T[]): T[] {
    const modData = data as any;
    return modData.map((item: any) =>
        mongodbRecursiveObjectConverter(item.toObject()),
    ) as any;
}

// expects a mongodb object and will convert them to simple objects with objectIds as string
function mongodbObjectConverter<T>(data: T): ExtractI<T> {
    const modData = data as any;
    return mongodbRecursiveObjectConverter(modData.toObject()) as any;
}

export {
    mongodbRecursiveObjectConverter,
    mongodbArrayConverter,
    mongodbObjectConverter,
};
