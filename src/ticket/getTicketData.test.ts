import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getTicketData } from "./getTicketData";
import type {
  AchievementTicketStatsResponse,
  GameTicketsResponse,
  MostTicketedGamesResponse,
  RecentTicketsResponse,
  ResponseTicketEntity,
  TicketsByUserResponse,
} from "./models";

const server = setupServer();

describe("Function: getTicketData", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    expect(getTicketData).toBeDefined();
  });

  it("given only a ticket ID, retrieves ticket data", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: ResponseTicketEntity = {
      ID: "10000",
      AchievementID: "3237",
      AchievementTitle: "Laura's Weapons",
      AchievementDesc: "Obtained all available weapons as Laura",
      Points: "25",
      BadgeName: "61993",
      AchievementAuthor: "PManningFan1618",
      GameID: "1474",
      ConsoleName: "NES",
      GameTitle: "Friday the 13th",
      GameIcon: "/Images/062848.png",
      ReportedAt: "2017-10-16 06:10:52",
      ReportType: "1",
      ReportState: "2",
      Hardcore: null,
      ReportNotes: "This lacks a ResetIf when the game is reset",
      ReportedBy: "Thoreau",
      ResolvedAt: "2019-11-15 01:50:41",
      ResolvedBy: "televandalist",
      ReportStateDescription: "Resolved",
      ReportTypeDescription: "Triggered at the wrong time",
      URL: "https://retroachievements.org/ticketmanager.php?i=10000",
    };

    server.use(
      http.get(`${apiBaseUrl}/API_GetTicketData.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getTicketData(authorization, { ticketId: 10_000 });

    // ASSERT
    expect(response).toEqual({
      id: 10_000,
      achievementId: 3237,
      achievementTitle: "Laura's Weapons",
      achievementDesc: "Obtained all available weapons as Laura",
      points: 25,
      badgeName: "61993",
      achievementAuthor: "PManningFan1618",
      gameId: 1474,
      consoleName: "NES",
      gameTitle: "Friday the 13th",
      gameIcon: "/Images/062848.png",
      reportedAt: "2017-10-16 06:10:52",
      reportType: 1,
      reportState: 2,
      hardcore: null,
      reportNotes: "This lacks a ResetIf when the game is reset",
      reportedBy: "Thoreau",
      resolvedAt: "2019-11-15 01:50:41",
      resolvedBy: "televandalist",
      reportStateDescription: "Resolved",
      reportTypeDescription: "Triggered at the wrong time",
      url: "https://retroachievements.org/ticketmanager.php?i=10000",
    });
  });

  it("given no IDs, retrieves a list of recent tickets", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: RecentTicketsResponse = {
      RecentTickets: [
        {
          ID: "55958",
          AchievementID: "111994",
          AchievementTitle: "Mandarin Mayhem Phone Mission #7-A",
          AchievementDesc:
            "Complete the Part 1 of 7th mission on Mandarin Mayhem chapter",
          Points: "5",
          BadgeName: "126387",
          AchievementAuthor: "Hotscrock",
          GameID: "10437",
          ConsoleName: "PlayStation",
          GameTitle: "Grand Theft Auto",
          GameIcon: "/Images/050159.png",
          ReportedAt: "2023-01-28 14:12:06",
          ReportType: "2",
          Hardcore: "1",
          ReportNotes:
            "Instead what popped was 7B achievement. A second game where i did complete both missions successfully did not trigger it either.\n" +
            "RetroAchievements Hash: c39f4c56d4f9c6a1bdf746f5b2309ebf\n" +
            "Emulator: RetroArch (Beetle PSX HW 0.9.44.1)\n" +
            "Emulator Version: 1.14",
          ReportedBy: "Erodion",
          ResolvedAt: null,
          ResolvedBy: null,
          ReportState: "1",
          ReportStateDescription: "Open",
          ReportTypeDescription: "Did not trigger",
        },
      ],
      OpenTickets: 715,
      URL: "https://retroachievements.org/ticketmanager.php",
    };

    server.use(
      http.get(`${apiBaseUrl}/API_GetTicketData.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getTicketData(authorization);

    // ASSERT
    expect(response).toEqual({
      recentTickets: [
        {
          id: 55_958,
          achievementId: 111_994,
          achievementTitle: "Mandarin Mayhem Phone Mission #7-A",
          achievementDesc:
            "Complete the Part 1 of 7th mission on Mandarin Mayhem chapter",
          points: 5,
          badgeName: "126387",
          achievementAuthor: "Hotscrock",
          gameId: 10_437,
          consoleName: "PlayStation",
          gameTitle: "Grand Theft Auto",
          gameIcon: "/Images/050159.png",
          reportedAt: "2023-01-28 14:12:06",
          reportType: 2,
          hardcore: true,
          reportNotes:
            "Instead what popped was 7B achievement. A second game where i did complete both missions successfully did not trigger it either.\n" +
            "RetroAchievements Hash: c39f4c56d4f9c6a1bdf746f5b2309ebf\n" +
            "Emulator: RetroArch (Beetle PSX HW 0.9.44.1)\n" +
            "Emulator Version: 1.14",
          reportedBy: "Erodion",
          resolvedAt: null,
          resolvedBy: null,
          reportState: 1,
          reportStateDescription: "Open",
          reportTypeDescription: "Did not trigger",
        },
      ],
      openTickets: 715,
      url: "https://retroachievements.org/ticketmanager.php",
    });
  });

  it("can retrieve a list of the most ticketed games", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: MostTicketedGamesResponse = {
      MostReportedGames: [
        {
          GameID: "11588",
          GameTitle: "Driver 2: The Wheelman Is Back",
          GameIcon: "/Images/046592.png",
          Console: "PlayStation",
          OpenTickets: "16",
        },
        {
          GameID: "5515",
          GameTitle: "Ninja Ryuuken Den | Ninja Gaiden",
          GameIcon: "/Images/020735.png",
          Console: "PC Engine",
          OpenTickets: "15",
        },
      ],
      URL: "https://retroachievements.org/ticketmanager.php?f=1",
    };

    server.use(
      http.get(`${apiBaseUrl}/API_GetTicketData.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getTicketData(authorization, {
      isGettingMostTicketedGames: true,
    });

    // ASSERT
    expect(response).toEqual({
      mostReportedGames: [
        {
          gameId: 11_588,
          gameTitle: "Driver 2: The Wheelman Is Back",
          gameIcon: "/Images/046592.png",
          console: "PlayStation",
          openTickets: 16,
        },
        {
          gameId: 5515,
          gameTitle: "Ninja Ryuuken Den | Ninja Gaiden",
          gameIcon: "/Images/020735.png",
          console: "PC Engine",
          openTickets: 15,
        },
      ],
      url: "https://retroachievements.org/ticketmanager.php?f=1",
    });
  });

  it("can retrieve metadata about a user's tickets", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: TicketsByUserResponse = {
      User: "xelnia",
      Open: 0,
      Closed: 18,
      Resolved: 51,
      Total: 69,
      URL: "https://retroachievements.org/ticketmanager.php?u=Jamiras",
    };

    server.use(
      http.get(`${apiBaseUrl}/API_GetTicketData.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getTicketData(authorization, { username: "xelnia" });

    // ASSERT
    expect(response).toEqual({
      user: "xelnia",
      open: 0,
      closed: 18,
      resolved: 51,
      total: 69,
      url: "https://retroachievements.org/ticketmanager.php?u=Jamiras",
    });
  });

  it("can retrieve metadata about a game's tickets", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: GameTicketsResponse = {
      GameID: 10_329,
      GameTitle: "Rampage 2: Universal Tour",
      ConsoleName: "Nintendo 64",
      OpenTickets: 8,
      URL: "https://retroachievements.org/ticketmanager.php?g=10329",
    };

    server.use(
      http.get(`${apiBaseUrl}/API_GetTicketData.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getTicketData(authorization, { gameId: 10_329 });

    // ASSERT
    expect(response).toEqual({
      gameId: 10_329,
      gameTitle: "Rampage 2: Universal Tour",
      consoleName: "Nintendo 64",
      openTickets: 8,
      url: "https://retroachievements.org/ticketmanager.php?g=10329",
    });
  });

  it("can retrieve metadata about an achievement's tickets", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: AchievementTicketStatsResponse = {
      AchievementID: 283_331,
      AchievementTitle: "Blue Potaras Collector",
      AchievementDescription: "Unlock all Ability Type Z-Items",
      URL: "https://retroachievements.org/ticketmanager.php?a=283331",
      OpenTickets: 1,
    };

    server.use(
      http.get(`${apiBaseUrl}/API_GetTicketData.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getTicketData(authorization, {
      achievementId: 283_331,
    });

    // ASSERT
    expect(response).toEqual({
      achievementId: 283_331,
      achievementTitle: "Blue Potaras Collector",
      achievementDescription: "Unlock all Ability Type Z-Items",
      url: "https://retroachievements.org/ticketmanager.php?a=283331",
      openTickets: 1,
    });
  });
});
