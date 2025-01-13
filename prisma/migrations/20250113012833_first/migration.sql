-- CreateTable
CREATE TABLE "Store" (
    "storeId" TEXT NOT NULL PRIMARY KEY,
    "storeName" TEXT NOT NULL,
    "content" TEXT,
    "takeOutInStore" BOOLEAN DEFAULT true,
    "shippingTimeInDays" INTEGER,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT NOT NULL,
    "address3" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "telephoneNumber" TEXT NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "type" TEXT NOT NULL
);
