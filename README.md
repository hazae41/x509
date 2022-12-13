# Zero-copy X.509 certificates 🏎️

Zero-copy X.509 certificates in pure modern TypeScript

```bash
npm i @hazae41/x509
```

### Current features
- 100% TypeScript and ESM
- Zero-copy reading and writing
- No external dependency
- No cryptography
- PEM <=> DER conversion
- X.509 certificates

### Upcoming features
- X.509 extensions

### Usage

```typescript
import { DER } from "@hazae41/asn1";
import { PEM, Certificate } from "@hazae41/x509";

const buffer = PEM.parse(await readFile("./test/ed25519.pem", "utf8"))
const cert = Certificate.fromASN1(DER.fromBuffer(buffer))
```