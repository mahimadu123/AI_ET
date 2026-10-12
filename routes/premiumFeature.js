const express = require('express');
const premiumController = require('../controllers/premiumFeature');

const router = express.Router();

// GET /premium/showLeaderBoard - లీడర్‌బోర్డ్ డేటాను ఫెచ్ చేయడానికి
router.get('/showLeaderBoard', premiumController.getUserLeaderBoard);

module.exports = router;