import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Card, Title, Paragraph } from 'react-native-paper';




export default function Detalhes() {

  const route = useRoute();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card style={styles.cursoCard} elevation={6}>
          <Card.Content>

            <Image source={route.params?.imagem} style={styles.imagemEst} />
            <Paragraph style={styles.cursoNome}>{route.params?.nome}</Paragraph>
            <Paragraph style={styles.cursoText}>{route.params?.descricao}</Paragraph>

            <Pressable style={styles.pressed}  onPress={() => {  }} >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Inscrever no curso</Text>
            </Pressable>



          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  cursoCard: {
    width: '90%',
    marginBottom: 15,
    borderRadius: 30,
    backgroundColor: 'white',

  },
  cursoText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  cursoNome: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  imagemEst: {
    width: 340,
    height: 350,
    borderRadius: 15,
  },
  pressed: {
    backgroundColor: pressed ? 'black' : 'red',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
