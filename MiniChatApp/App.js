import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform
} from 'react-native';


// Lista inicial de mensagens para simular o chat
const MENSAGENS_INICIAIS = [
  { id: '1', texto: 'Olá! Tudo bem?', remetente: 'outro' },
  { id: '2', texto: 'Oi! Tudo ótimo por aqui, e com você?', remetente: 'eu' },
  { id: '3', texto: 'Tudo bem também. O que está fazendo?', remetente: 'outro' },
];


export default function App() {
  const [mensagens, setMensagens] = useState(MENSAGENS_INICIAIS);
  const [textoInput, setTextoInput] = useState('');
  const flatListRef = useRef();


  // Função para enviar uma mensagem
  const enviarMensagem = () => {
    if (textoInput.trim() === '') return;


    const novaMensagem = {
      id: Date.now().toString(),
      texto: textoInput,
      remetente: 'eu', // Mensagem enviada pelo usuário local
    };


    setMensagens((mensagensAnteriores) => [...mensagensAnteriores, novaMensagem]);
    setTextoInput('');


    // Simula uma resposta automática após 1.5 segundos
    setTimeout(() => {
      simularResposta();
    }, 1500);
  };


  // Função que simula o outro digitando e respondendo
  const simularResposta = () => {
    const respostas = [
      'Que legal! Estou aprendendo React Native agora.',
      'Nossa, que massa!',
      'Interessante, me conte mais sobre isso!',
      'Entendi! Até mais tarde então.'
    ];
    const respostaAleatoria = respostas[Math.floor(Math.random() * respostas.length)];


    const novaResposta = {
      id: Date.now().toString(),
      texto: respostaAleatoria,
      remetente: 'outro',
    };


    setMensagens((mensagensAnteriores) => [...mensagensAnteriores, novaResposta]);
  };


  // Renderização de cada bolha de mensagem individual
  const renderItem = ({ item }) => {
    const ehMinhaMensagem = item.remetente === 'eu';
    return (
      <View style={[
        styles.containerMensagem,
        ehMinhaMensagem ? styles.containerMinhaMensagem : styles.containerOutraMensagem
      ]}>
        <View style={[
          styles.balao,
          ehMinhaMensagem ? styles.balaoMeu : styles.balaoOutro
        ]}>
          <Text style={[styles.textoMensagem, ehMinhaMensagem ? styles.textoMeu : styles.textoOutro]}>
            {item.texto}
          </Text>
        </View>
      </View>
    );
  };


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Cabeçalho do App */}
      <View style={styles.header}>
        <Text style={styles.tituloHeader}>Amigo Virtual</Text>
        <Text style={styles.subtituloHeader}>Online</Text>
      </View>


      {/* Lista de Conversas */}
      <FlatList
        ref={flatListRef}
        data={mensagens}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listaMensagens}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />


      {/* Barra de Entrada de Texto */}
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma mensagem..."
          placeholderTextColor="#888"
          value={textoInput}
          onChangeText={setTextoInput}
        />
        <TouchableOpacity style={styles.botaoEnviar} onPress={enviarMensagem}>
          <Text style={styles.textoBotaoEnviar}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}


// Estilizações da interface (Layout e Cores)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#075E54', // Verde estilo WhatsApp antigo
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  tituloHeader: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtituloHeader: {
    color: '#dcf8c6',
    fontSize: 12,
  },
  listaMensagens: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  containerMensagem: {
    marginVertical: 4,
    flexDirection: 'row',
    width: '100%',
  },
  containerMinhaMensagem: {
    justifyContent: 'flex-end',
  },
  containerOutraMensagem: {
    justifyContent: 'flex-start',
  },
  balao: {
    maxWidth: '75%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
  },
  balaoMeu: {
    backgroundColor: '#DCF8C6', // Verde claro para mensagens enviadas
    borderTopRightRadius: 0,
  },
  balaoOutro: {
    backgroundColor: '#FFF', // Branco para mensagens recebidas
    borderTopLeftRadius: 0,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  textoMensagem: {
    fontSize: 16,
  },
  textoMeu: {
    color: '#000',
  },
  textoOutro: {
    color: '#000',
  },
  containerInput: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
  },
  botaoEnviar: {
    marginLeft: 10,
    backgroundColor: '#075E54',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoBotaoEnviar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});