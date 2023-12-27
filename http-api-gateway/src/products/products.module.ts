import { Module } from "@nestjs/common";
import { NatsClientModule } from "src/nats-client/nats-client.module";
import { ProductsController } from "./products.controller";

@Module({
    imports: [NatsClientModule],
    controllers: [ProductsController],
    providers: [],
})
export class ProductsModule {}