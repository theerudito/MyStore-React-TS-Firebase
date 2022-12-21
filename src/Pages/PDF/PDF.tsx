import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import { stylesPDF } from "./styles";

export const PDF_CART_COMPONENT = () => {
  return (
    <Document>
      <Page size="A4">
        <View>
          <Text>Cart</Text>
        </View>
      </Page>
    </Document>
  );
};
