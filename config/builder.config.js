module.exports = {
  productName: "Stock Charts",
  appId: "uk.co.andrewnovak.electronstockcharts",
  directories: {
    app: "prod",
    output: "release",
  },
  /* mac: {
    icon: "icon",
  }, */
  linux: {
    target: [
      {
        target: "deb",
        arch: ["x64"],
      },
    ],
    category: "Finance",
    icon: "../prod/assets/icon.icns",
    /* desktop: {
      Name: "Stock Charts",
      Exec: "electron .",
      Icon: "electronstockcharts",
      Type: "Application",
    }, */
  },
};
