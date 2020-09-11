const validUrl = require('valid-url');
const UrlShorten = require('../models/UrlShorten');
const generateId = require("../utils/index");
const moment = require("moment");
const UrlShortenController = {};

UrlShortenController.getOriginalUrl = async (req, res) => {
    const urlCode = req.params.code;
    const item = await UrlShorten.findOne({ urlCode: urlCode });
    if (item) {
        return res.redirect(item.originalUrl);
    } else {
        return res.send({ message: "Invalid URL Code" });
    }
}

UrlShortenController.createShortenUrl = async (req, res) => {
    const { shortBaseUrl, originalUrl } = req.body;

    const updatedAt = new Date();
    const queryOptions = { originalUrl };
    if (validUrl.isUri(originalUrl)) {
        let urlData;
        try {
            if (!urlData) {
                urlData = await UrlShorten.findOne(queryOptions).exec();
            }

            if (urlData) {
                res.status(200).json(urlData);
            } else {
                const urlCode = generateId(5);
                shortUrl = shortBaseUrl + '/' + urlCode;
                const itemToBeSaved = { originalUrl, shortUrl, urlCode, updatedAt, count: 0, ipAddress: [], country: [] };

                const item = new UrlShorten(itemToBeSaved);
                await item.save();
                res.status(200).json(itemToBeSaved);
            }
        } catch (err) {
            console.log(err);
            res.status(401).json('Invalid User Id');
        }
    } else {
        return res.status(401).json('Invalid Original Url.');
    }
};

UrlShortenController.getStats = async (req, res) => {
    const stats = await UrlShorten.find({});
    res.send(stats);
}

UrlShortenController.updateStats = async (req, res) => {
    try {
        const { count, ipAddress, country, urlCode, createdAt } = req.body;
        var createdDate = moment(createdAt);
        var currentDate = moment(moment());
        const dateDiff = currentDate.diff(createdDate, 'days');
        const status = dateDiff > 30 ? 'expired' : 'active';
        const hello = await UrlShorten.updateOne({ urlCode }, { count: count, status, $push: { ipAddress: ipAddress, country: country } });
        res.send({ message: "Updated successfully" });
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: "Something went wrong" });
    }
}

module.exports = UrlShortenController