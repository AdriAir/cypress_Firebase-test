export class InvalidGenderException extends Error {
    constructor(error: string) {
        super(error);
        this.message = `InvalidGenderException: ${error}`;
    }
}
