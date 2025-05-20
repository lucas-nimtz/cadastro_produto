import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";

type prop_navegacao = StackNavigationProp<RootStackParamList, "Listagem">;

interface Produto{
    id:string;
    nome:string;
    descricao:string;
    valor:string;
}
const TelaListarProdutos: React.FC = () => {
    const navegacao = useNavigation<prop_navegacao>();
    const [produtos, setProdutos] = useState<Produto[]>([]);

    const cadastro = () => {
        navegacao.navigate("Cadastro");
    }

    const editar = (id: string) => {
        navegacao.navigate("Editar", { id });
    }

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
    }, []);

    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>Lista de produtos</Text>
            <Button title='Cadastrar Novo Produto' onPress={ () => {cadastro()} } />
            <FlatList
                data={produtos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                    <View style={styles.infoContainer}>
                        <View>
                            <Text style={styles.nome}>{item.nome}</Text>
                            <Text>{item.descricao}</Text>
                            <Text style={styles.valor}>R$ {item.valor}</Text>
                        </View>
                        <View style={styles.botaoEditarContainer}>
                            <Button title="Editar" onPress={() => editar(item.id)} />
                        </View>
                    </View>
                </View>
            )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    nome: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    valor: {
        fontSize: 14,
        color: 'green',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    botaoEditarContainer: {
        marginLeft: 10,
        width: 80,
    },
})

export default TelaListarProdutos;