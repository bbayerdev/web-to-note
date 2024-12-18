'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Definindo a interface para a estrutura de uma nota
interface Note {
  id: string; // Mudamos para string, pois o id está vindo como uma string
  tittle: string;
}

const Page = () => {
  // Tipando corretamente o estado notes como um array de Note
  const [notes, setNotes] = useState<Note[]>([]); // Para armazenar as notas
  const [loading, setLoading] = useState(true); // Para indicar se os dados estão carregando
  const [error, setError] = useState<string | null>(null); // Para capturar erros

  useEffect(() => {
    // Função assíncrona para buscar as notas
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/note'); // Substitua <porta> pela porta correta
        setNotes(response.data); // Atualiza o estado com as notas recebidas

        console.log("Dados recebidos:", response.data);
      } catch (err) {
        setError('Erro ao carregar as notas.'); // Caso haja erro
      } finally {
        setLoading(false); // Ao terminar, definimos o loading como false
      }
    };

    fetchNotes(); // Chama a função para buscar as notas
  }, []); // O array vazio significa que o efeito será executado apenas uma vez, após o componente ser montado

  if (loading) return <div>Carregando...</div>; // Exibe uma mensagem enquanto os dados estão sendo carregados
  if (error) return <div>{error}</div>; // Exibe o erro, se houver

  return (
    <div>
      <h1>Notas</h1>
      <ul>
        {notes.map((note, index) => (
          <li key={note.id}>
            <h2>{index + 1}. {note.tittle}</h2> {/* Exibe o número da nota (index + 1) */}

          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
