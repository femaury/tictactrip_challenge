export abstract class HTTPClientError extends Error {
    readonly statusCode!: number;
    readonly status!: string;
    readonly name!: string;

    constructor(message: object | string) {
        if (message instanceof Object) {
            super(JSON.stringify(message));
        } else {
            super(message);
        }
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class HTTP400Error extends HTTPClientError {
    readonly statusCode = 400;
    readonly status = "Bad request";

    constructor(message: string | object = "You're request couldn't be understood.") {
        super(message);
    }
}

export class HTTP401Error extends HTTPClientError {
    readonly statusCode = 401;
    readonly status = "Unauthorized";

    constructor(message: string | object = "You must be authenticated to access this resource.") {
        super(message);
    }
}

export class HTTP403Error extends HTTPClientError {
    readonly statusCode = 403;
    readonly status = "Forbidden";

    constructor(message: string | object = "You do not have access to this resource.") {
        super(message);
    }
}

export class HTTP404Error extends HTTPClientError {
    readonly statusCode = 404;
    readonly status = "Not found";

    constructor(message: string | object = "Nothing to see here.") {
        super(message);
    }
}