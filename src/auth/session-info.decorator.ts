import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const SessionInfo = createParamDecorator((_, ctx: ExecutionContext) => {
  return ctx.switchToHttp().getRequest().session;
});
