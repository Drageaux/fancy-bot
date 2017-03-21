var Request = require('request');

module.exports = function (app) {
    app.post('/api/challenge', function (req, res) {
        var payload = JSON.parse(req.body.payload);
        if (payload) {
            console.log(payload);
            var challenger = payload.actions[0].value;
            res.status(200).send({
                'text': "Dave challenged " + challenger + " to a Shaolin Showdown!"
            })
        } else {
            res.sendStatus(500);
        }
    })
};