const path = require('path');
const controller = {};

controller.getHome = (request, response) => {
  const view = getView('/main');
  const fields = {
    pageTitle: 'My Complete Wellness',
    pageDescription: 'Welcome to My Complete Wellness, a total wellness tracker that integrates with Google Fit!',
  };

  response.render(view, fields);
};

module.exports = controller;

function getView(page) {
  const view = path.join(__dirname, '../views', page);
  return view;
}
