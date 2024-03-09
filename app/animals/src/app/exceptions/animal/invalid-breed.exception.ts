export class InvalidBreedException extends Error {
    constructor(error: string) {
        super(error);
        this.message = `InvalidBreedException: ${error}`;
    }
}
