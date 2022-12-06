export interface ICart {
  ci: number;
  phone: number;
  firstName: string;
  lastName: string;
  direction: string;
  email: string;
  city: string;
  id: string;
  dateDoCument: string;
  numfactura: string;
  total: number;
  subtotal: number;
  iva: number;
  DataCart: ICart[];
  typeDocument: string;
}

export interface ICompany {
  nameStore: string;
  propetary: string;
  dni: number ;
  direction: string;
  iva: number;
  current: {
    dollar: string;
    pesos: string;
    euro: string;
  };
  serie1: number;
  serie2: number;
  numfactura: number;
  numnotadeventa: number;
  numproforma: number;
}
