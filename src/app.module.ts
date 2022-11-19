import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PizzaModule } from './pizza/pizza.module';
import { PizzaEntity } from './pizza/entity/pizza.entity';
import { DrinkModule } from './drink/drink.module';
import { DrinkEntity } from './drink/entity/drink.entity';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './user/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '5940530bbbb',
      database: 'pizza',
      entities: [PizzaEntity, DrinkEntity, UserEntity],
      synchronize: true,
    }),
    UserModule,
    PizzaModule,
    DrinkModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
