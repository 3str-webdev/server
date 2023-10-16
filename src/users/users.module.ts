import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { UsersService } from './users.service';
import { AccountModule } from 'src/account/account.module';

@Module({
  imports: [DbModule, AccountModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
