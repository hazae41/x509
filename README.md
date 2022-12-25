<div align="center">
<img width="500" src="https://user-images.githubusercontent.com/4405263/207936451-2c8ed697-0319-4c59-b90e-34b7cd447b60.png" />
</div>
<h3 align="center">
Zero-copy X.509 certificates for the web 🏎️
</h3>

```bash
npm i @hazae41/x509
```

[**Node Package 📦**](https://www.npmjs.com/package/@hazae41/x509)

### DO NOT USE

This is experimental software in early development

1. It has security issues
2. Things change quickly

### Current features
- 100% TypeScript and ESM
- Zero-copy reading and writing
- No external dependency
- No cryptography
- PEM and DER parsing
- X.509 certificates (v3)
- X.501 encoding and decoding

### Upcoming features
- X.509 extensions (v3)

### Usage

```typescript
import { DER } from "@hazae41/asn1";
import { PEM, Certificate } from "@hazae41/x509";

const buffer = PEM.parse(await readFile("./cert.pem", "utf8"))
const cert = Certificate.fromASN1(DER.fromBuffer(buffer))
```

