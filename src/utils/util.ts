interface IHaversine{
    origin:{
        lat:string,
        long:string
    },
    dest:{
        lat:string,
        long:string
    }
}

export function haversine(data:IHaversine): boolean {
    const {origin, dest} = data
    const lat1 = parseFloat(origin.lat)
    const lon1 = parseFloat(origin.long)
    const lat2 = parseFloat(dest.lat)
    const lon2 = parseFloat(dest.long)
    const R = 6371;
    const dlat = (lat2 - lat1) * Math.PI / 180;
    const dlon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dlat / 2) * Math.sin(dlat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dlon / 2) * Math.sin(dlon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c)<=50;
}

export function randomDelivery(){
    const list = [
        {
            prazo:'1 dia util',
            prize:'R$ 15,00',
            description:'Motoboy'
        },
        {
            prazo:'3 dia util',
            prize:'R$ 15,00',
            description:'Motoboy'
        },
        {
            prazo:'6 dia util',
            prize:'R$ 15,00',
            description:'Motoboy'
        },
        {
            prazo:'2 dia util',
            prize:'R$ 15,00',
            description:'Motoboy'
        }
    ]

    return list[Math.floor(Math.random() * 3)]
}