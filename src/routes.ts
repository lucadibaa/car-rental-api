import { Express } from 'express'
import { createUserHandler, getAllUsersHandler, getUserByIdHandler } from './controllers/user.controller'

const routes = (app: Express) => {
    // users
    app.get('/api/users', getAllUsersHandler)
    app.get('/api/users/:id', getUserByIdHandler)
    app.post('/api/users', createUserHandler)
}

export default routes
