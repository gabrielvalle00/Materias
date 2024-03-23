import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { DatabaseConnection } from './src/database/database';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const db = new DatabaseConnection.getConnection;

export default function App() {
  const [nome, setNome] = useState(null);
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS clientes (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT)',
        [],
        () => console.log('Tabela clientes criada com sucesso!'),
        (_, error) => console.log(error),
      );
    });
  }, []);

  const adicionarCliente = () => {
    if (nome == null || nome.trim() === '') {
      Alert.alert('Error', 'Insira um valor válido para o nome');
      return;
    }

    db.transaction(tx => {
      tx.executeSql('INSERT INTO clientes (NOME) VALUES (?)',
        [nome],
        (_,) => {
          Alert.alert('Info','Registro inserido com sucesso')
          setNome('');
          atualizaLista();
        },
        (_, error) => {
          console.log('Erro ao adicionar o cliente', error);
          Alert.alert('Error', 'Ocorreu um erro ao adicionar o cliente');
        }
      );
    });
  };

  const atualizaLista = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM clientes',
        [],
        (_, { rows }) => {
          setRegistros(rows._array)
        }
      );
    })
  };

  const deletarDaLista = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM clientes WHERE id=? ',
        [id],
        (_, ) => {
          Alert.alert('Info','Registro Excluído com sucesso')
          atualizaLista();
        },
        (_, error) => {
          console.log('Erro ao Excluir o cliente', error);
          Alert.alert('Error', 'Ocorreu um erro ao excluir o cliente');
        }
      );
    })
  };

  useEffect(()=>{
    atualizaLista();
  },[]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Cadastro</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder='Digite um Nome'
        />
        <TouchableOpacity style={styles.addButton} onPress={adicionarCliente}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      {registros.map(item => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.cardText}>ID: {item.id}</Text>
          <Text style={styles.cardText}>Nome: {item.nome}</Text>
          <TouchableOpacity onPress={() => {
            Alert.alert(
              'Atenção!',
              'Deseja realmente excluir esse registro!',
              [
                {
                  text: 'Sim',
                  onPress: () => {deletarDaLista(item.id)}
                },
                {
                  text: 'Cancelar',
                  onPress: () => {return}
                }
              ]
            )
          }}>
            <FontAwesome5 name='trash-alt' color='orange' size={24} />
          </TouchableOpacity>
        </View>
      ))}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: 'purple',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
    color: 'black',
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#333',
    padding: 10,
    marginBottom: 10,
    color: 'black',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
