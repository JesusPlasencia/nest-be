import { Injectable, Inject } from "@nestjs/common";
import { ConfigService, ConfigType } from "@nestjs/config";
import config from "./config";

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apiKey: string,
    // @Inject('TASKS') private tasks: any[],
    @Inject(config.KEY) private configService: ConfigType<typeof config>
  ) {}
  getHello(): string {
    const apiKey = this.configService.apiKey;
    const databaseName = this.configService.database.name;
    const databasePort = this.configService.database.port;
    return `Hello ${apiKey} your db is ${databaseName} with port ${databasePort}.`;
  }
}
