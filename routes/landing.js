let express = require('express');
	router = express.Router({ mergeParams: true });

router.get('/', function(req, res) {
    res.send("Hello World! Welcome to landing page");
});

module.exports = router;