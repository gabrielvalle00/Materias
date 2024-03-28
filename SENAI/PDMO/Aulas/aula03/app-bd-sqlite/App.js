import { StatusBar } from 'expo-status-bar';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Button, StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { DatabaseConnection } from './src/database/database';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const db = new DatabaseConnection.getConnection;

export default function App() {
  const [nome, setNome] = useState(null);
  const [registros, setRegistros] = useState([]);
  const [operacao, setOperacao] = useState('Adicionar');
  const [id, setId] = useState(null);




  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS clientes (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT)',
        [],
        () => console.log('Tabela clientes criada com sucesso!'),
        (_, error) => console.log(error),
      );
    });
  }, [registros]);

  const adicionarCliente = () => {

    if (nome == null || nome.trim() === '') {
      Alert.alert('Error', 'Insira um valor válido para o nome');
      return;
    }

    if (operacao === 'Adicionar') {
      db.transaction(tx => {
        tx.executeSql('INSERT INTO clientes (NOME) VALUES (?)',
          [nome],
          (_,) => {
            Alert.alert('Info', 'Registro inserido com sucesso')
            setNome('');
            atualizaLista();
          },
          (_, error) => {
            console.log('Erro ao adicionar o cliente', error);
            Alert.alert('Error', 'Ocorreu um erro ao adicionar o cliente');
          }
        );
      });
    } else if (operacao === 'Editar') {
      db.transaction(tx => {
        tx.executeSql('UPDATE clientes SET NOME=? WHERE ID=?',
          [nome, id],
          (_, { rowsAffected }) => {
            if (rowsAffected === 1)
              Alert.alert('Info', 'Registro Editado com sucesso');
            else if (rowsAffected === 0)
              Alert.alert('Alerta', 'O registro não foi localizado');
            setNome('');
            setOperacao('Adicionar');
            atualizaLista();
          },
          (_, error) => {
            console.log('Erro ao adicionar o cliente', error);
            Alert.alert('Error', 'Ocorreu um erro ao Editar o cliente');
          }
        );
      });
    }
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
        (_,) => {
          Alert.alert('Info', 'Registro Excluído com sucesso')
          atualizaLista();
        },
        (_, error) => {
          console.log('Erro ao Excluir o cliente', error);
          Alert.alert('Error', 'Ocorreu um erro ao excluir o cliente');
        }
      );
    })
  };




  useEffect(() => {
    atualizaLista();
  }, []);


  const buttonPress = (nome, id) => {
    setNome(nome);
    setId(id);
    setOperacao('Editar');
  }



  /**
   * Função utilizada para excluir tabelas e bancos
   */

  const deleteDatabase = () => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'",
        [],
        (_,{rows}) => {
          rows._array.forEach(table => {
            tx.executeSql(
              `DROP TABLE IF EXISTS ${table.name}`,
              [],
              () => {
                console.log(`Tabela ${table.nome} excluida com sucesso!`);
                setRegistros([]);
              },
              (_, error) => {
                console.error(`Error ao excluir a tabela ${table.nome}:`, error);
                Alert.alert('Erro', `Ocorreu um erro ao excluir a tabela ${table.name}`)
              }
            )
            
          });
        }
      )
    })
  }



  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.androidSafeArea}>
        <View style={styles.container}>
          <View style={styles.card1}>

          <TouchableOpacity onPress={() => {
                  Alert.alert(
                    'Atenção!',
                    'Deseja realmente excluir a base de dados, essa ação não podera ser desfeita!',
                    [
                      {
                        text: 'Sim',
                        onPress: () => { deleteDatabase() }
                      },
                      {
                        text: 'Cancelar',
                        onPress: () => { return }
                      }
                    ]
                  )
                }}>
                  <View style={styles.earthIconContainer}>
                    <FontAwesome6 name='eraser' color='red' size={32} />
                  </View>
                </TouchableOpacity>



            <Text style={styles.title}>Cadastro</Text>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
              placeholder='Digite um Nome'
            />
            <TouchableOpacity style={styles.addButton} onPress={adicionarCliente}>
              <Text style={styles.buttonText}>{operacao === 'Editar' ? 'Editar' : 'Adicionar'}</Text>
            </TouchableOpacity>
          </View>


          <ScrollView contentContainerStyle={{ flexGrow: 1, width: 400 }}>
            {registros.map(item => (
              <View key={item.id} style={styles.card2}>
                <Text style={styles.cardText}>ID: {item.id}</Text>
                <Text style={styles.cardText}>Nome: {item.nome}</Text>
                <TouchableOpacity onPress={() => {
                  Alert.alert(
                    'Atenção!',
                    'Deseja realmente excluir esse registro!',
                    [
                      {
                        text: 'Sim',
                        onPress: () => { deletarDaLista(item.id) }
                      },
                      {
                        text: 'Cancelar',
                        onPress: () => { return }
                      }
                    ]
                  )
                }}>
                  <View style={styles.trashIconContainer}>
                    <FontAwesome6 name='trash-can' color='red' size={24} />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                  buttonPress(item.nome), setId(item.id), setOperacao('Editar')
                }}>

                  <View style={styles.editIconContainer}>
                    <FontAwesome6 name='pen-to-square' color='grey' size={24} />
                  </View>
                </TouchableOpacity>

              </View>
            ))}
          </ScrollView>

          <StatusBar style="auto" />
        </View>

      </SafeAreaView>
    </SafeAreaProvider>


  );
}

const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
    marginTop: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerScroll: {
    width: '120%',
    backgroundColor: '#fff',
    padding: 20,
    gap: 5
  },
  card1: {
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
  card2: {
    width: '100%',
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
  trashIconContainer: {
    position: 'absolute',
    top: -15,
    right: 5,
    
  },
  editIconContainer: {
    position: 'absolute',
    top: -15,
    right: 35,
    
  },
  earthIconContainer: {
    position: 'absolute',
    top:-3,
    right: 5,
  }
});
