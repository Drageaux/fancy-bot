var Request = require('request');

module.exports = function (app) {
    app.post('/api/challenge', function (req, res) {
        console.log(req.body)
        if (req.body.challenger) {
            res.status(200).send({
                'text': req.body.challenger
            })
        } else {
            res.sendStatus(500);
        }
    })
};