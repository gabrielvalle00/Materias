import React from 'react';
import { SafeAreaView, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Title, Paragraph } from 'react-native-paper';

export default function Sobre() {
  const navigation = useNavigation();

  const navegaContato = () => {
    navigation.navigate('Contato');
  };

  const cursos = [
    {
      nome: 'Desenvolvimento Web',
      descricao:
        'Aprenda a criar sites e aplicações web modernas utilizando tecnologias como HTML, CSS, JavaScript, React, Node.js, e mais.',
    },
    {
      nome: 'Desenvolvimento Mobile',
      descricao:
        'Explore o mundo do desenvolvimento mobile, construindo aplicativos para iOS e Android usando React Native, Flutter, ou outras tecnologias.',
    },
    {
      nome: 'Inteligência Artificial',
      descricao:
        'Aprofunde seus conhecimentos em inteligência artificial, machine learning e deep learning para criar soluções inovadoras e inteligentes.',
    },
    {
      nome: 'Data Science',
      descricao:
        'Domine as habilidades necessárias para analisar e interpretar dados, usando ferramentas como Python, Pandas e frameworks de machine learning.',
    },
    {
      nome: 'Cybersecurity',
      descricao:
        'Proteja sistemas e redes contra ameaças cibernéticas, aprendendo sobre segurança da informação, ethical hacking e práticas de prevenção.',
    },
    {
      nome: 'Design de Experiência do Usuário (UX)',
      descricao:
        'Crie interfaces intuitivas e experiências de usuário excepcionais, utilizando princípios de design, prototipagem e testes de usabilidade.',
    },
    {
      nome: 'Cloud Computing',
      descricao:
        'Explore soluções de computação em nuvem, como AWS, Azure e Google Cloud, para desenvolver e implantar aplicativos escaláveis e eficientes.',
    },
    {
      nome: 'Desenvolvimento de Jogos',
      descricao:
        'Entre no universo do desenvolvimento de jogos, aprendendo a criar jogos envolventes usando engines como Unity ou frameworks como Phaser.',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {cursos.map((curso, index) => (
          <Card key={index} style={styles.cursoCard} elevation={6}>
            <Card.Content>
              <Title style={styles.cursoNome}>{curso.nome}</Title>
              <Paragraph style={styles.cursoText}>{curso.descricao}</Paragraph>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
