let mongoose = require('mongoose');

// Setup schema
let gameSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    platform: String,
    owned: Boolean,
    played: Boolean,
    rating: Number
});

// Export Game model
let Game = module.exports = mongoose.model('game', gameSchema);
module.exports.get = function (callback, limit) {
    Game.find(callback).limit(limit);
}
