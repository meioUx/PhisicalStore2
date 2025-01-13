"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./app/prisma/prisma.service");
const correios_service_1 = require("./app/correios/service/correios.service");
const viacep_service_1 = require("./app/viacep/service/viacep.service");
const util_1 = require("./utils/util");
const google_service_1 = require("./app/google/service/google.service");
let AppService = class AppService {
    constructor(prisma, correiosService, viacepService, googleServices) {
        this.prisma = prisma;
        this.correiosService = correiosService;
        this.viacepService = viacepService;
        this.googleServices = googleServices;
    }
    create(createPhysicalStoreDto) {
        return this.prisma.store.create({
            data: createPhysicalStoreDto
        });
    }
    findAll() {
        return this.prisma.store.findMany();
    }
    findOne(id) {
        return this.prisma.store.findUnique({
            where: { storeId: id }
        });
    }
    async findByCep(postalCode, offset = 1, limit = 10) {
        const listStores = await this.prisma.store.findMany({
            skip: (offset - 1) * limit,
            take: limit,
        });
        const totalStores = await this.prisma.store.count();
        const { results } = await this.googleServices.getLocationByCep(postalCode);
        const nearbyStores = [];
        const pins = [];
        for (const store of listStores) {
            const distance = await this.googleServices.getDistanceByLatLong({
                lat: store.latitude,
                long: store.longitude
            }, {
                lat: `${results[0].geometry.location.lat}`,
                long: `${results[0].geometry.location.lng}`
            });
            const checkDistance = (0, util_1.haversine)({
                origin: {
                    lat: store.latitude,
                    long: store.longitude
                },
                dest: {
                    lat: `${results[0].geometry.location.lat}`,
                    long: `${results[0].geometry.location.lng}`
                }
            });
            if (checkDistance) {
                if (store.type === 'PDV') {
                    nearbyStores.push({
                        name: store.storeName,
                        city: store.city,
                        postalCode: store.postalCode,
                        type: store.type,
                        distance: distance.rows[0].elements[0].distance.text,
                        value: [(0, util_1.randomDelivery)()]
                    });
                }
            }
            else {
                if (store.type !== 'PDV') {
                    const correiosPrices = await this.correiosService.getDeliveryPricesByCorreios({
                        cepOrigem: store.postalCode,
                        cepDestino: postalCode,
                        altura: '10',
                        comprimento: '20',
                        largura: '15'
                    });
                    nearbyStores.push({
                        name: store.storeName,
                        city: store.city,
                        postalCode: store.postalCode,
                        type: store.type,
                        distance: distance.rows[0].elements[0].distance.text,
                        value: correiosPrices
                    });
                }
            }
            pins.push({
                position: {
                    latitude: store.latitude,
                    longitude: store.longitude,
                },
                title: store.storeName
            });
        }
        return {
            stores: nearbyStores,
            pins,
            limit,
            offset,
            total: totalStores
        };
    }
    findById(id) {
        return this.prisma.store.findUnique({
            where: { storeId: id }
        });
    }
    async findByState(state, offset = 1, limit = 10) {
        const listStores = await this.prisma.store.findMany({
            skip: (offset - 1) * limit,
            take: limit,
            where: { state }
        });
        const totalStores = await this.prisma.store.count({ where: { state } });
        return {
            stores: listStores,
            limit,
            offset,
            total: totalStores
        };
    }
    update(id, updatePhysicalStoreDto) {
        return this.prisma.store.update({
            where: { storeId: id },
            data: updatePhysicalStoreDto
        });
    }
    remove(id) {
        return this.prisma.store.delete({
            where: { storeId: id }
        });
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, correios_service_1.CorreiosService, viacep_service_1.ViacepService, google_service_1.GoogleService])
], AppService);
//# sourceMappingURL=app.service.js.map