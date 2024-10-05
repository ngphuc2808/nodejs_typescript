import { MongoClient, Db, Collection } from 'mongodb'
import dotenv from 'dotenv'

import User from '@/models/schemas/User.schema'

dotenv.config()

class DatabaseService {
  private client: MongoClient
  private db: Db
  private uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@expresstypescript.0lhru.mongodb.net/?retryWrites=true&w=majority&appName=ExpressTypescript`

  constructor() {
    this.client = new MongoClient(this.uri)
    this.db = this.client.db(process.env.DB_NAME)
  }

  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.error('Unable to ping your deployment. Check your connection: ', error)
    }
  }

  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USERS_COLLECTION!)
  }
}

const databaseService = new DatabaseService()

export default databaseService
