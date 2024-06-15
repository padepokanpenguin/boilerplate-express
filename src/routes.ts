import express from 'express';
import exampleRoute from './api/example/exampleRoute';

const route = express.Router()

const routes: express.Router[] = [
    exampleRoute
]

routes.forEach(r=>{
    route.use(r)
})

export default routes