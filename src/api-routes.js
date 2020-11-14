let router = require('express').Router();
let gameController = require('./gameController');

// Default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API is Working :)',
        message: 'Welcome to your game-manager app!'
    });
});

router.route('/games')
    .get(gameController.getAll)
    .post(gameController.new)
    .delete(gameController.deleteAll);

router.route('/games/:game_id')
    .get(gameController.getSingle)
    .put(gameController.update)
    .delete(gameController.deleteSingle);

module.exports = router;
