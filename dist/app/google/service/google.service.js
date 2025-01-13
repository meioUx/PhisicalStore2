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
exports.GoogleService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let GoogleService = class GoogleService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getLocationByCep(cep) {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&key=${process.env.GOOGLE_API_KEY}`;
        const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get(url));
        return response.data;
    }
    async getDistanceByLatLong(origin, dest) {
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${dest.lat},${dest.long}&origins=${origin.lat},${origin.long}&units=metrics&key=${process.env.GOOGLE_API_KEY}`;
        const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get(url));
        return response.data;
    }
};
exports.GoogleService = GoogleService;
exports.GoogleService = GoogleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], GoogleService);
//# sourceMappingURL=google.service.js.map