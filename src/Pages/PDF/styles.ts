import { StyleSheet } from "@react-pdf/renderer";

export const stylesPDF = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    width: "80%",
  },
  containerEncabezado: {
    backgroundColor: "orange",
    border: "1px black solid",
    borderRadius: "4px",
  
    display: "flex",
  },

  containerImagenAndCompany: {
    backgroundColor: "gray",
    border: "1px black solid",
  },

  containerLogo: {
    backgroundColor: "red",
  },

  textoLogo: {
    color: "white"
  },

  containerDataCompany: {
    backgroundColor: "blue"
  },

  containerDataDocument: {
    backgroundColor: "green",
  },
});
