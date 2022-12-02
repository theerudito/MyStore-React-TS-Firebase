export const getDataFirebase = (dataFirebase: any) => {
  const data: any[] = [];
  dataFirebase.forEach((doc: any) => {
    data.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  //console.log(data);
  return data;
};

export const getDNIClient = (client: any) => {
  return client;
};

export const getCodeProduct = (product: any) => {
  return product.code;
};

export const getDNICompany = (company: any) => {
  console.log(company);
  return company;
};
