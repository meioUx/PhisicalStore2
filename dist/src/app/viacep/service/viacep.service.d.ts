import { HttpService } from '@nestjs/axios';
import { IReturnViaCep } from '../interface/returnViaCep.interface';
export declare class ViacepService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getCepDataByViaCep(cep: string): Promise<IReturnViaCep>;
}
