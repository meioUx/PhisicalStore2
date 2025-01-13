import { HttpService } from '@nestjs/axios';
import { IReturnGeocode } from '../interface/returnGeocode.interface';
import { IReturnDestination } from '../interface/returnDestination.interface';
export declare class GoogleService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getLocationByCep(cep: string): Promise<IReturnGeocode>;
    getDistanceByLatLong(origin: {
        lat: string;
        long: string;
    }, dest: {
        lat: string;
        long: string;
    }): Promise<IReturnDestination>;
}
