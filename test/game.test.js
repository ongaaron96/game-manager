const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src/api')
const API_URL = '/.netlify/functions/api/games'

chai.should()
chai.use(chaiHttp)

Game = require('../src/gameModel');

describe('Game-manager API', () => {
    let dummyGame = new Game()
    dummyGame.title = 'Test Dummy title'
    dummyGame.platform = 'Test Dummy platform'
    dummyGame.owned = true
    dummyGame.played = false
    dummyGame.rating = 99
    let dummyGameId

    // Do POST first to add in a dummy Game info
    describe('POST /', () => {
        // 1. Test to create a new Game info
        it('should get all the Game info', (done) => {
            chai.request(server)
                .post(API_URL)
                .send(dummyGame)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.data.should.be.a('object')
                    res.body.data.should.have.property('title')
                    res.body.data.should.have.property('platform')
                    res.body.data.should.have.property('owned')
                    res.body.data.should.have.property('played')
                    res.body.data.should.have.property('rating')
                    res.body.data.should.have.property('_id')
                    dummyGameId = res.body.data._id
                    done()
                })
        })
    })

    describe('GET /', () => {
        // 2. Test to get all Game info
        it('should get all the Game info', (done) => {
            chai.request(server)
                .get(API_URL)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.data.should.be.a('array')
                    done()
                })
        })

        // 3. Test to get a single Game info (SUCCESS)
        it('should get a single Game info', (done) => {
            chai.request(server)
                .get(API_URL + '/' + dummyGameId)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.data.should.be.a('object')
                    res.body.data.should.have.property('title').eq(dummyGame.title)
                    res.body.data.should.have.property('platform').eq(dummyGame.platform)
                    res.body.data.should.have.property('owned').eq(dummyGame.owned)
                    res.body.data.should.have.property('played').eq(dummyGame.played)
                    res.body.data.should.have.property('rating').eq(dummyGame.rating)
                    res.body.data.should.have.property('_id').eq(dummyGameId)
                    done()
                })
        })

        // 3. Test to get a single Game info (FAIL)
        it('should fail getting a single Game info', (done) => {
            // no negative ids
            const failGameId = "-1"
            chai.request(server)
                .get(API_URL + '/' + failGameId)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.be.a('object')
                    res.body.should.have.property('message').eq("Game not found")
                    res.body.should.have.property('game_id').eq(failGameId)
                    done()
                })
        })
    })

    describe('PUT /', () => {
        const newDummyRating = 123
        let newDummyGame = dummyGame
        newDummyGame.rating = newDummyRating

        // 4. Test to modify a Game info (SUCCESS)
        it('should modify the Game info', (done) => {
            chai.request(server)
                .put(API_URL + '/' + dummyGameId)
                .send(newDummyGame)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.data.should.be.a('object')
                    res.body.data.should.have.property('title').eq(dummyGame.title)
                    res.body.data.should.have.property('platform').eq(dummyGame.platform)
                    res.body.data.should.have.property('owned').eq(dummyGame.owned)
                    res.body.data.should.have.property('played').eq(dummyGame.played)
                    res.body.data.should.have.property('rating').eq(newDummyRating)
                    res.body.data.should.have.property('_id').eq(dummyGameId)
                    done()
                })
        })

        // 5. Test to modify a Game info (FAIL)
        it('should fail modifying a Game info', (done) => {
            const failGameId = "-1"
            chai.request(server)
                .put(API_URL + '/' + failGameId)
                .send(newDummyGame)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.be.a('object')
                    res.body.should.have.property('message').eq("Game not found")
                    res.body.should.have.property('game_id').eq(failGameId)
                    done()
                })
        })
    })

    describe('DELETE /', () => {
        // 6. Test to delete a single Game info (SUCCESS)
        it('should delete a single Game info', (done) => {
            chai.request(server)
                .delete(API_URL + '/' + dummyGameId)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('message').eq("Game info deleted")
                    res.body.should.have.property('game_id').eq(dummyGameId)
                    done()
                })
        })

        // 7. Test to delete a single Game info (FAIL)
        it('should fail deleting a single Game info', (done) => {
            const failGameId = "-1"
            chai.request(server)
                .delete(API_URL + '/' + failGameId)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.be.a('object')
                    res.body.should.have.property('message').eq("Game not found")
                    res.body.should.have.property('game_id').eq(failGameId)
                    done()
                })
        })
    })
})
