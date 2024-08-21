import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './user/entities/user.entity';
import { BlogModule } from './blog/blog.module';
import { BlogEntity } from './blog/entities/blog.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes the ConfigModule available globally
      envFilePath: '.env', // path to your .env file
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', // or your preferred database type
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DATABASE'),
        entities: [
          UserEntity,
          BlogEntity
        ],
        synchronize: true, // set to false in production
      }),
    }),
    UserModule,
    BlogModule
  ]
})
export class AppModule {}
