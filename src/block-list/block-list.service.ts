import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { AddBlockItemDto, BlockListQueryDto } from './dto';

@Injectable()
export class BlockListService {
  constructor(private db: DbService) {}

  create(userId: number) {
    return this.db.blockList.create({
      data: { ownerId: userId },
    });
  }

  getByUserId(userId: number, query: BlockListQueryDto) {
    /* 
      Возвращаю список для пользователя вместе со связанными с ним элементами. 
      При этом, элементы должны содержать в себе запрос из query без учёта регистра.
      Элементы отсортированы по дате в порядке убывания (сначала новые).
    */
    return this.db.blockList.findUniqueOrThrow({
      where: { ownerId: userId },
      include: {
        items: {
          where: { data: { contains: query.q, mode: 'insensitive' } },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async addItem(userId: number, data: AddBlockItemDto) {
    const { id: blockListId } = await this.db.blockList.findUniqueOrThrow({
      where: { ownerId: userId },
    });

    return this.db.blockItem.create({
      data: {
        blockListId,
        ...data,
      },
    });
  }

  async removeItem(userId: number, itemId: number) {
    const { id: blockListId } = await this.db.blockList.findUniqueOrThrow({
      where: { ownerId: userId },
    });

    return this.db.blockItem.delete({
      where: {
        id: itemId,
        blockListId,
      },
    });
  }
}
