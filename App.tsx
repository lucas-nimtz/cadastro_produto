import React from 'react';
import Tela_cadastro_produto from './src/views/tela_cadastro_produto';
import TelaListarProdutos from './src/views/tela_listar_produtos';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Cadastro: undefined,
  Listagem: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Listagem'>
        <Stack.Screen
          name='Listagem'
          component={TelaListarProdutos}
          options={{title: "Listagem de produtos"}}
        />
        <Stack.Screen
          name='Cadastro'
          component={Tela_cadastro_produto}
          options={{title: "Cadastro de produtos"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
