import { ForbiddenException } from '@nestjs/common';

export const validationUser = async (
  id: string,
  userId: string,
  current: any,
  isAdmin?: boolean
) => {
  const comment = await current.findOne(id);

  if (comment.user.id !== userId && !isAdmin) {
    throw new ForbiddenException('No access to this comment');
  }
};
