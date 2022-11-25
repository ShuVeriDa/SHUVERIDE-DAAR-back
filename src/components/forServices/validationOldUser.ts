import { BadRequestException } from '@nestjs/common';
import { AuthDto } from '../../auth/dto/auth.dto';

export const validationOldUser = async (
  dto: string,
  repos,
  variant: 'email' | 'nickName',
) => {
  if (variant === 'email') {
    const oldUserEmail = await repos.repository.findOneBy({ email: dto });
    if (oldUserEmail)
      throw new BadRequestException(
        `User with this ${variant} is already in the system`,
      );
  }
  if (variant === 'nickName') {
    const oldUserNickName = await repos.repository.findOneBy({ nickName: dto });
    if (oldUserNickName)
      throw new BadRequestException(
        `User with this ${variant} is already in the system`,
      );
  }
};
