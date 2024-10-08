import express from 'express'

import usersRouter from '@/routes/users.routes'
import databaseService from '@/services/database.services'
import { defaultErrorHandler } from '@/middlewares/error.middlewares'
import { envConfig } from '@/constants/config'

databaseService.connect()
const port = envConfig.port

const app = express()

app.use(express.json())
app.use('/users', usersRouter)
app.use(defaultErrorHandler)

app.listen(port, () => console.log(`[server]: Server is running at http://localhost:${port}`))
