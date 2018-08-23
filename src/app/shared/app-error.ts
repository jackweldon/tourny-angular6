export class AppError {

    constructor(public originalError?: any) {

    }

    description: string;
    code: string;
}

export class BadRequestError extends AppError {

}

export class BadInput extends AppError {

}

