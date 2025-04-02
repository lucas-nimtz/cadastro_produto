import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Tela_cadastro_produto from './src/views/tela_cadastro_produto'
import TelaListarProdutos from './src/views/tela_listar_produtos';

export default function App() {
  return (
      //<Tela_cadastro_produto></Tela_cadastro_produto>
      <TelaListarProdutos></TelaListarProdutos>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
