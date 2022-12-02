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
