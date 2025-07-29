import React from 'react';

import Tela_cadastro_produto from './src/views/tela_cadastro_produto';
import Tela_Listar_Produtos from './src/views/tela_listar_produtos';
import Tela_Home from './src/views/tela_home';
import Tela_Cadastro_Cliente from './src/views/tela_cadastro_cliente';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

export type RootStackParamList = {
  Cadastro: undefined;
  Listagem: undefined;
  Home: undefined;
  CadastroClientes: undefined;
}

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name='Home'
          component={Tela_Home}
        />
        <Stack.Screen
          name='CadastroClientes'
          component={Tela_Cadastro_Cliente}
        />
        <Stack.Screen
          name='Cadastro'
          component={Tela_cadastro_produto}
        />
        <Stack.Screen
          name='Listagem'
          component={Tela_Listar_Produtos}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
