const router = require("express").Router();
const UrlShortenController = require("../controllers/urlShorten");

router.get('/:code', UrlShortenController.getOriginalUrl);
router.post('/api/createShortenUrl', UrlShortenController.createShortenUrl);
router.post('/api/updateStats', UrlShortenController.updateStats);
router.get('/api/getStats', UrlShortenController.getStats);

module.exports = router;