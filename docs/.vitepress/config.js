export default {
  title: "RetroAchievements API",
  description: "Just playing around.",

  themeConfig: {
    siteTitle: "@retroachievements/api",

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
