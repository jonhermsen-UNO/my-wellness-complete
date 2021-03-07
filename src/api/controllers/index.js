const axios = require('axios');

const controller = {};

controller.getWellness = (request, response) => {
  const token = getToken(request);

  // early return if the user is not logged in
  if (!token) return response.status(403).json({ type: 'warning', message: 'You must login to check your wellness.' });

  const headers = { headers: { authorization: 'Bearer ' + token } };
  const URL = {
    sources: 'https://www.googleapis.com/fitness/v1/users/me/dataSources',
    datasets: 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate',
  };

  axios
    .get(URL.sources, headers)
    .then((sourcesResponse) => {
      const dates = getDateRange();
      const aggregateData = {
        aggregateBy: [],
        bucketByTime: { durationMillis: 2 * 24 * 60 * 60 * 1000 }, // 2 days
        startTimeMillis: dates.start.getTime(),
        endTimeMillis: dates.end.getTime(),
      };

      sourcesResponse.data.dataSource.forEach((source) => {
        if (source && source.dataType && source.application && source.dataStreamName) {
          // only consider a data source valid when its dataStreamId is a composite of its other fields
          const composite = `${source.type}:${source.dataType.name}:${source.application.packageName}:${source.dataStreamName}`;
          if (composite === source.dataStreamId) aggregateData.aggregateBy.push({ dataSourceId: source.dataStreamId });
        }
      });

      if (!aggregateData.aggregateBy)
        return response.status(404).json({ type: 'info', message: 'You do not have any wellness data.' });

      axios
        .post(URL.datasets, aggregateData, headers)
        .then((datasetsResponse) => {
          const wellness = [];

          datasetsResponse.data.bucket.forEach((bucket) => {
            if (bucket)
              bucket.dataset.forEach((record) => {
                if (record)
                  record.point.forEach((entry) => {
                    if (entry) wellness.push(entry);
                  });
              });
          });

          return response.json({ wellness });
        })
        .catch((_) => {
          return response.status(500).json({ type: 'warning', message: 'Google Fit refused this request' });
        });
    })
    .catch((_) => {
      return response.status(500).json({ type: 'warning', message: 'Google Fit refused this request' });
    });
};

module.exports = controller;

function getToken(request) {
  let token = '';

  if (request && request.session && request.session.passport && request.session.passport.user) {
    token = request.session.passport.user.token;
  }

  return token;
}

function getDateRange() {
  // start date is the beginning of today, less three days
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - 3);

  // end date is now
  const end = new Date();

  return { start: start, end: end };
}
