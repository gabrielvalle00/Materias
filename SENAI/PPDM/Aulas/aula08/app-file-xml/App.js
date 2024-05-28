import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import XmlParser from 'xml-js';


export default function App() {

  const [dados, setDados] = useState(null);


  const selectionarArquivo = async () => {
    try {

      const resultado = await DocumentPicker.getDocumentAsync();
      console.log(resultado);

      if(resultado.canceled === true) {
        console.log('Seleção de arquivo cancelada');
        return;
      }

      const { assets: [{ uri, mimeType }], canceled } = resultado;
      console.log(uri);

      if(mimeType !== 'text/xml') {
        console.log('Arquivo selecionado não é dp tipo XMl');
        return;
      }

      const conteudo = await FileSystem.readAsStringAsync(uri);
      const dadosXML = XmlParser.xml2js(conteudo, {compact: true, spaces: 4})
      setDados(dadosXML);


    } catch (error) {
      console.log('Erro ao selecionar o arquivo', error);
    }
  };




  return (
    <View style={styles.container}>

      <Button title='Selecionar Arquivo' onPress={selectionarArquivo} />
      {dados ? (
        <View>
          <Text>Dados do arquivo:</Text>
          {/** Aqui você pode exibir os dados do arquivo como desejar */}
          <Text>{JSON.stringify(dados)}</Text>
        </View>
      ) : (
        <Text>Nenhum arquivo Selecionado</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
