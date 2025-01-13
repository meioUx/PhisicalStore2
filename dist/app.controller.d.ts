import { AppService } from "./app.service";
import { CorreiosService } from './app/correios/service/correios.service';
export declare class AppController {
    private readonly appService;
    private readonly correios;
    constructor(appService: AppService, correios: CorreiosService);
    listAll(): import(".prisma/client").Prisma.PrismaPromise<{
        storeId: string;
        storeName: string;
        content: string | null;
        takeOutInStore: boolean | null;
        shippingTimeInDays: number | null;
        latitude: string;
        longitude: string;
        address1: string;
        address2: string;
        address3: string;
        city: string;
        district: string;
        state: string;
        country: string;
        postalCode: string;
        telephoneNumber: string;
        emailAddress: string;
        type: string;
    }[]>;
    storeByCep(cep: string, offset: number, limit: number): Promise<any>;
    storeById(id: string): import(".prisma/client").Prisma.Prisma__StoreClient<{
        storeId: string;
        storeName: string;
        content: string | null;
        takeOutInStore: boolean | null;
        shippingTimeInDays: number | null;
        latitude: string;
        longitude: string;
        address1: string;
        address2: string;
        address3: string;
        city: string;
        district: string;
        state: string;
        country: string;
        postalCode: string;
        telephoneNumber: string;
        emailAddress: string;
        type: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    storeByState(state: string): Promise<any>;
}
