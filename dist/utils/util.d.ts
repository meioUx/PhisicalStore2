interface IHaversine {
    origin: {
        lat: string;
        long: string;
    };
    dest: {
        lat: string;
        long: string;
    };
}
export declare function haversine(data: IHaversine): boolean;
export declare function randomDelivery(): {
    prazo: string;
    prize: string;
    description: string;
};
export {};
