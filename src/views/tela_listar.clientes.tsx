import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Modal, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { RootStackParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

type prop_navegacao = StackNavigationProp<RootStackParamList, "Listagem">;

interface Cliente {
    id: string;
    nome: string;
    descricao: string;
    valor: string;
}

const TelaListarClientes: React.FC = () => {
    const navegacao = useNavigation<prop_navegacao>();
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);

    const cadastro = () => navegacao.navigate("Cadastro");
    const voltar = () => { navegacao.goBack(); }

    const busca_produtos = async () => {
        // try {
        //     const lista_produtos = await AsyncStorage.getItem('produtos');
        //     if (lista_produtos) {
        //         setProdutos(JSON.parse(lista_produtos));
        //     }
        // } catch (error) {
        //     console.log("Erro ao buscar lista", error);
        // }
        try{
            const resposta = await fetch('https://acmitech.com.br/api/produtos')
            if(!resposta.ok){
                throw new Error("Erro ao buscar os produtos da API.")
            }
            
            const dados = await resposta.json();
            setProdutos(dados);
        } catch (error){
            Alert.alert(
                "Erro",
                "Falha ao atualizar produto." + error,
                [
                    {
                        text: "OK"
                    }
                ]
            );
        }

    };

    useEffect(() => {
        busca_produtos();
    }, []);

    const abrirModalEdicao = (produto: Produto) => {
        setProdutoSelecionado(produto);
        setModalVisible(true);
    };

    const salvarEdicao = async () => {
        if (!produtoSelecionado) return;

        // try {
        //     const listaAtual = await AsyncStorage.getItem('produtos');
        //     let produtos = listaAtual ? JSON.parse(listaAtual) : [];

        //     const atualizados = produtos.map((p: Produto) =>
        //         p.id === produtoSelecionado.id ? produtoSelecionado : p
        //     );

        //     await AsyncStorage.setItem('produtos', JSON.stringify(atualizados));
        //     setProdutos(atualizados);
        //     setModalVisible(false);
        // } catch (error) {
        //     console.log("Erro ao salvar edição:", error);
        // }
        try{
            const resposta = await fetch(`https://acmitech.com.br/api/produtos/api/produtos/${produtoSelecionado.id}`,
                {
                    method: 'PATCH',
                    headers:{
                        'Content-type': 'aplication/json'
                    },
                    body: JSON.stringify(produtoSelecionado)
                }
            );
            if(!resposta.ok){
                throw new Error("Erro ao editar produto.");
            }
            busca_produtos();
            setModalVisible(false);

        } catch (error) {
            Alert.alert(
                "Erro",
                "Falha ao atualizar produto." + error,
                [
                    {
                        text: "OK"
                    }
                ]
            );
        }
    };

    const excluirProduto = async () => {
        if (!produtoSelecionado) return;

        // try {
        //     const listaAtual = await AsyncStorage.getItem('produtos');
        //     let produtos = listaAtual ? JSON.parse(listaAtual) : [];

        //     const atualizados = produtos.filter((p: Produto) => p.id !== produtoSelecionado.id);

        //     await AsyncStorage.setItem('produtos', JSON.stringify(atualizados));
        //     setProdutos(atualizados);
        //     setModalVisible(false);
        // } catch (error) {
        //     console.log("Erro ao excluir produto:", error);
        // }

        try {
            const resposta = await fetch (`https://acmitech.com.br/api/produtos/api/produtos/${produtoSelecionado.id}`,
                {
                    method: 'DELETE'
                }
            );
            
            if(!resposta.ok){
                throw new Error("Falha ao excluir produto.")
            }
            busca_produtos();
            setModalVisible(false);
        } catch (error) {
            
        }
    };

    return (
        <SafeAreaView style={styles.container}>

            <LinearGradient
                colors={['#f5f9fc', '#bbd7f5']}
                style={styles.background}
            />

            <View style={styles.header}>
                <TouchableOpacity style={styles.voltarBotao} onPress={voltar}>
                    <Feather name="arrow-left" size={24} color="#5b9bd5" />
                </TouchableOpacity>
                <View style={styles.cabecalhoTitulo}>
                    <View style={styles.iconeContainer}>
                        <Feather name="package" size={32} color="#5b9bd5" />
                    </View>
                    <Text style={styles.titulo}>Lista de Produtos</Text>
                    <Text style={styles.subTitulo}>Veja todos os produto do catálogo</Text>
                </View>
            </View>

            <View style={styles.conteudo}>
                <TouchableOpacity style={styles.botaoCadastro} onPress={cadastro}>
                    <LinearGradient
                        colors={['#78c6ff', '#5b9bd5']}
                        style={styles.botaoCadastroProduto}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <Feather name="plus" size={20} color="#ffffff" />
                        <Text style={styles.botaoCadastroTexto}>Novo Produto</Text>
                    </LinearGradient>
                </TouchableOpacity>

                {produtos.length === 0 ? (
                    <View style={styles.listaVazia}>
                        <Feather name="package" size={64} color="#a7c9e8" />
                        <Text style={styles.listaVaziaTitulo}>Nenhum produto cadastrado</Text>
                        <Text style={styles.listaVaziaSubTitulo}>Adicione seu primeiro produto!</Text>
                    </View>
                ) : (
                    <FlatList
                        data={produtos}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listaConteudo}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.itemContainer}
                                onPress={() => abrirModalEdicao(item)}
                                activeOpacity={0.7}
                            >
                                <View style={styles.itemConteudo}>
                                    <View style={styles.itemCabecalho}>
                                        <Text style={styles.nome}>{item.nome}</Text>
                                        <Text style={styles.valor}>R$ {item.valor}</Text>
                                    </View>
                                    <Text style={styles.descricao}>{item.descricao}</Text>
                                    <View style={styles.itemEditar}>
                                        <Feather name="edit-2" size={16} color="#7a91a7" />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                )}
            </View>

            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalConteudo}>
                        <View style={styles.modalCabecalho}>
                            <Text style={styles.modalTitulo}>Editar Produto</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Feather name="x" size={24} color="#476c8e" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Nome</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nome do produto"
                                value={produtoSelecionado?.nome}
                                onChangeText={(text) =>
                                    setProdutoSelecionado({ ...produtoSelecionado!, nome: text })
                                }
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Descrição</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Descrição do produto"
                                multiline
                                numberOfLines={3}
                                value={produtoSelecionado?.descricao}
                                onChangeText={(text) =>
                                    setProdutoSelecionado({ ...produtoSelecionado!, descricao: text })
                                }
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Valor</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="0,00"
                                keyboardType="numeric"
                                value={produtoSelecionado?.valor}
                                onChangeText={(text) =>
                                    setProdutoSelecionado({ ...produtoSelecionado!, valor: text })
                                }
                            />
                        </View>

                        <View style={styles.modalBotoes}>
                            <TouchableOpacity style={styles.saveButton} onPress={salvarEdicao}>
                                <LinearGradient
                                    colors={['#90d4aa', '#6db58a']}
                                    style={styles.botaoGradiente}
                                >
                                    <Feather name="check" size={18} color="#ffffff" />
                                    <Text style={styles.botaoTexto}>Salvar</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.botaoExcluir} onPress={excluirProduto}>
                                <LinearGradient
                                    colors={['#ff7b7b', '#e85656']}
                                    style={styles.botaoGradiente}
                                >
                                    <Feather name="trash-2" size={18} color="#ffffff" />
                                    <Text style={styles.botaoTexto}>Excluir</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

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
    header: {
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
    conteudo: {
        flex: 1,
        paddingHorizontal: 20,
    },
    botaoCadastro: {
        height: 50,
        borderRadius: 25,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        overflow: 'hidden',
    },
    botaoCadastroProduto: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    botaoCadastroTexto: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    listaVazia: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    listaVaziaTitulo: {
        fontSize: 18,
        fontWeight: '600',
        color: '#476c8e',
        marginTop: 20,
        marginBottom: 8,
    },
    listaVaziaSubTitulo: {
        fontSize: 14,
        color: '#7a91a7',
    },
    listaConteudo: {
        paddingBottom: 20,
    },
    itemContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        overflow: 'hidden',
    },
    itemConteudo: {
        padding: 16,
        position: 'relative',
    },
    itemCabecalho: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    nome: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#476c8e',
        flex: 1,
        marginRight: 10,
    },
    valor: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6db58a',
    },
    descricao: {
        fontSize: 14,
        color: '#7a91a7',
        lineHeight: 20,
        marginBottom: 10,
    },
    itemEditar: {
        position: 'absolute',
        bottom: 12,
        right: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
    },
    modalConteudo: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
        maxHeight: '80%',
    },
    modalCabecalho: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    modalTitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#476c8e',
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#476c8e',
        marginBottom: 8,
    },
    input: {
        height: 45,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
        paddingTop: 12,
    },
    modalBotoes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 12,
    },
    saveButton: {
        flex: 1,
        height: 45,
        borderRadius: 8,
        overflow: 'hidden',
    },
    botaoExcluir: {
        flex: 1,
        height: 45,
        borderRadius: 8,
        overflow: 'hidden',
    },
    botaoGradiente: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    botaoTexto: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 6,
    },
});

export default TelaListarClientes;