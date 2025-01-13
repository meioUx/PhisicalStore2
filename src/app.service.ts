import { Injectable } from '@nestjs/common';
import { CreatePhysicalStoreDto } from './dto/create-physical-store.dto';
import { UpdatePhysicalStoreDto } from './dto/update-physical-store.dto';
import { PrismaService } from 'src/app/prisma/prisma.service';
import { CorreiosService } from './app/correios/service/correios.service';
import { ViacepService } from './app/viacep/service/viacep.service';
import { haversine, randomDelivery } from './utils/util';
import { GoogleService } from './app/google/service/google.service';
import { time } from 'console';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService, private readonly correiosService: CorreiosService, private readonly viacepService: ViacepService, private readonly googleServices: GoogleService) { }

  async findAll(offset: number = 1, limit: number = 10) {
    const take: number = Number(limit)
    const totalStores = await this.prisma.store.count()
    const listStores = await this.prisma.store.findMany({
      skip: (offset - 1) * take,
      take,
    });



    return {
      stores: listStores,
      limit,
      offset,
      total: totalStores
    };
  }

  async findByCep(postalCode: string, offset: number = 1, limit: number = 10): Promise<any> {
    const take: number = Number(limit)
    const listStores = await this.prisma.store.findMany({
      skip: (offset - 1) * take,
      take,
    });
    const totalStores = await this.prisma.store.count()
    const viacep = await this.viacepService.getCepDataByViaCep(postalCode)
    const result = await this.googleServices.getLocationByCep(viacep ? `${viacep.logradouro},${viacep.bairro},${viacep.localidade}, ${viacep.estado}` : postalCode)
    const { results } = result

    const nearbyStores = []

    const pins = []

    for (const store of listStores) {
      const distance = await this.googleServices.getDistanceByCep(postalCode, store.postalCode
      )
      const checkDistance = haversine({
        origin: {
          lat: store.latitude,
          long: store.longitude
        },
        dest: {
          lat: `${results[0].geometry.location.lat}`,
          long: `${results[0].geometry.location.lng}`
        }
      })
      if (checkDistance) {
        if (store.type === 'PDV') {
          nearbyStores.push({
            name: store.storeName,
            city: store.city,
            postalCode: store.postalCode,
            type: store.type,
            distance: distance.rows[0].elements[0].distance.text,
            value: [randomDelivery()]
          })
        }
      } else {
        if (store.type !== 'PDV') {
          const correiosPrices = await this.correiosService.getDeliveryPricesByCorreios({
            cepOrigem: store.postalCode,
            cepDestino: postalCode,
            altura: '10',
            comprimento: '20',
            largura: '15'
          })
          nearbyStores.push({
            name: store.storeName,
            city: store.city,
            postalCode: store.postalCode,
            type: store.type,
            distance: !!distance.rows[0].elements[0].distance ? distance.rows[0].elements[0].distance.text : JSON.stringify(distance.rows[0].elements[0]),
            value: correiosPrices
          })
        }
      }
      pins.push({
        position: {
          latitude: store.latitude,
          longitude: store.longitude,
        },
        title: store.storeName
      })
    }

    return {
      stores: nearbyStores,
      pins,
      limit,
      offset,
      total: totalStores
    };
  }

  findById(id: string) {
    return this.prisma.store.findUnique({
      where: { storeId: id }
    });
  }

  async findByState(state: string, offset: number = 1, limit: number = 10): Promise<any> {
    const take: number = Number(limit)
    const listStores = await this.prisma.store.findMany({
      skip: (offset - 1) * take,
      take,
      where: { state }
    });
    const totalStores = await this.prisma.store.count({ where: { state } })
    return {
      stores: listStores,
      limit,
      offset,
      total: totalStores
    };
  }
}
