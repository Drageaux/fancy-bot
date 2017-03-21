var Request = require('request');

module.exports = function (app) {
    app.post('/api/challenge', function (req, res) {
        var payload = req.body.payload;
        if (payload) {
            console.log(JSON.parse(payload))
            res.status(200).send({
                'text': req.body.payload
            })
        } else {
            res.sendStatus(500);
        }
    })
};