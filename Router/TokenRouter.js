const router = require('express').Router();

const { CreateProjectManager } = require('../Controller/MainController');
const {genToken, validateToken, test} = require('../Controller/TokenController');

router.post('/generate-token', genToken);
router.post('/post-qualified', validateToken, CreateProjectManager);

module.exports = router;