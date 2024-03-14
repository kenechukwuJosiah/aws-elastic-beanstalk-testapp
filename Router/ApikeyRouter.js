const router = require('express').Router();
const { genApiKey } = require('../Controller/ApiKeyController');

router.post('/generate-apikey', genApiKey);


module.exports = router;