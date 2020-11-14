// Import game model
Game = require('./gameModel');

// Retrieve all game info
exports.getAll = function (req, res) {
    Game.get(function (err, games) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "All Game info retrieved successfully",
            data: games
        });
    });
};

// Create single game info
exports.new = function (req, res) {
    var game = new Game();
    game.title = req.body.title ? req.body.title : game.title;
    game.platform = req.body.platform;
    game.owned = req.body.owned;
    game.played = req.body.played;
    game.rating = req.body.rating;
    // save the game and check for errors
    game.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'New Game info created!',
            data: game
        });
    });
};

// Retrieve single game info
exports.getSingle = function (req, res) {
    Game.findById(req.params.game_id, function (err, game) {
        if (err)
            res.send(err);
        res.json({
            message: 'Game info loading..',
            data: game
        });
    });
};
// Update game info
exports.update = function (req, res) {
    Game.findById(req.params.game_id, function (err, game) {
        if (err)
            res.send(err);
        game.title = req.body.title ? req.body.title : game.title;
        game.platform = req.body.platform;
        game.owned = req.body.owned;
        game.played = req.body.played;
        game.rating = req.body.rating;
        // save the game and check for errors
        game.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Game info updated',
                data: game
            });
        });
    });
};

// Delete single game info
exports.deleteSingle = function (req, res) {
    Game.remove({
        _id: req.params.game_id
    }, function (err, game) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Game info deleted'
        });
    });
};

// Delete all game info
exports.deleteAll = function (req, res) {
    Game.remove({}, function (err) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'All Game info deleted'
        });
    });
};
