import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/users.module';
@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
