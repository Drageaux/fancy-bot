var Request = require('request');

module.exports = function (app) {
    app.post('/api/challenge', function (req, res) {
        console.log(req.body)
        var payload = req.body.payload;
        if (payload) {
            res.status(200).send({
                'text': req.body.payload
            })
        } else {
            res.sendStatus(500);
        }
    })
};