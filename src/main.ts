import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import data from "../security/config"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(data.PORT, () => {
    console.log(`SERVER LISTNING ON PORT:${data.PORT}...`)
  })
}
bootstrap()
