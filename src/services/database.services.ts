import { MongoClient, Db, Collection } from 'mongodb'

import User from '@/models/schemas/User.schema'
import RefreshToken from '@/models/schemas/RefreshToken.schema'
import { envConfig } from '@/constants/config'

class DatabaseService {
  private client: MongoClient
  private db: Db
  private uri = `mongodb+srv://${envConfig.dbUsername}:${envConfig.dbPassword}@expresstypescript.0lhru.mongodb.net/?retryWrites=true&w=majority&appName=ExpressTypescript`

  constructor() {
    this.client = new MongoClient(this.uri)
    this.db = this.client.db(envConfig.dbName)
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
    return this.db.collection(envConfig.dbUsersCollection)
  }

  get refreshTokens(): Collection<RefreshToken> {
    return this.db.collection(envConfig.dbRefreshTokensCollection)
  }
}

const databaseService = new DatabaseService()

export default databaseService
