import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/users.module';
import { ProductModule } from './modules/products/products.module';
import { OrderModule } from './modules/orders/orders.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { CloudinaryConfig } from './config/cloudinary';
import { CloudinaryService } from './common/cloudinary.service';
import { JwtModule } from '@nestjs/jwt';
import { PreloadService } from './helpers/preLoad.service';
import { Category } from './modules/products/categorys.entity';
import { Product } from './modules/products/product.entity';
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

    JwtModule.register({
      global:true,
      signOptions:{ expiresIn:'24h' },
      secret: process.env.JWT_SECRET
    }),

    TypeOrmModule.forFeature([Category, Product])

  ],
  controllers: [],
  providers: [CloudinaryConfig, CloudinaryService, PreloadService],
})
export class AppModule {}
