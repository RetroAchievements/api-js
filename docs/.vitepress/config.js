export default {
  title: "RetroAchievements API",
  description:
    "The official JavaScript library for getting achievement, user, and game data from RetroAchievements.",

  themeConfig: {
    siteTitle: "@retroachievements/api",
    logo: "./favicon.webp",

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/retroachievements/retroachievements-api-js"
      },
      {
        icon: "discord",
        link: "https://discord.gg/dq2E4hE"
      }
    ],

    nav: [{ text: "Quick Start", link: "/getting-started" }],

    sidebar: [
      {
        text: "About",
        link: "/"
      },
      {
        text: "Getting Started",
        link: "/getting-started"
      },
      {
        text: "Users",
        collapsible: true,
        items: [
          {
            text: "Achievements Earned Between Days",
            link: "/v1/users/get-achievements-earned-between"
          },
          {
            text: "Achievements Earned On Day",
            link: "/v1/users/get-achievements-earned-on-day"
          },
          {
            text: "Progress for Game with Game Info",
            link: "/v1/users/get-game-info-and-user-progress"
          },
          {
            text: "Set Claims",
            link: "/v1/users/get-user-claims"
          },
          {
            text: "Completed Games",
            link: "/v1/users/get-user-completed-games"
          },
          {
            text: "Rank and Score for Game",
            link: "/v1/users/get-user-game-rank-and-score"
          },
          {
            text: "Point Totals",
            link: "/v1/users/get-user-points"
          },
          {
            text: "Progress for Multiple Games",
            link: "/v1/users/get-user-progress"
          },
          {
            text: "Recently Played Games",
            link: "/v1/users/get-user-recently-played-games"
          },
          {
            text: "User Summary",
            link: "/v1/users/get-user-summary"
          }
        ]
      },
      {
        text: "Consoles",
        collapsible: true,
        items: [
          {
            text: "Get All IDs",
            link: "/v1/consoles/get-console-ids"
          },
          {
            text: "Get All Games",
            link: "/v1/consoles/get-game-list"
          }
        ]
      },
      {
        text: "Achievements",
        collapsible: true,
        items: [
          {
            text: "Unlocks List",
            link: "/v1/achievements/get-achievement-unlocks"
          }
        ]
      }
    ],

    editLink: {
      pattern:
        "https://github.com/retroachievements/retroachievements-api-js/edit/docs/:path",
      text: "Edit this page on GitHub"
    },

    footer: {
      message: "Released under the MIT license.",
      copyright: "Copyright © 2023–Present RetroAchievements."
    }
  }
};
