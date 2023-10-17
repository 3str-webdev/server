import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { BlockListController } from './block-list.controller';
import { BlockListService } from './block-list.service';

@Module({
  imports: [DbModule],
  providers: [BlockListService],
  controllers: [BlockListController],
  exports: [BlockListService],
})
export class BlockListModule {}
