import { Module } from '@nestjs/common';
import {NotesModule} from "./notes/notes.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [NotesModule, ConfigModule.forRoot(),
  TypeOrmModule.forRoot({
    type :"sqlite",
    database: "notesDB",
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    synchronize: true
  })],
})
export class AppModule {}
