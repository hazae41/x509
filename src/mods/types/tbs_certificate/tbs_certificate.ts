import { Integer, Sequence, Triplet } from "@hazae41/asn1";
import { Reader } from "libs/reader/reader.js";
import { AlgorithmIdentifier } from "mods/types/algorithm_identifier/algorithm_identifier.js";
import { Name } from "mods/types/name/name.js";
import { SubjectPublicKeyInfo } from "mods/types/subject_public_key_info/subject_public_key_info.js";
import { TBSCertificateVersion } from "mods/types/tbs_certificate/tbs_certificate_version.js";
import { Validity } from "mods/types/validity/validity.js";

export class TBSCertificate {
  readonly #class = TBSCertificate

  constructor(
    readonly version = new TBSCertificateVersion(),
    readonly serialNumber: Integer,
    readonly signature: AlgorithmIdentifier,
    readonly issuer: Name,
    readonly validity: Validity,
    readonly subject: Name,
    readonly subjectPublicKeyInfo: SubjectPublicKeyInfo,
    readonly rest: Triplet[]
  ) { }

  static fromASN1(triplet: Triplet) {
    const reader = Reader.from(triplet, Sequence)
    const version = reader.tryReadType(TBSCertificateVersion)
    const serialNumber = reader.readClass(Integer)
    const signature = reader.readType(AlgorithmIdentifier)
    const issuer = reader.readType(Name)
    const validity = reader.readType(Validity)
    const subject = reader.readType(Name)
    const subjectPublicKeyInfo = reader.readType(SubjectPublicKeyInfo)
    const rest = reader.readTriplets()

    return new this(version, serialNumber, signature, issuer, validity, subject, subjectPublicKeyInfo, rest)
  }
}
