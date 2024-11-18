import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/users.module';
import { ProductModule } from './modules/products/products.module';
import { OrderModule } from './modules/orders/orders.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load:[typeOrmConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('typeorm')
    }),
    UserModule, ProductModule, OrderModule, AuthModule,   
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
