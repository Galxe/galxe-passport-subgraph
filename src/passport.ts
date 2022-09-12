import { log } from "@graphprotocol/graph-ts"
import {
  Mint,
  Burn,
  Revoke,
  EventPassportStatusUpdated
} from "../generated/GalxePassport/GalxePassport"
import { 
  Passport
} from "../generated/schema"

const issueStatusValid = "Valid"
const issueStatusBurned = "Burned"
const issueStatusRevoked = "Revoked"

export function handleMint(event: Mint): void {
    let owner = event.params.owner;
    let id = event.params.tokenId;

    let passport = new Passport(id.toString());
    passport.owner = owner;
    passport.issueStatus = issueStatusValid;
    passport.status = event.params.status.toI32();
    passport.save();
}

export function handleBurn(event: Burn): void {
    let id = event.params.tokenId;
    let passport = Passport.load(id.toString());
    if (passport === null) {
        log.error("Passport {} not exist", [id.toString()]);
        return;
    }
    passport.issueStatus = issueStatusBurned;
    passport.save();
}

export function handleRevoke(event: Revoke): void {
    let id = event.params.tokenId;
    let passport = Passport.load(id.toString());
    if (passport === null) {
        log.error("Passport {} not exist", [id.toString()]);
        return;
    }
    passport.issueStatus = issueStatusRevoked;
    passport.save();
}

export function handleStatusUpdated(event: EventPassportStatusUpdated): void {
    let id = event.params.tokenId;
    let passport = Passport.load(id.toString());
    if (passport === null) {
        log.error("Passport {} not exist", [id.toString()]);
        return;
    }
    passport.status = event.params.tokenId.toI32();
    passport.save();
}
