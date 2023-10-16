import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { AccountDto, PatchAccountDto } from './dto';

@Injectable()
export class AccountService {
  constructor(private db: DbService) {}
  async getAccount(userId: number): Promise<AccountDto> {
    return this.db.account.findUniqueOrThrow({
      where: { ownerId: userId },
    });
  }

  async create(userId: number) {
    return this.db.account.create({
      data: {
        ownerId: userId,
        isBlockingEnabled: false,
      },
    });
  }

  async patchAccount(
    userId: number,
    patch: PatchAccountDto,
  ): Promise<AccountDto> {
    return this.db.account.update({
      where: { ownerId: userId },
      data: { ...patch },
    });
  }
}
