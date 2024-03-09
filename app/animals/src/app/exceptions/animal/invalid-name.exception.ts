export class InvalidNameException extends Error {
    constructor(error: string) {
        super(error);
        this.message = `InvalidNameException: ${error}`;
    }
}
