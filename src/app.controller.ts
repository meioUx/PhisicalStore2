import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from "./app.service";
import { CorreiosService } from './app/correios/service/correios.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService, private readonly correios:CorreiosService) {}

	@Get('listAll/')
	listAll(@Query('page') offset: number, @Query('limit') limit: number) {
		return this.appService.findAll(offset, limit);
	}

	@Get('storeByCep/:cep')
	storeByCep(@Param('cep') cep: string, @Query('page') offset: number, @Query('limit') limit: number) {
		return this.appService.findByCep(cep, offset, limit);
	}

	@Get('storeById/:id')
	storeById(@Param('id') id: string) {
		return this.appService.findById(id);
	}

	@Get('storeByState/:state')
	storeByState(@Param('state') state: string, @Query('page') offset: number, @Query('limit') limit: number) {
		return this.appService.findByState(state, offset, limit);
	}
}
