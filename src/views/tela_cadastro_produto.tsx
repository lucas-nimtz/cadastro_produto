import React from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Produto{
    nome: string;
    descricao: string;
    valor: string;
}

const Tela_cadastro_produto: React.FC = () => {
    const{
        control,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<Produto>();

    const enviar = async (dados: Produto)=>{
        try{
            const produto_existe = await AsyncStorage.getItem("produtos");
            let produtos = [];
            if(produto_existe){
                produtos = JSON.parse(produto_existe);
            }
            
            const novo_produto = {...dados, id: Date.now() };
            produtos.push(novo_produto);

            await AsyncStorage.setItem("produtos", JSON.stringify(produtos));
            console.log("Dados salvos com sucesso!");
            reset()
        }
        catch(error){
            console.log("Erro ao salvar: " + error);
        }
        
    }

    return(
        <View style={styles.container}>
            
            <Text style ={styles.label}>Nome do produto:</Text>
            <Controller
                control={control}
                name="nome"
                rules={{required:"Nome deve ser obrigatório"}}
                render={({ field: {onChange, value} }) => (
                    <TextInput
                        style = {styles.input}
                        placeholder="Digite o nome do produto"
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            
            
            <Text style ={styles.label}>Descrição do produto:</Text>
            <Controller
                control={control}
                name="descricao"
                rules={{required:"Descrição deve ser obrigatória"}}
                render={({ field: {onChange, value} }) => (
                    <TextInput
                        style = {styles.input}
                        placeholder="Digite a descrição do produto"
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />

            <Text style = {styles.label}>Valor unitário:</Text>
            <Controller
                control={control}
                name="valor"
                rules={{required:"Valor deve ser obrigatório"}}
                render={({ field: {onChange, value} }) => (
                    <TextInput
                        style = {styles.input}
                        placeholder="Digite o valor do produto"
                        keyboardType="numeric"
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            
            
            <Button title="Salvar" onPress={handleSubmit(enviar)} />
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

export default Tela_cadastro_produto