import React from 'react';
import { SafeAreaView, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Title, Paragraph } from 'react-native-paper';

export default function Sobre() {
  const navigation = useNavigation();

  function navegaDetalhes() {
    navigation.navigate('Detalhes', {
      nome: 'Desenvolvimento Web',
      descricao:
        'Aprenda a criar sites e aplicações web modernas utilizando tecnologias como HTML, CSS, JavaScript, React, Node.js, e mais.',
      imagem: require('../../assets/web.jpg'),
    });
  };

  function navegaDetalhes2() {
    navigation.navigate('Detalhes', {
      nome: 'Desenvolvimento Mobile',
      descricao:
        'Explore o mundo do desenvolvimento mobile, construindo aplicativos para iOS e Android usando React Native, Flutter, ou outras tecnologias.',
        imagem: require('../../assets/aplicativo.jpg'),
    });
  };

  function navegaDetalhes3() {
    navigation.navigate('Detalhes', {
      nome: 'Inteligência Artificial',
      descricao:
        'Aprofunde seus conhecimentos em inteligência artificial, machine learning e deep learning para criar soluções inovadoras e inteligentes.',
        imagem: require('../../assets/artificial.webp'),
    });
  };

  function navegaDetalhes4() {
    navigation.navigate('Detalhes', {
      nome: 'Data Science',
      descricao:
        'Domine as habilidades necessárias para analisar e interpretar dados, usando ferramentas como Python, Pandas e frameworks de machine learning.',
        imagem: require('../../assets/data-science.jpeg'),
    });
  };


  function navegaDetalhes5() {
    navigation.navigate('Detalhes', {
      nome: 'Cybersecurity',
      descricao:
        'Proteja sistemas e redes contra ameaças cibernéticas, aprendendo sobre segurança da informação, ethical hacking e práticas de prevenção.',
        imagem: require('../../assets/cyber-security.jpeg'),
    });
  };

  function navegaDetalhes6() {
    navigation.navigate('Detalhes', {
      nome: 'Design de Experiência do Usuário (UX)',
      descricao:
        'Crie interfaces intuitivas e experiências de usuário excepcionais, utilizando princípios de design, prototipagem e testes de usabilidade.',
        imagem: require('../../assets/ux.png.webp'),
    });
  };

  function navegaDetalhes7() {
    navigation.navigate('Detalhes', {
      nome: 'Cloud Computing',
      descricao:
        'Explore soluções de computação em nuvem, como AWS, Azure e Google Cloud, para desenvolver e implantar aplicativos escaláveis e eficientes.',
        imagem: require('../../assets/cloud.jpg'),
    });
  };

  function navegaDetalhes8() {
    navigation.navigate('Detalhes', {
      nome: 'Desenvolvimento de Jogos',
      descricao:
        'Entre no universo do desenvolvimento de jogos, aprendendo a criar jogos envolventes usando engines como Unity ou frameworks como Phaser.',
        imagem: require('../../assets/jogos-digitais.jpg'),
    });
  };






  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card style={styles.cursoCard} elevation={6}>
          <Card.Content >


            <Pressable onPress={navegaDetalhes}>
              <Image source={require('../../assets/web.jpg')} style={styles.imagemEst} />
              <Title style={styles.cursoNome}>
                Desenvolvimento Web
              </Title>
            </Pressable>




          </Card.Content>
        </Card>


        <Card style={styles.cursoCard} elevation={6}>
          <Card.Content >


            <Pressable onPress={navegaDetalhes2}>
            <Image source={require('../../assets/aplicativo.jpg')} style={styles.imagemEst} />
              <Title style={styles.cursoNome}>
                Desenvolvimento Mobile
              </Title>
            </Pressable>




          </Card.Content>
        </Card>


        <Card style={styles.cursoCard} elevation={6}>
          <Card.Content >


            <Pressable onPress={navegaDetalhes3}>
            <Image source={require('../../assets/artificial.webp')} style={styles.imagemEst} />
              <Title style={styles.cursoNome}>
                Inteligência Artificial
              </Title>
            </Pressable>




          </Card.Content>
        </Card>


        <Card style={styles.cursoCard} elevation={6}>
          <Card.Content >


            <Pressable onPress={navegaDetalhes4}>
            <Image source={require('../../assets/data-science.jpeg')} style={styles.imagemEst} />
              <Title style={styles.cursoNome}>
                Data Science
              </Title>
            </Pressable>




          </Card.Content>
        </Card>


        <Card style={styles.cursoCard} elevation={6}>
          <Card.Content >


            <Pressable onPress={navegaDetalhes5}>
            <Image source={require('../../assets/cyber-security.jpeg')} style={styles.imagemEst} />
              <Title style={styles.cursoNome}>
                Cybersecurity
              </Title>
            </Pressable>




          </Card.Content>
        </Card>


        <Card style={styles.cursoCard} elevation={6}>
          <Card.Content >


            <Pressable onPress={navegaDetalhes6}>
            <Image source={require('../../assets/ux.png.webp')} style={styles.imagemEst} />
              <Title style={styles.cursoNome}>
                Design de Experiência do Usuário (UX)
              </Title>
            </Pressable>




          </Card.Content>
        </Card>


        <Card style={styles.cursoCard} elevation={6}>
          <Card.Content >


            <Pressable onPress={navegaDetalhes7}>
            <Image source={require('../../assets/cloud.jpg')} style={styles.imagemEst} />
              <Title style={styles.cursoNome}>
                Cloud Computing
              </Title>
            </Pressable>




          </Card.Content>
        </Card>


        <Card style={styles.cursoCard} elevation={6}>
          <Card.Content >


            <Pressable onPress={navegaDetalhes8}>
            <Image source={require('../../assets/jogos-digitais.jpg')} style={styles.imagemEst} />
              <Title style={styles.cursoNome}>
                Desenvolvimento de Jogos
              </Title>
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
    backgroundColor: 'black',
  },
  cursoText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  cursoNome: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  imagemEst: {
    width: 340,
    height: 350,
    borderRadius: 15,
  }
});
