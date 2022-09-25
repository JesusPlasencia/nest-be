import { Module, Global } from "@nestjs/common";
import { MongoClient } from 'mongodb';
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigType } from "@nestjs/config";
import config from '../../config'

const API_KEY = "1245354";

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync(
      {
        useFactory: async (configService: ConfigType<typeof config>) => {
          //Vars
          const { connection, dbName, host, password, user } = configService.mongo;
          return {
            uri: `${connection}://${host}`,
            user,
            pass: password,
            dbName
          };
        },
        inject: [config.KEY]
      }
    ),
  ],
  providers: [
    {
      provide: "API_KEY",
      useValue: API_KEY,
    },
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, dbName, host, password, user } = configService.mongo;
        const uri = `${connection}://${user}:${password}@${host}/?directConnection=true&authMechanism=DEFAULT`;
        const client = new MongoClient(uri);
        await client.connect();

        const database = client.db(dbName);
        return database;
      },
      inject: [config.KEY]
    },
  ],
  exports: ["API_KEY", "MONGO", MongooseModule],
})
export class DatabaseModule { }
