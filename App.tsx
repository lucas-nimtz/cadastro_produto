import React from 'react';
import Tela_cadastro_produto from './src/views/tela_cadastro_produto';
import TelaListarProdutos from './src/views/tela_listar_produtos';
import TelaEditarProdutos from './src/views/tela_editar_produto';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export type RootStackParamList = {
  Cadastro: undefined;
  Listagem: undefined;
  Editar: { id: string };
}

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='Listagem'
        screenOptions={{headerShown: false}}
      >
      <Stack.Screen
          name='Cadastro'
          component={Tela_cadastro_produto}
        />
        <Stack.Screen
          name='Listagem'
          component={TelaListarProdutos}
        />
        <Stack.Screen
          name='Editar'
          component={TelaEditarProdutos}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
