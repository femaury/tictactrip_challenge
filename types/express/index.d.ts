declare namespace Express {
    interface Request {
        credentials: {
            email: string;
        };
    }
}