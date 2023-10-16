import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetSessionInfoDto } from 'src/auth/dto';
import { SessionInfo } from 'src/auth/session-info.decorator';
import { AccountService } from './account.service';
import { AccountDto, PatchAccountDto } from './dto';

@Controller('account')
@UseGuards(AuthGuard)
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: AccountDto,
  })
  async getAccount(
    @SessionInfo() session: GetSessionInfoDto,
  ): Promise<AccountDto> {
    console.log(session);
    return this.accountService.getAccount(session.id);
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: AccountDto,
  })
  async patchAccount(
    @Body() body: PatchAccountDto,
    @SessionInfo() session: GetSessionInfoDto,
  ): Promise<AccountDto> {
    return this.accountService.patchAccount(session.id, body);
  }
}
