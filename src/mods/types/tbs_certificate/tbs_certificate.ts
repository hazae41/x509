import { BitString, DERCursor, DERTriplet, Integer, Sequence } from "@hazae41/asn1";
import { Nullable } from "@hazae41/option";
import { AlgorithmIdentifier } from "mods/types/algorithm_identifier/algorithm_identifier.js";
import { Name } from "mods/types/name/name.js";
import { SubjectPublicKeyInfo } from "mods/types/subject_public_key_info/subject_public_key_info.js";
import { TBSCertificateVersion } from "mods/types/tbs_certificate/tbs_certificate_version.js";
import { Validity } from "mods/types/validity/validity.js";
import { Extensions } from "../extensions/extensions.js";

export class TBSCertificate {

  constructor(
    readonly version: Nullable<TBSCertificateVersion>,
    readonly serialNumber: Integer,
    readonly signature: AlgorithmIdentifier,
    readonly issuer: Name,
    readonly validity: Validity,
    readonly subject: Name,
    readonly subjectPublicKeyInfo: SubjectPublicKeyInfo,
    readonly issuerUniqueID: Nullable<BitString>,
    readonly subjectUniqueID: Nullable<BitString>,
    readonly extensions?: Nullable<Extensions>,
  ) { }

  toDER(): DERTriplet {
    return Sequence.create(undefined, [
      this.version?.toDER(),
      this.serialNumber,
      this.signature.toDER(),
      this.issuer.toDER(),
      this.validity.toDER(),
      this.subject.toDER(),
      this.subjectPublicKeyInfo.toDER(),
      this.issuerUniqueID?.toDER(),
      this.subjectUniqueID?.toDER(),
      this.extensions?.toDER()
    ] as const).toDER()
  }

  static resolveOrThrow(parent: DERCursor) {
    const cursor = parent.subAsOrThrow(Sequence.DER)
    const version = TBSCertificateVersion.resolveOrThrow(cursor)
    const serialNumber = cursor.readAsOrThrow(Integer.DER)
    const signature = AlgorithmIdentifier.resolveOrThrow(cursor)
    const issuer = Name.resolveOrThrow(cursor)
    const validity = Validity.resolveOrThrow(cursor)
    const subject = Name.resolveOrThrow(cursor)
    const subjectPublicKeyInfo = SubjectPublicKeyInfo.resolveOrThrow(cursor)

    const issuerUniqueID = cursor.readAsType(BitString.DER.type.retag(1), BitString.DER)

    if (issuerUniqueID != null && version?.value?.value !== TBSCertificateVersion.values.v2.value && version?.value?.value !== TBSCertificateVersion.values.v3.value)
      throw new Error("Issuer unique ID must not be present unless version is 2 or 3")

    const subjectUniqueID = cursor.readAsType(BitString.DER.type.retag(2), BitString.DER)

    if (subjectUniqueID != null && version?.value?.value !== TBSCertificateVersion.values.v2.value && version?.value?.value !== TBSCertificateVersion.values.v3.value)
      throw new Error("Subject unique ID must not be present unless version is 2 or 3")

    const extensions = Extensions.resolveOrThrow(cursor)

    if (extensions != null && version?.value?.value !== TBSCertificateVersion.values.v3.value)
      throw new Error("Extensions must not be present unless version is 3")

    return new TBSCertificate(version, serialNumber, signature, issuer, validity, subject, subjectPublicKeyInfo, issuerUniqueID, subjectUniqueID, extensions)
  }

}
