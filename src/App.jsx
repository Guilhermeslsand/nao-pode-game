import { useState } from 'react';
import { gruposDePalavras } from './gruposPalavras';
import './App.css';

function App() {
  // Estados de navegação e jogo
  const [grupoSelecionado, setGrupoSelecionado] = useState(null);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [pontos, setPontos] = useState(0);
  const [jogoFinalizado, setJogoFinalizado] = useState(false);

  // Estados de Paginação
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 12; 
  
  const indiceUltimoItem = paginaAtual * itensPorPagina;
  const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
  const gruposPaginados = gruposDePalavras.slice(indicePrimeiroItem, indiceUltimoItem);
  const totalPaginas = Math.ceil(gruposDePalavras.length / itensPorPagina);

  // Funções de controle
  const voltarAoMenu = () => {
    setGrupoSelecionado(null);
    setIndiceAtual(0);
    setPontos(0);
    setJogoFinalizado(false);
  };

  const proximaRodada = (acertou) => {
    if (acertou) setPontos(prev => prev + 1);

    const palavrasDoGrupo = gruposDePalavras[grupoSelecionado];

    if (indiceAtual < palavrasDoGrupo.length - 1) {
      setIndiceAtual(prev => prev + 1);
    } else {
      setJogoFinalizado(true);
    }
  };

  // --- RENDERS ---

  // 1. MENU DE SELEÇÃO (Com Paginação)
  if (grupoSelecionado === null) {
    return (
      <div className="container">
        <h1 className="titulo-menu">Escolha um Grupo</h1>
        
        <div className="grid-grupos">
          {gruposPaginados.map((_, index) => {
            const indexReal = indicePrimeiroItem + index;
            return (
              <button 
                key={indexReal} 
                className="card-selecao"
                onClick={() => setGrupoSelecionado(indexReal)}
              >
                <h2>Grupo {indexReal + 1}</h2>
                <p>5 Palavras</p>
              </button>
            );
          })}
        </div>

        <div className="paginacao">
          <button 
            disabled={paginaAtual === 1} 
            onClick={() => setPaginaAtual(prev => prev - 1)}
          >
            Anterior
          </button>
          
          <span>Página {paginaAtual} de {totalPaginas}</span>

          <button 
            disabled={paginaAtual === totalPaginas} 
            onClick={() => setPaginaAtual(prev => prev + 1)}
          >
            Próxima
          </button>
        </div>
      </div>
    );
  }

  // 2. TELA DE FIM DE JOGO
  if (jogoFinalizado) {
    return (
      <div className="container">
        <div className="card resultado">
          <h1>Fim do Grupo {grupoSelecionado + 1}! 🏆</h1>
          <p className="texto-resultado">Você acertou:</p>
          <p className="pontuacao-final">{pontos} / 5</p>
          <button className="btn-menu" onClick={voltarAoMenu}>Voltar ao Menu</button>
        </div>
      </div>
    );
  }

  // 3. TELA DE JOGO ATIVO
  const carta = gruposDePalavras[grupoSelecionado][indiceAtual];

  return (
    <div className="container">
      <header>
        <button className="btn-voltar" onClick={voltarAoMenu}>← Menu</button>
        <div className="status">
          <span>Grupo {grupoSelecionado + 1}</span>
          <span className="ponto-badge">Pts: {pontos}</span>
        </div>
      </header>

      <div className="card">
        <small className="contador">{indiceAtual + 1} de 5</small>
        <h1 className="palavra-alvo">{carta.palavra}</h1>
        
        <div className="proibidas-container">
          <p>NÃO PODE FALAR:</p>
          <ul>
            {carta.proibidas.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="controles">
        <button className="btn-erro" onClick={() => proximaRodada(false)}>ERROU</button>
        <button className="btn-acerto" onClick={() => proximaRodada(true)}>ACERTOU!</button>
      </div>
    </div>
  );
}

export default App;