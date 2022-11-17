import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PizzaModule } from './pizza/pizza.module';
import { PizzaEntity } from './pizza/entity/pizza.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '5940530bbbb',
      database: 'pizza',
      entities: [PizzaEntity],
      synchronize: true,
    }),
    UserModule,
    PizzaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
