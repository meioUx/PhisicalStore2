import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { IReturnViaCep } from '../interface/returnViaCep.interface';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ViacepService {
    constructor(private readonly httpService:HttpService){}

    async getCepDataByViaCep(cep:string):Promise<IReturnViaCep>{
        const url = `https://viacep.com.br/ws/${cep}/json`
        const response = await lastValueFrom(this.httpService.get(url))
        return response.data;
    }
}
