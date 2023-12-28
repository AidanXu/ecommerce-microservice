import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';

@Module({
  imports: [],
  controllers: [CartController],
  providers: [],
})
export class cartModule {}
