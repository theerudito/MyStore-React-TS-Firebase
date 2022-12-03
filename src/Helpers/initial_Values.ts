import { ICart } from "../interfaces/interfaces";

export const dataConfigStore = {
  nameStore: "",
  propetary: "",
  dni: "",
  direction: "",
  iva: "",
  current: {
    dollar: "USD",
    pesos: "COP",
    euro: "EUR",
  },
  serie1: "",
  serie2: "",
  numfactura: "",
  numnotadeventa: "",
  numproforma: "",
};

export const dataSecuence = {
  numfactura: 0,
  numnotadeventa: 0,
  numproforma: 0,
  serie1: 0,
  serie2: 0,
};

export const credentialStore = {
  nameDB: "",
  dataBase: {
    mysql: "mysql",
    mongodb: "mongodb",
    firebase: "firebase",
  },
  codeActivator: "",
};

export const dataRegister = {
  name: "",
  email: "",
  password: "",
};

export const dataLogin = {
  email: "",
  password: "",
};

export const dataProduct = {
  barcode: "",
  name: "",
  brand: "",
  description: "",
  stock: "",
  price: "",
  image: "",
  desc: "",
};

export const dataClient = {
  ci: "",
  phone: "",
  firstName: "",
  lastName: "",
  direction: "",
  email: "",
  city: "",
};

export const dataClientFinal = {
  ci: "099999999",
  phone: "099999999",
  firstName: "Consumidor",
  lastName: "Final",
  direction: "SN",
  email: "correo@email.com",
  city: "Quito",
};

export const dataDocument = {
  dateDocument: "",
  numeroDocument: "",
  typeDocument: {
    factura: "factura",
    boleta: "nota de venta",
    notaCredito: "proforma",
  },
};

export const productArray = [
  {
    id: 1,
    name: "Coca Cola",
    price: 1.0,
    brand: "Coca Cola",
    description: "Bebida gaseosa",
    image:
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-erudito.appspot.com/o/imgProducts%2Fa2025914-1327-4e05-b9a9-867a12eb09d9?alt=media&token=cd0132c4-3ac1-4e79-984a-39da4fd9f42e",
  },
  {
    id: 2,
    name: "Pepsi",
    price: 100,
    brand: "Pepsi",
    description: "Bebida gaseosa",
    image:
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-erudito.appspot.com/o/imgProducts%2Faceite.png?alt=media&token=6f242117-58b6-424f-8ba7-42c25111bb32",
  },
  {
    id: 3,
    name: "Fanta",
    price: 100,
    brand: "Fanta",
    description: "Bebida gaseosa",
    image:
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-erudito.appspot.com/o/imgProducts%2Farroz.png?alt=media&token=fcf024c3-0f60-45f3-a2f7-a3acb3ec7ddb",
  },
  {
    id: 4,
    name: "Sprite",
    price: 100,
    brand: "Sprite",
    description: "Bebida gaseosa",
    image:
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-erudito.appspot.com/o/imgProducts%2Fcocacola.png?alt=media&token=caa99d73-a854-4db8-a438-af62b77d66e5",
  },
  {
    id: 5,
    name: "Manaos",
    price: 100,
    brand: "Manaos",
    description: "Bebida gaseosa",
    image:
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-erudito.appspot.com/o/imgProducts%2Ffanta.png?alt=media&token=62a0e557-f01d-4f24-a958-95090e129605",
  },
  {
    id: 6,
    name: "Coca Cola",
    price: 1.0,
    brand: "Coca Cola",
    description: "Bebida gaseosa",
    image:
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-erudito.appspot.com/o/imgProducts%2Fmayonesa.png?alt=media&token=7294e346-3ee7-4a9a-abdf-6587c897a2b0",
  },
  {
    id: 7,
    name: "Pepsi",
    price: 100,
    brand: "Pepsi",
    description: "Bebida gaseosa",
    image:
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-erudito.appspot.com/o/imgProducts%2Foreo.png?alt=media&token=2eb6d043-fe31-43dc-bd94-f11d2793da05",
  },
  {
    id: 8,
    name: "Fanta",
    price: 100,
    brand: "Fanta",
    description: "Bebida gaseosa",
    image:
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-erudito.appspot.com/o/imgProducts%2Fsupan.png?alt=media&token=ede981f0-e62b-46de-9d37-3a4990f9ce18",
  },
  {
    id: 9,
    name: "Coca Cola",
    price: 1.0,
    brand: "Coca Cola",
    description: "Bebida gaseosa",
    image:
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-erudito.appspot.com/o/imgProducts%2Fa2025914-1327-4e05-b9a9-867a12eb09d9?alt=media&token=cd0132c4-3ac1-4e79-984a-39da4fd9f42e",
  },
  {
    id: 10,
    name: "Pepsi",
    price: 100,
    brand: "Pepsi",
    description: "Bebida gaseosa",
    image:
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-erudito.appspot.com/o/imgProducts%2Faceite.png?alt=media&token=6f242117-58b6-424f-8ba7-42c25111bb32",
  },
];
