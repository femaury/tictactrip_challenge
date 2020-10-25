declare namespace Express {
    interface Request {
        credentials: {
            id: number;
            email: string;
        };
        currentWords: number;
    }
}