export class BookDto {
    readonly _id: string;
    readonly name: string;
    readonly author: string;
    readonly price: number;

    constructor(data: Partial<BookDto>) {
        Object.assign(this, data);
    }
}