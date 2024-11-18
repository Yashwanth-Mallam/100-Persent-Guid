require("@babel/register")({
  presets: ["@babel/preset-env"],
  sourceMaps: true,
});

// Use modern polyfills
require("core-js/stable");
require("regenerator-runtime/runtime");

// Start the Express app
require("./app.js");
