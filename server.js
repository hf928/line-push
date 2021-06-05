const express = require('express');
const cors = require('cors');
const line = require('@line/bot-sdk');

const { Target, AccessToken } = require('./config/channel');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


const makeLinePush = (message) => {

    const client = new line.Client({
        channelAccessToken: AccessToken
    });

    client.pushMessage(Target, message)
        .then(() => {
            console.log('success');
        })
        .catch((err) => {
            console.log('fail', err);
        });

}

app.post('/message', (req, res) => {

    try {

        makeLinePush(req.body.content);

    }
    catch (e) {

        console.error(e);

    }

    res.json(req.body);
    res.end();

});

app.listen(process.env.PORT || 8080, () => {

    console.log('Now listening...');

});
