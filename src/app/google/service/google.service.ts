import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { IReturnGeocode } from '../interface/returnGeocode.interface';
import { lastValueFrom } from 'rxjs';
import { IReturnDestination } from '../interface/returnDestination.interface';

@Injectable()
export class GoogleService {
    constructor(private readonly httpService:HttpService){}
    
        async getLocationByCep(cep:string):Promise<IReturnGeocode>{
            const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&key=${process.env.GOOGLE_API_KEY}`
            const response = await lastValueFrom(this.httpService.get(url))
            return response.data;
        }

        async getDistanceByCep(originCep:string,destCep:string):Promise<IReturnDestination>{
            const url = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destCep}&origins=${originCep}&units=metrics&key=${process.env.GOOGLE_API_KEY}`
            const response = await lastValueFrom(this.httpService.get(url))
            return response.data;
        }
}
