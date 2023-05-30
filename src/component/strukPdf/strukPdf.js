import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    padding: 20,
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  cell: {
    flexGrow: 1,
    flexBasis: "25%",
  },
});

const StrukPDF = ({ keranjang }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>STRUK PEMBAYARAN</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.cell}>Item</Text>
        <Text style={styles.cell}>Harga</Text>
        <Text style={styles.cell}>Jumlah</Text>
        <Text style={styles.cell}>Total</Text>
      </View>
      {keranjang.map((item) => (
        <View key={item.id} style={styles.row}>
          <Text style={styles.cell}>{item.nama}</Text>
          <Text style={styles.cell}>{item.harga}</Text>
          <Text style={styles.cell}>{item.jumlah}</Text>
          <Text style={styles.cell}>{item.harga * item.jumlah}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

export default StrukPDF;
