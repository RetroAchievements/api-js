import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getUserAwards } from "./getUserAwards";
import type { GetUserAwardsResponse } from "./models";

const server = setupServer();

describe("Function: getUserAwards", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getUserAwards).toBeDefined();
  });

  it("retrieves a list of a target user awards", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: GetUserAwardsResponse = {
      TotalAwardsCount: 10,
      HiddenAwardsCount: 5,
      MasteryAwardsCount: 5,
      CompletionAwardsCount: 0,
      BeatenHardcoreAwardsCount: 24,
      BeatenSoftcoreAwardsCount: 7,
      EventAwardsCount: 0,
      SiteAwardsCount: 0,
      VisibleUserAwards: [
        {
          AwardedAt: "2022-08-26T19:34:43+00:00",
          AwardType: "Mastery/Completion",
          AwardData: 802,
          AwardDataExtra: 1,
          DisplayOrder: 114,
          Title: "WarioWare, Inc.: Mega Microgames!",
          ConsoleName: "Game Boy Advance",
          Flags: null,
          ImageIcon: "/Images/034678.png",
        },
      ],
    };

    server.use(
      http.get(`${apiBaseUrl}/API_GetUserAwards.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getUserAwards(authorization, { username: "xelnia" });

    // ASSERT
    expect(response).toEqual({
      totalAwardsCount: 10,
      hiddenAwardsCount: 5,
      masteryAwardsCount: 5,
      completionAwardsCount: 0,
      beatenHardcoreAwardsCount: 24,
      beatenSoftcoreAwardsCount: 7,
      eventAwardsCount: 0,
      siteAwardsCount: 0,
      visibleUserAwards: [
        {
          awardedAt: "2022-08-26T19:34:43+00:00",
          awardType: "Mastery/Completion",
          awardData: 802,
          awardDataExtra: 1,
          displayOrder: 114,
          title: "WarioWare, Inc.: Mega Microgames!",
          consoleName: "Game Boy Advance",
          flags: null,
          imageIcon: "/Images/034678.png",
        },
      ],
    });
  });
});
