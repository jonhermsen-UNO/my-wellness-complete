const express = require('express');
const app = express();

/** Middleware **/

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Layout Engine **/

app.use(require('express-ejs-layouts'));
app.set('view engine', 'ejs');

const path = require('path');
app.set('layout', path.join(__dirname, './app/layouts/main'));

/** Routers **/

const routes = {};
routes.app = require('./app/routes');
routes.api = require('./api/routes');
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', routes.app);
app.use('/api/', routes.api);

/** Server **/

const port = process.env.PORT || '3000';
app.listen(port, () => {
  console.log(`\nThe server is now listening at http://localhost:${port}/app/`);
});

module.exports = app;
