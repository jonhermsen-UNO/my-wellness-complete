const path = require('path');
const controller = {};

controller.getHome = (request, response) => {
  const view = getView('/main');
  const fields = {
    pageTitle: 'My Wellness Complete',
    pageDescription: 'Welcome to My Wellness Complete, a total wellness tracker that integrates with Google Fit!',
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
    const user = request.session.passport.user.profile;

    profile.hasLogin = true;
    profile.name = user.displayName;
    profile.picture = user.photos ? user.photos[0].value : '';
  }

  return profile;
}
