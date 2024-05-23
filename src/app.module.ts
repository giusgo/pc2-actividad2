import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';

import { HealthModule } from "@core/health/health.module";
import { LoggerModule } from "@core/logger/logger.module";
import { DataSourceConfig } from "./config/data.source";
import { ApiModule } from "./api/api.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true, envFilePath: `.env` }),
    TypeOrmModule.forRoot({...DataSourceConfig}),
    LoggerModule,
    HealthModule,
    ApiModule
  ],
})
export class AppModule {}
