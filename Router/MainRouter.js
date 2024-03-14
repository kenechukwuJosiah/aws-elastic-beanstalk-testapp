const router = require('express').Router();
const { CreateProjectManager } = require('../Controller/MainController');

router.post('/create-managers', CreateProjectManager);


module.exports = router;