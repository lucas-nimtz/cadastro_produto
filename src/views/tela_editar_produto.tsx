import React, { useEffect, useState } from "react";
import { RootStackParamList } from "../../App";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, Button, TextInput, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type prop_navegacao = StackNavigationProp<RootStackParamList, "Editar">;
type route_params = RouteProp<RootStackParamList, "Editar">;

interface Produto {
    id: string;
    nome: string;
    descricao: string;
    valor: string;
}

const TelaEditarProdutos: React.FC = () => {
    const navegacao = useNavigation<prop_navegacao>();
    const route = useRoute<route_params>();
    const { id } = route.params;

    const [produto, setProduto] = useState<Produto | null>(null);

    useEffect(() => {
        const buscarProduto = async () => {
            const dados = await AsyncStorage.getItem("produtos");
            const lista: Produto[] = dados ? JSON.parse(dados) : [];

            const produtoSelecionado = lista.find((p) => p.id == id);
            
            if (produtoSelecionado) {
                setProduto(produtoSelecionado);
            
            } else {
                Alert.alert("Produto não encontrado.");
                navegacao.navigate("Listagem");
            }
        };

        buscarProduto();
    }, []);

    const salvarEdicao = async () => {
        if (!produto) return;

        try {
            const dados = await AsyncStorage.getItem("produtos");
            const lista: Produto[] = dados ? JSON.parse(dados) : [];

            const listaAtualizada = lista.map((p) =>
                p.id === produto.id ? produto : p
            );

            await AsyncStorage.setItem("produtos", JSON.stringify(listaAtualizada));
            Alert.alert("Produto atualizado com sucesso!");
            navegacao.navigate("Listagem");

        } catch (error) {
            Alert.alert("Erro ao salvar produto.");
        }
    };

    if (!produto) return null;

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Novo nome do produto:</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o nome do produto"
                value={produto.nome}
                onChangeText={(text) =>
                    setProduto((prev) => prev && { ...prev, nome: text })
                }
            />

            <Text style={styles.label}>Nova descrição do produto:</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite a descrição do produto"
                value={produto.descricao}
                onChangeText={(text) =>
                    setProduto((prev) => prev && { ...prev, descricao: text })
                }
            />

            <Text style={styles.label}>Novo valor do produto:</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o valor do produto"
                value={produto.valor}
                keyboardType="numeric"
                onChangeText={(text) =>
                    setProduto((prev) => prev && { ...prev, valor: text })
                }
            />

            <Button title="Salvar edições" onPress={salvarEdicao} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 5,
    },
});

export default TelaEditarProdutos;
