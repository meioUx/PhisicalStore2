import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './app/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { CorreiosService } from './app/correios/service/correios.service';
import { ViacepService } from './app/viacep/service/viacep.service';
import { GoogleService } from './app/google/service/google.service';

@Module({
  imports: [PrismaModule, HttpModule],
  controllers: [AppController],
  providers: [AppService, CorreiosService, ViacepService, GoogleService],
})
export class AppModule {}
