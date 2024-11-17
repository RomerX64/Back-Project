import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/users.module';
import { ProductModule } from './modules/products/products.module';
import { OrderModule } from './modules/orders/orders.module';
import { AuthModule } from './modules/auth/auth.module';
@Module({
  imports: [UserModule, ProductModule, OrderModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
