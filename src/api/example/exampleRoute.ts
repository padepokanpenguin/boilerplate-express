import express from "express"
import exampleController from "./exampleController"

const app = express.Router()

class ExampleRoutes {
    public routes = (): express.Router => {
        app.get('/v1/get-users', exampleController.UserController)
        return app
    }
}

export default new ExampleRoutes().routes()