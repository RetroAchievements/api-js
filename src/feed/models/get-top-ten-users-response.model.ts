interface TopTenUsersResponseEntity {
  /** Username */
  "1": string;

  /** Total points earned by the user */
  "2": string;

  /** Total ratio (white) points earned by the user  */
  "3": string;
}

export type GetTopTenUsersResponse = TopTenUsersResponseEntity[];
