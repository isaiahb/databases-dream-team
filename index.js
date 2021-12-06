const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const path = require('path');
const useragent = require('express-useragent');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const api = require("./backend/routes/index");

const app = express();
const port = process.env.PORT || 5000;
const BUILD_DIRECTORY = './frontend/build';

dotenv.config();

//connect to db
// mongoose.set('useCreateIndex', true);
mongoose.connect(process.env._MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => console.log("Connected to mongo database"));
db.on('error', console.error.bind(console, "MongoDB connection error: "));

app.use(require('cookie-parser')());
app.use(cors({ origin: '*' }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true, parameterLimit: 500000 }));

app.use(useragent.express());
app.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

//Use API
app.use("/api", api);

// Serve react site.
app.use(express.static(path.resolve(__dirname, BUILD_DIRECTORY)));
app.get('*', function (request, response) {
  const filePath = path.resolve(__dirname, BUILD_DIRECTORY, 'index.html');
  response.sendFile(filePath);
});

// Start server.
app.listen(port, () => console.log(`Listening on port: http://localhost:${port}`));
