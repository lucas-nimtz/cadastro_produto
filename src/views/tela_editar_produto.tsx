import React from "react";
import { RootStackParamList } from "../../App";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type prop_navegacao = StackNavigationProp<RootStackParamList, "Editar">

interface Produto{
    id:string;
    nome:string;
    descricao:string;
    valor:string;
}

const TelaEditarProdutos: React.FC = () =>{
    const navegacao = useNavigation<prop_navegacao>();

    const editar = async () => {
        navegacao.navigate("Listagem");
    }

    return(
        <View style={styles.container}>
            
            <Text style ={styles.label}>Novo nome do produto:</Text>
            <TextInput
                style = {styles.input}
                placeholder="Digite o nome do produto"
            />

            <Text style ={styles.label}>Nova descrição do produto:</Text>
            <TextInput
                style = {styles.input}
                placeholder="Digite a descrição do produto"
            />

            <Text style ={styles.label}>Novo valor do produto:</Text>
            <TextInput
                style = {styles.input}
                placeholder="Digite o valor do produto"
            />

            <Button title="Salvar edições" onPress={ () => {editar()} } />
        </View>
    );
}

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
    }
})

export default TelaEditarProdutos