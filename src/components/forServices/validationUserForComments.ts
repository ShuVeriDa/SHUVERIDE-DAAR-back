import { ForbiddenException } from '@nestjs/common';

export const validationUser = async (
  id: string,
  userId: string,
  current: any,
) => {
  const comment = await current.findOne(id);

  if (comment.user.id !== userId) {
    throw new ForbiddenException('No access to this comment');
  }
};
