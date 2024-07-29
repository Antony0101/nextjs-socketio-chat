function actionWrapper<T extends Array<any>, R>(
    fn: (...args: T) => Promise<{ success: boolean; data: R; message: string }>,
) {
    return async (
        ...args: T
    ): Promise<{ success: boolean; data: R | null; message: string }> => {
        try {
            return await fn(...args);
        } catch (e: any) {
            return {
                success: false,
                data: null,
                message: e.message || "unkown server error",
            };
        }
    };
}

export default actionWrapper;
