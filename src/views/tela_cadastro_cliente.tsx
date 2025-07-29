
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, SafeAreaView, StyleSheet, ScrollView } from 'react-native';

const TelaCadastroCliente: React.FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#f5f9fc', '#bbd7f5']}
                style={styles.background}
            />

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.cabecalho}>
                    Tela de cadastro de produtos
                </View>
            </ScrollView>
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
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    cabecalho: {
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
});

export default TelaCadastroCliente;