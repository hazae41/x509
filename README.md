<div align="center">
<img  src="https://user-images.githubusercontent.com/4405263/219945066-a2adbe64-f75e-4317-bb22-91a8457181fa.png" />
</div>

```bash
npm i @hazae41/x509
```

[**Node Package 📦**](https://www.npmjs.com/package/@hazae41/x509)

## Features

### Current features
- 100% TypeScript and ESM
- Zero-copy reading and writing
- No external dependency
- No cryptography
- Rust-like patterns
- PEM and DER parsing
- X.509 certificates (v3)
- X.501 encoding and decoding

### [Upcoming features](https://github.com/sponsors/hazae41)
- X.509 extensions (v3)

## Usage

### DER

```typescript
import { Certificate, X509 } from "@hazae41/x509";

const bytes = await readFile("./cert.der")
const cert = X509.tryReadFromBytes(bytes, Certificate).unwrap()
```

### PEM

```typescript
import { PEM, Certificate, X509 } from "@hazae41/x509";

const bytes = PEM.tryParse(await readFile("./cert.pem", "utf8")).unwrap()
const cert = X509.tryReadFromBytes(bytes, Certificate).unwrap()
```

