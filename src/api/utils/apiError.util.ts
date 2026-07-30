import { ValidationError } from "class-validator";

export class APIError extends Error {
    public statusCode: number;

    constructor(
        message="Internal Server Error",
        statusCode=500
    ) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class APIValidationError extends APIError {
    public readonly fields: { [key: string]: object };

    constructor(
        message="Validation Error",
        statusCode=400,
        fields={}
    ) {
        super(message, statusCode);
        this.fields = fields;
    }
}

export const formatValidationErrors = (errors: ValidationError[]) => {
    const formattedErrors: { [key: string]: object } = {}

    errors.forEach(error => {
        const { property, constraints } = error;
        const messages = Object.values(constraints || {});

        formattedErrors[property] = messages;
    });

    return formattedErrors;
}
