export type ActionReturnType<T> = {
    success: boolean;
    data: T;
    message: string;
};
