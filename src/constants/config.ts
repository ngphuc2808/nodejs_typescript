import { config } from 'dotenv'
import fs from 'fs'
import path from 'path'

const env = process.env.NODE_ENV

const envFilename = `.env.${env}`

if (!env) {
  console.log(`Bạn chưa cung cấp biến môi trường NODE_ENV (ví dụ: development, production)`)
  console.log(`Phát hiện NODE_ENV = ${env}`)
  process.exit(1)
}
console.log(`Phát hiện NODE_ENV = ${env}, vì thế app sẽ dùng file môi trường là ${envFilename}`)
if (!fs.existsSync(path.resolve(envFilename))) {
  console.log(`Không tìm thấy file môi trường ${envFilename}`)
  console.log(`Lưu ý: App không dùng file .env, ví dụ môi trường là development thì app sẽ dùng file .env.development`)
  console.log(`Vui lòng tạo file ${envFilename} và tham khảo nội dung ở file .env.example`)
  process.exit(1)
}
config({
  path: envFilename
})

export const isProduction = env === 'production'

export const envConfig = {
  port: process.env.PORT!,
  dbName: process.env.DB_NAME!,
  dbUsername: process.env.DB_USERNAME!,
  dbPassword: process.env.DB_PASSWORD!,
  jwtSecretAccessToken: process.env.JWT_SECRET_ACCESS_TOKEN!,
  jwtSecretRefreshToken: process.env.JWT_SECRET_REFRESH_TOKEN!,
  dbTweetsCollection: process.env.DB_TWEETS_COLLECTION!,
  dbUsersCollection: process.env.DB_USERS_COLLECTION!,
  dbRefreshTokensCollection: process.env.DB_REFRESH_TOKENS_COLLECTION!,
  passwordSecret: process.env.PASSWORD_SECRET!,
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN!,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN!
}
