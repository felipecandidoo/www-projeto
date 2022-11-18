const { request } = require('../config/server')
let database = require('../data/database')

function getGame(id) {
    return database.find(game => game.id === +id)
}

module.exports = (router) => {

    const urlBase = '/games'

    router.get(urlBase, (request, response) => { 
        response.json(database)
    })

    router.get(urlBase + '/search', (req, res) =>{
        const filters = req.query
        const filteredUsers = database.filter(game =>{
            let isValid = true
            for(key in filters){
                console.log(key, game[key].toString().toLowerCase(), filters[key].toString().toLowerCase())                
                isValid = isValid && game[key].toString().toLowerCase().includes(filters[key].toString().toLowerCase())
            }
            return isValid
        })
        res.json(filteredUsers)
    })

    router.get(urlBase + '/:id', (req, res) => {
        const id = req.params.id
        const game = getGame(id)
        res.json(game)
    })

    router.post(urlBase, (request, response) => {

        const newGame = {
            id: database.length + 1,
            name: request.body.name,
            genre: request.body.genre,
            price: request.body.price,
            description: request.body.description
        }

        database.push(newGame)
        response.status(201).send(newGame)
    })

    router.put(urlBase, (request, response) => {
 
        const game = getGame(request.body.id)
        if(game == undefined){
            response.status(204).send() 
        }

        game.name = request.body.name
        game.genre = request.body.genre
        game.price = request.body.price
        game.description = request.body.description

        response.json(game)
    })

    router.delete(urlBase + '/:id', (request, response) => {
 
        const newList = database.filter(item => item.id != request.params.id)
        database = newList
        response.status(200).send('Game removed!')
    })
}

