import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


import api from '../../services/api/api';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NovoCliente(){
    return(
        <SafeAreaView>
            <Text>Pagina para cadastro de clientes</Text>
        </SafeAreaView>
    )
}