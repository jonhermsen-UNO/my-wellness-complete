const path = require('path');
const controller = {};

controller.getHome = (request, response) => {
  const view = getView('/main');
  const fields = {
    pageTitle: 'My Complete Wellness',
    pageDescription: 'Welcome to My Complete Wellness, a total wellness tracker that integrates with Google Fit!',
    profile: getProfile(request),
  };

  response.render(view, fields);
};

module.exports = controller;

function getView(page) {
  const view = path.join(__dirname, '../views', page);
  return view;
}

function getProfile(request) {
  const profile = {
    name: '',
    picture: '',
    hasLogin: false,
  };

  if (request && request.session && request.session.passport && request.session.passport.user) {
    const user = request.session.passport.user;

    profile.hasLogin = true;
    profile.name = user.displayName;
    profile.picture = user.photos ? user.photos[0].value : '';
  }

  return profile;
}
