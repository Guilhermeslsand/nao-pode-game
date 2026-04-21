import fs from 'fs';
import { listaPalavras } from './data.js';

function separarEmGruposAleatorios(lista, tamanhoGrupo = 5) {
  const embaralhada = [...lista].sort(() => Math.random() - 0.5);
  const grupos = [];

  for (let i = 0; i < embaralhada.length; i += tamanhoGrupo) {
    grupos.push(embaralhada.slice(i, i + tamanhoGrupo));
  }

  return grupos;
}

const grupos = separarEmGruposAleatorios(listaPalavras);

const conteudo = `export const gruposDePalavras = ${JSON.stringify(grupos, null, 2)};`;

fs.writeFileSync('./gruposPalavras.js', conteudo);

console.log('Arquivo gruposPalavras.js gerado com sucesso!');