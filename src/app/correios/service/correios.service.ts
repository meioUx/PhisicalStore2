import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { IReturnCorreiosFrete } from '../interface/returnCorreiosFrete.interface';
import { lastValueFrom } from 'rxjs';
import { ISendCorreiosFrete } from '../interface/sendCorreiosFrete.interface';

@Injectable()
export class CorreiosService {
    constructor(private readonly httpService:HttpService){}

    async getDeliveryPricesByCorreios(data:ISendCorreiosFrete):Promise<IReturnCorreiosFrete[]>{
        const url = 'https://www.correios.com.br/@@precosEPrazosView'
        const response = await lastValueFrom(this.httpService.post(url, data))
        return response.data;
    }
}
