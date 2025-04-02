import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";

interface Produto{
    id:string;
    nome:string;
    descricao:string;
    valor:string;
}
const TelaListarProdutos: React.FC = () => {
    const [produtos, setProdutos] = useState<Produto[]>([]);

    useEffect(() => {
        const busca_produtos = async () => {
            try{
                const lista_produtos = await AsyncStorage.getItem('produtos');
                if(lista_produtos){
                    setProdutos(JSON.parse(lista_produtos));
                }
            }catch(error){
                console.log("Erro ao buscar lista", error)
            }
        }
        busca_produtos();
    });

    return(
        <View>
            <Text>Lista de produtos</Text>
            <FlatList
                data={produtos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>(
                    <View>
                        <Text>{item.nome}</Text>
                        <Text>{item.descricao}</Text>
                        <Text>R$ {item.valor}</Text>
                    </View>
                )}
            />
        </View>
    );
}

export default TelaListarProdutos;