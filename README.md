<div align="center">
<img  src="https://user-images.githubusercontent.com/4405263/219945066-a2adbe64-f75e-4317-bb22-91a8457181fa.png" />
</div>

```bash
npm i @hazae41/x509
```

[**Node Package 📦**](https://www.npmjs.com/package/@hazae41/x509)

## DO NOT USE

This is experimental software in early development

1. It has security issues
2. Things change quickly

## Features

### Current features
- 100% TypeScript and ESM
- Zero-copy reading and writing
- No external dependency
- No cryptography
- PEM and DER parsing
- X.509 certificates (v3)
- X.501 encoding and decoding

### [Upcoming features](https://github.com/sponsors/hazae41)
- X.509 extensions (v3)

## Usage

```typescript
import { DER } from "@hazae41/asn1";
import { PEM, Certificate } from "@hazae41/x509";

const bytes = PEM.parse(await readFile("./cert.pem", "utf8"))
const cert = Certificate.fromBytes(bytes)
```

