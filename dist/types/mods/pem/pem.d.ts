declare class PEM {
    readonly class: typeof PEM;
    static header: string;
    static footer: string;
    static parse(text: string): Buffer;
}

export { PEM };
