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
        // Test to create a new Game info
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
        // Test to get all Game info
        it('should get all the Game info', (done) => {
            chai.request(server)
                .get(API_URL)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.data.should.be.a('array')
                    done()
                })
        })

        // Test to get a single Game info
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
    })
})
