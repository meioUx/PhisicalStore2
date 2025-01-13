"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const faker_1 = require("@faker-js/faker");
const prisma = new client_1.PrismaClient();
const states = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];
const cepsPorEstado = {
    AC: [
        "69900-000", "69908-010", "69910-050", "69900-300", "69900-500"
    ],
    AL: [
        "57000-000", "57051-010", "57062-180", "57073-030", "57072-070"
    ],
    AP: [
        "68900-000", "68903-800", "68901-100", "68905-040", "68906-010"
    ],
    AM: [
        "69000-000", "69062-010", "69081-970", "69058-590", "69082-740"
    ],
    BA: [
        "40000-000", "41150-190", "41650-000", "42310-100", "42800-000"
    ],
    CE: [
        "60000-000", "60130-180", "60410-050", "60730-050", "60830-370"
    ],
    DF: [
        "70000-000", "70360-150", "70910-500", "71500-000", "72725-140"
    ],
    ES: [
        "29000-000", "29100-500", "29020-230", "29100-290", "29055-500"
    ],
    GO: [
        "74000-000", "74540-200", "74680-030", "74310-020", "74540-380"
    ],
    MA: [
        "65000-000", "65070-000", "65060-200", "65110-000", "65085-220"
    ],
    MT: [
        "78000-000", "78050-100", "78110-000", "78300-000", "78400-000"
    ],
    MS: [
        "79000-000", "79002-500", "79104-000", "79035-050", "79300-000"
    ],
    MG: [
        "30100-000", "31230-000", "31310-000", "31350-280", "33000-000"
    ],
    PA: [
        "66000-000", "66610-000", "68700-000", "68500-000", "68800-000"
    ],
    PB: [
        "58000-000", "58103-000", "58200-000", "58300-000", "58062-130"
    ],
    PR: [
        "80000-000", "81710-180", "82900-000", "84000-000", "85810-000"
    ],
    PE: [
        "50000-000", "51010-010", "52000-000", "55000-000", "53160-100"
    ],
    PI: [
        "64000-000", "64025-000", "64200-000", "64100-000", "64015-000"
    ],
    RJ: [
        "20000-000", "21110-000", "22030-010", "22765-100", "23900-000"
    ],
    RN: [
        "59000-000", "59100-000", "59200-000", "59300-000", "59062-130"
    ],
    RS: [
        "90000-000", "91010-000", "93000-000", "93200-000", "94000-000"
    ],
    RO: [
        "76800-000", "76830-100", "76805-200", "76900-000", "76915-000"
    ],
    RR: [
        "69300-000", "69301-000", "69305-000", "69310-000", "69311-000"
    ],
    SC: [
        "88000-000", "88100-000", "89000-000", "89200-000", "89300-000"
    ],
    SP: [
        "01000-000", "01200-000", "01300-000", "01400-000", "02120-000"
    ],
    SE: [
        "49000-000", "49100-000", "49060-000", "49040-000", "49130-000"
    ],
    TO: [
        "77000-000", "77001-000", "77011-000", "77015-000", "77025-000"
    ]
};
async function createStores() {
    for (let state of states) {
        for (let i = 0; i < 2; i++) {
            const storeName = faker_1.faker.company.name();
            const type = i % 2 === 0 ? 'Loja' : 'PDV';
            const city = faker_1.faker.location.city();
            const address1 = faker_1.faker.location.streetAddress();
            const postalCode = cepsPorEstado[state][Math.floor(Math.random() * 4)];
            const latitude = faker_1.faker.location.latitude({ min: -33, max: 5 }).toString();
            const longitude = faker_1.faker.location.longitude({ min: -70, max: 30 }).toString();
            const telephoneNumber = faker_1.faker.phone.number();
            const emailAddress = faker_1.faker.internet.email();
            const content = faker_1.faker.lorem.sentence();
            await prisma.store.create({
                data: {
                    storeName,
                    content,
                    takeOutInStore: false,
                    shippingTimeInDays: (Math.floor(Math.random() * 13) + 1),
                    latitude,
                    longitude,
                    address1,
                    address2: faker_1.faker.location.secondaryAddress(),
                    address3: faker_1.faker.location.secondaryAddress(),
                    city,
                    district: faker_1.faker.location.streetAddress(),
                    state,
                    country: 'Brasil',
                    postalCode,
                    telephoneNumber,
                    emailAddress,
                    type,
                },
            });
            console.log(`Loja ${storeName} criada em ${state}`);
        }
    }
}
async function main() {
    await createStores();
    console.log('Seed realizado com sucesso!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map