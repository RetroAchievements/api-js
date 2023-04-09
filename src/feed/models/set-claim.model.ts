import type { ClaimSetType } from "./claim-set-type.enum";
import type { ClaimStatus } from "./claim-status.enum";
import type { ClaimType } from "./claim-type.enum";

export interface SetClaim {
  /** Unique ID of the claim. */
  id: number;

  /** User who made the claim. */
  user: string;

  /** ID of the claimed game. */
  gameId: number;

  /** Title of the claimed game. */
  gameTitle: string;

  /** Site-relative path of the game's icon image. */
  gameIcon: string;

  /** Console name of the claimed game. */
  consoleName: string;

  /** Console ID of the claimed game. */
  consoleId: number;

  /** Whether the claim is primary or a collaboration. */
  claimType: ClaimType;

  /** Whether the claim is for a new set or a revision. */
  setType: ClaimSetType;

  /** Whether the claim is active, complete, or dropped. */
  status: ClaimStatus;

  /** Number of times the claim has been extended. */
  extension: number;

  /** Flag indicating a special type of claim. */
  special: number;

  /** Date the claim was made. */
  created: string;

  /**
   * Date the claim is done. This is an expiration
   * date for active claims, completion date for complete
   * claims, and dropped date for dropped claims.
   */
  doneTime: string;

  /** Date the claim was updated. */
  updated: string;

  /** Time in minutes left until the claim expires. */
  minutesLeft: number;

  /** True if the user is a junior dev. */
  userIsJrDev: boolean;
}
