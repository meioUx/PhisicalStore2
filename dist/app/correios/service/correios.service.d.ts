import { HttpService } from '@nestjs/axios';
import { IReturnCorreiosFrete } from '../interface/returnCorreiosFrete.interface';
import { ISendCorreiosFrete } from '../interface/sendCorreiosFrete.interface';
export declare class CorreiosService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getDeliveryPricesByCorreios(data: ISendCorreiosFrete): Promise<IReturnCorreiosFrete[]>;
}
