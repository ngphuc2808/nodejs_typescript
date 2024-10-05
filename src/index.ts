import express from 'express'

import usersRouter from '@/routes/users.routes'
import databaseService from '@/services/database.services'
import { defaultErrorHandler } from '@/middlewares/error.middlewares'

databaseService.connect()
const app = express()
const port = 8080

app.use(express.json())

app.use('/users', usersRouter)
app.use(defaultErrorHandler)

app.listen(port, () => console.log(`[server]: Server is running at http://localhost:${port}`))
