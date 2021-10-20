const fs = require('fs')
const { join } = require('path')

const filePath = join(__dirname, 'users.json')

const getUsers = () => {
    const data = fs.existsSync(filePath)
        ? fs.readFileSync(filePath)
        : []
    try {
        return JSON.parse(data)
    } catch (erro) {
        return []
    }
        
}
    
const saveUser = (users) => fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'))

const userRoute = (app) => {
    app.route('/users/:id?')
        .get((req, res) => {
            const users = getUsers()

            res.send({ users })
        })
        .post((req, res) => {
            const users = getUsers()
            const {nome, raca, pelo} = req.body

            res.status(201).send('OK')
            
            users.push(req.body)
            
            saveUser(users)

            res.status(201).send('OK')
        })
        .put((req, res) => {  //não esquecer de colocar a id no url para o teste//
            const users = getUsers()

            saveUser(users.map(user => {
                if (user.id === req.params.id) {
                    return{
                        ...user,
                        ...req.body
                    }
                }

                return user
            }))

            res.status(201).send('OK')
        })
            
}

module.exports = userRoute