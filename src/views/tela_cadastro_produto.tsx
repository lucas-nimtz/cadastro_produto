import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";

type prop_navegacao = StackNavigationProp<RootStackParamList, "Cadastro">

interface Produto {
    nome: string;
    descricao: string;
    valor: string;
}

const Tela_cadastro_produto: React.FC = () => {
    const navegacao = useNavigation<prop_navegacao>();
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Produto>();

    const enviar = async (dados: Produto) => {
        try {
            const produto_existe = await AsyncStorage.getItem("produtos");
            let produtos = [];
            if (produto_existe) {
                produtos = JSON.parse(produto_existe);
            }

            const novo_produto = { ...dados, id: Date.now() };
            produtos.push(novo_produto);

            await AsyncStorage.setItem("produtos", JSON.stringify(produtos));
            console.log("Dados salvos com sucesso!");

            Alert.alert(
                "Sucesso!",
                "Produto cadastrado com sucesso!",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            reset();
                            navegacao.navigate("Listagem");
                        }
                    }
                ]
            );
        }
        catch (error) {
            console.log("Erro ao salvar: " + error);
            Alert.alert("Erro", "Ocorreu um erro ao salvar o produto.");
        }
    }

    const voltar = () => {
        navegacao.goBack();
    }

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#f5f9fc', '#bbd7f5']}
                style={styles.background}
            />

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.cabecalho}>
                    <TouchableOpacity style={styles.voltarBotao} onPress={voltar}>
                        <Feather name="arrow-left" size={24} color="#5b9bd5" />
                    </TouchableOpacity>

                    <View style={styles.cabecalhoTitulo}>
                        <View style={styles.iconeContainer}>
                            <Feather name="plus-circle" size={32} color="#5b9bd5" />
                        </View>
                        <Text style={styles.titulo}>Cadastrar Produto</Text>
                        <Text style={styles.subTitulo}>Adicione um novo produto ao catálogo</Text>
                    </View>
                </View>

                <View style={styles.formularioContainer}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>
                            <Feather name="package" size={16} color="#5b9bd5" /> Nome do produto
                        </Text>
                        <Controller
                            control={control}
                            name="nome"
                            rules={{ required: "Nome deve ser obrigatório" }}
                            render={({ field: { onChange, value } }) => (
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={[styles.input, errors.nome && styles.inputError]}
                                        placeholder="Digite o nome do produto"
                                        placeholderTextColor="#a0a0a0"
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                </View>
                            )}
                        />
                        {errors.nome && (
                            <Text style={styles.erroTexto}>
                                <Feather name="alert-circle" size={12} color="#e74c3c" /> {errors.nome.message}
                            </Text>
                        )}
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>
                            <Feather name="file-text" size={16} color="#5b9bd5" /> Descrição do produto
                        </Text>
                        <Controller
                            control={control}
                            name="descricao"
                            rules={{ required: "Descrição deve ser obrigatória" }}
                            render={({ field: { onChange, value } }) => (
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={[styles.input, styles.textArea, errors.descricao && styles.inputError]}
                                        placeholder="Digite a descrição do produto"
                                        placeholderTextColor="#a0a0a0"
                                        multiline={true}
                                        numberOfLines={4}
                                        textAlignVertical="top"
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                </View>
                            )}
                        />
                        {errors.descricao && (
                            <Text style={styles.erroTexto}>
                                <Feather name="alert-circle" size={12} color="#e74c3c" /> {errors.descricao.message}
                            </Text>
                        )}
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>
                            <Feather name="dollar-sign" size={16} color="#5b9bd5" /> Valor unitário
                        </Text>
                        <Controller
                            control={control}
                            name="valor"
                            rules={{ required: "Valor deve ser obrigatório" }}
                            render={({ field: { onChange, value } }) => (
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={[styles.input, errors.valor && styles.inputError]}
                                        placeholder="R$ 0,00"
                                        placeholderTextColor="#a0a0a0"
                                        keyboardType="numeric"
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                </View>
                            )}
                        />
                        {errors.valor && (
                            <Text style={styles.erroTexto}>
                                <Feather name="alert-circle" size={12} color="#e74c3c" /> {errors.valor.message}
                            </Text>
                        )}
                    </View>
                </View>

                <View style={styles.botoesContainer}>
                    <TouchableOpacity
                        style={styles.botaoSalvar}
                        onPress={handleSubmit(enviar)}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={['#78c6ff', '#5b9bd5']}
                            style={styles.botaoGradiente}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <Feather name="check" size={20} color="#ffffff" />
                            <Text style={styles.botaoTexto}>Salvar Produto</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.botaoCancelar}
                        onPress={voltar}
                        activeOpacity={0.8}
                    >
                        <View style={styles.botaoSecundario}>
                            <Feather name="x" size={20} color="#7a91a7" />
                            <Text style={styles.botaoTextoSecundario}>Cancelar</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    cabecalho: {
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    voltarBotao: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 20,
    },
    cabecalhoTitulo: {
        alignItems: 'center',
    },
    iconeContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        marginBottom: 16,
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#476c8e',
        marginBottom: 8,
    },
    subTitulo: {
        fontSize: 16,
        color: '#7a91a7',
        textAlign: 'center',
    },
    formularioContainer: {
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#476c8e',
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputContainer: {
        position: 'relative',
    },
    input: {
        height: 50,
        backgroundColor: '#ffffff',
        borderColor: '#e1e8ed',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    textArea: {
        height: 100,
        paddingTop: 12,
    },
    inputError: {
        borderColor: '#e74c3c',
        borderWidth: 1.5,
    },
    erroTexto: {
        color: '#e74c3c',
        fontSize: 12,
        marginTop: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    botoesContainer: {
        paddingHorizontal: 20,
        gap: 12,
    },
    botaoSalvar: {
        height: 56,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        overflow: 'hidden',
    },
    botaoCancelar: {
        height: 56,
        borderRadius: 12,
        overflow: 'hidden',
    },
    botaoGradiente: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    botaoSecundario: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e1e8ed',
    },
    botaoTexto: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    botaoTextoSecundario: {
        color: '#7a91a7',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
});

export default Tela_cadastro_produto;