var Request = require('request');
var api_slack_interactive_router = require('../controllers/api_slack_interactive');
var api_slack_events_router = require('../controllers/api_slack_events');

module.exports = function (app) {
    app.use('/api/slack/interactive', api_slack_interactive_router);
    app.use('/api/slack/events', api_slack_events_router);
};