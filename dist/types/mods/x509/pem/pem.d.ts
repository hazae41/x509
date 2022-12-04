declare namespace PEM {
    const header = "-----BEGIN CERTIFICATE-----";
    const footer = "-----END CERTIFICATE-----";
    function parse(text: string): Buffer;
    function stringify(buffer: Buffer): string;
}

export { PEM };
