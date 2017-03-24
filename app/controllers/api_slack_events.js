var express = require('express');
var api_slack_events_router = express.Router();

var slack_api = require('./custom_slack_web_api')();
var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/groot-gamify';
var storage = require('../../config/botkit_mongo_storage')({mongoUri: mongoUri});

api_slack_events_router.post('/', function (req, res) {
    // tally reactions added
    if (req.body.event && req.body.event.type == 'reaction_added') {
        console.log('** EVENT TRIGGERED: reaction_added');
        var item = req.body.event.item;
        if (!item) {
            console.log('err: no item found from reaction_added event');
            res.sendStatus(500);
            return;
        }

        var options = {};
        switch (item.type) {
            case 'message':
                options = {
                    channel: item.channel,
                    timestamp: item.ts
                };
                break;
            case 'file':
                options = {file: item.file};
                break;
            case 'file_comment':
                options = {file_comment: item.file_comment};
                break;
        }
        console.log(options);
        slack_api.reactions.get(options, function (err, response) {
            console.log('** RESPONSE:\n------------\n', response, '\n------------');
            var emojis = response[item.type].reactions;
            var userId = response[item.type].user;
            var totalCount = 0;
            emojis.forEach(function (emoji) {
                totalCount += !isNaN(emoji.count) ? emoji.count : 0;
            });
            if (totalCount < 5) {
                res.sendStatus(200)
            } else {
                addPoints(userId, totalCount, res);
            }
        });
    } else {
        res.sendStatus(500);
        return;
    }
});

function addPoints(userId, points, res) {
    storage.users.get(userId, function (err, user) {
        if (err || !user) {
            user = {
                id: member,
                team_id: message.team,
                score: points
            }
        }
        storage.users.save(user, function (err, savedUser) {
            if (err) console.log('err:', err);
            if (isNaN(savedUser.score) || !savedUser.score) {
                savedUser.score = points;
            } else {
                savedUser.score += points;
            }
            storage.users.save(savedUser, function (err, finalUser) {
                if (err) console.log('err:', err);
                else {
                    console.log('User ' + finalUser.id + ' updated with score ' + finalUser.score);
                    res.json(finalUser);
                }
            });
        });
    });
}


module.exports = api_slack_events_router;