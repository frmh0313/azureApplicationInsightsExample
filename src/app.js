const express = require("express");
const app = express();
const server = require("http").createServer(app);
const serverPort = process.env.PORT || 8082;
const appInsights = require("applicationinsights");
const io = require("socket.io")(server);
const instrumentationKey = require("../instrumentationKey");
let client = appInsights.defaultClient;

appInsights.setup(instrumentationKey).setAutoCollectConsole(true, true);

appInsights.start();
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

server.listen(serverPort, () => {
  console.log(`Server started on port ${serverPort}`);
});

io.on("connection", (socket) => {
  io.setMaxListeners("transports", ["websocket"]);
  const now = new Date();
  io.emit("new_connection", () => {
    client.trackEvent({
      name: "server new_connection",
      properties: {
        port: serverPort,
        timestamp: now,
      },
    });
    return {
      port: serverPort,
      timestamp: now,
    };
  });
});
