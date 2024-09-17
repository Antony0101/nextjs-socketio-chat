function actionWrapper<T extends Array<any>, R>(
    fn: (...args: T) => Promise<{ success: boolean; data: R; message: string }>,
) {
    return async (
        ...args: T
    ): Promise<
        | { success: true; data: R; message: string }
        | { success: false; data: R | null; message: string }
    > => {
        try {
            return await fn(...args);
        } catch (e: any) {
            console.error(e);
            return {
                success: false,
                data: null,
                message: e.message || "unkown server error",
            };
        }
    };
}

export default actionWrapper;
