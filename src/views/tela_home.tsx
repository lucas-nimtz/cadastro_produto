import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';

type prop_navegacao = StackNavigationProp<RootStackParamList, "Home">;

const Tela_Home: React.FC = () => {
    const navegacao = useNavigation<prop_navegacao>();

    return (
        <SafeAreaView style={styles.container}>

            <LinearGradient
                colors={['#f5f9fc', '#bbd7f5']}
                style={styles.background}
            />

            <View style={styles.logoContainer}>
                <View style={styles.logoCirculo}>
                    <Feather name="shopping-bag" size={48} color="#5b9bd5" />
                </View>
                <Text style={styles.appNome}>Catálogo App</Text>
                <Text style={styles.subTitulo}>Seus produtos em um só lugar</Text>
            </View>

            <View style={styles.botaoCOntainer}>
                <TouchableOpacity
                    style={[styles.botao, styles.listagemBotao]}
                    onPress={() => { navegacao.navigate('Listagem'); }}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={['#a7c9e8', '#7ba7d0']}
                        style={styles.botaoGradiente}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <Feather name="list" size={24} color="#ffffff" />
                        <Text style={styles.botaoTexto}>Ver Catálogo</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.botao, styles.cadastroBotao]}
                    onPress={() => { navegacao.navigate('Cadastro'); }}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={['#78c6ff', '#5b9bd5']}
                        style={styles.botaoGradiente}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <Feather name="plus-circle" size={24} color="#ffffff" />
                        <Text style={styles.botaoTexto}>Cadastrar Produto</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.botao, styles.clienteBotao]}
                    onPress={() => { navegacao.navigate('CadastroClientes'); }}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={['#90d4aa', '#6db58a']}
                        style={styles.botaoGradiente}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <Feather name="user-plus" size={24} color="#ffffff" />
                        <Text style={styles.botaoTexto}>Cadastrar Cliente</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

            <View style={styles.rodape}>
                <Text style={styles.rodapeTexto}>© 2025 Catálogo App</Text>
            </View>
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
    logoContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
    },
    logoCirculo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        marginBottom: 20,
    },
    appNome: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#476c8e',
        marginBottom: 8,
    },
    subTitulo: {
        fontSize: 16,
        color: '#7a91a7',
    },
    botaoCOntainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    botao: {
        width: '100%',
        height: 60,
        borderRadius: 12,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        overflow: 'hidden',
    },
    botaoGradiente: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    botaoTexto: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 10,
    },
    cadastroBotao: {
        backgroundColor: '#78c6ff',
    },
    clienteBotao: {
        backgroundColor: '#90d4aa',
    },
    listagemBotao: {
        backgroundColor: '#a7c9e8',
    },
    rodape: {
        paddingBottom: 20,
        alignItems: 'center',
    },
    rodapeTexto: {
        color: '#7a91a7',
        fontSize: 12,
    },
});

export default Tela_Home;