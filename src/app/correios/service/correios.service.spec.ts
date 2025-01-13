import { Test, TestingModule } from '@nestjs/testing';
import { CorreiosService } from './correios.service';
import { HttpService } from '@nestjs/axios';
import { ISendCorreiosFrete } from '../interface/sendCorreiosFrete.interface';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('CorreiosService', () => {
  let correiosService: CorreiosService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CorreiosService,
        {
          provide:HttpService,
          useValue:{
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    correiosService = module.get<CorreiosService>(CorreiosService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(correiosService).toBeDefined();
    expect(httpService).toBeDefined();
  });

  describe('getDeliveryPricesByCorreios',()=>{
    it('should send data and return list of delivery prices',async ()=>{

      const data: ISendCorreiosFrete = {
        cepDestino:"02011000",
        cepOrigem:"01001000",
        comprimento:"20",
        largura:"15",
        altura:"10"
      }

      const response: AxiosResponse<unknown, any> = {
        data: {},
        headers: {},
        status: 200,
        statusText: 'OK',
        config: undefined
      }

      jest.spyOn(httpService, 'post').mockReturnValueOnce(of(response))

      const result = await correiosService.getDeliveryPricesByCorreios(data)

      console.log(result)

      expect(result.length).toHaveLength(2)

      expect(httpService.post).toHaveBeenCalledTimes(1)
    })
  })
});
