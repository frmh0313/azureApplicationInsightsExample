const d3 = require("d3");
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
const instrumentationKey = require("../instrumentationKey");

const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey,
  },
});

appInsights.loadAppInsights();
appInsights.trackPageView();

let i = 0;
let j = 0;

const svg = d3
  .select("body")
  .append("svg")
  .style("width", `${window.innerWidth * 0.3}px`)
  .style("height", `${window.innerHeight * 0.3}px`);

svg
  .append("circle")
  .attr("cx", 80)
  .attr("cy", 80)
  .attr("r", 20)
  .attr("fill", "steelblue")
  .on("touchstart", function () {
    console.log("steelblue circle touched");
    i++;
    appInsights.trackEvent({
      name: "SteelblueCircleTouched",
      properties: {
        time: new Date(),
        count: i,
        color: "steelblue",
      },
    });
  });

svg
  .append("circle")
  .attr("cx", 100)
  .attr("cy", 100)
  .attr("r", 30)
  .attr("fill", "skyblue")
  .on("touchstart", function () {
    console.log("skyblue circle touched");
    j++;
    appInsights.trackEvent({
      name: "SkyblueCircleTouched",
      properties: {
        time: new Date(),
        count: j,
        color: "Skyblue",
      },
    });
  });
