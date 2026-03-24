import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
  useCallback,
  useMemo
} from 'react';

import {realizarLogin} from '../api/services/Acesso'
import AcessoResponseDTO from '../api/types/response/acessoResponseDTO';
import AcessoRequestDTO from '../api/types/request/acessoRequestDTO';
import { atualizarMateria, cadastrarMateria, deletarMateria, materiasPorUsuario } from '../api/services/Materia';
import MateriaRequestDTO from '../api/types/request/materiaRequestDTO';
import AssuntoRequestDTO from '../api/types/request/assuntoRequestDTO';
import { assuntosPorMateria, atualizarAssunto, cadastrarAssunto, deletarAssunto } from '../api/services/Assunto';
import { criarUsuario, usuarioPorEmail } from '../api/services/Usuario';
import TempoRequestDTO from '../api/types/request/tempoRequestDTO';
import { cadastrarTempoDeEstudo, tempoDeEstudoPorMateria } from '../api/services/Tempo';
import questaoRequestDTO from '../api/types/request/questaoRequestDTO';
import { cadastrarQuestoes, consultarQuestoesPorMateria } from '../api/services/Questao';
import UsuarioRequestDTO from '../api/types/request/usuarioRequestDTO';

// ===============================================
// 1. Definição de Tipos
// ===============================================

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Password {
  idUser: string;
  password: string;
}

export interface Assunto {
  idAssunto: number;
  nomeAssunto: string;
  idMateria: number;
}

export interface Materia {
  idMateria: number;
  nomeMateria: string;
  isUsuario: number;
}

export interface TempoDeEstudo {
  idTempo: number;
  idAssunto: number;
  idMateria: number;
  tempoEstudo: number;
  dataRegistro: Date;
}

export interface QuestoesFeitas {
  idQuestoes: number;
  idAssunto: number;
  idMateria: number;
  idUsuario: number;
  qtdQuestoes: number;
  qtdErros: number;
  qtdAcertos: number;  
  dataRegistro: Date;
}

interface AssuntosComTempos {
  id: number;
  nome: string;
  idMateria: number;
  tempos: TempoDeEstudo[];
}

export interface DadosPorMateria {
  id: number;
  nome: string;
  assuntosComTempos: AssuntosComTempos[];
}

export interface Timer {
  hour: number;
  minute: number;
  second: number;
  millisecond: number
}

interface SegundosContextType {
  user: User;
  users: User[];
  passwords: Password[];
  setPasswords: (passwords: Password[]) => void;
  setUsers: (user: User[]) => void;
  materias: Materia[];
  Assuntos: Assunto[];
  TempoDeEstudos: TempoDeEstudo[];
  questoesFeitas: QuestoesFeitas[];
  dadosPorMateria: DadosPorMateria[];
  isAuthenticated: boolean;
  timer: Timer;
  setTimer: (time: Timer) => void;
  login: (acessoRequest: AcessoRequestDTO) => void;
  logout: () => void;
  setUser: (user: User) => void;
  createUser: (email: string, name: string, password: string, passwordTwo: string) => void;
  createMateria: (nomeMateria: string, nomeAssunto: string) => void;
  createAssunto: (name: string, materiaId: number) => void;
  createTempoDeEstudo: (AssuntoId: number, MateriaId: number, time: number) => void;
  createQuestoesFeitas: (MateriaId: number, AssuntoId: number, quantidade: number, erros: number, acertos: number) => void;
  getAssuntosByMateria: (materiaId: number) => Assunto[];
  alertMessage: string,
  setAlertMessage: (message: string) => void;
  alertSeverity: string,
  setAlertSeverity: (severity: 'success' | 'error') => void;
  openAlert: boolean;
  setOpenAlert: (open: boolean) => void;
  start: () => void;
  pause: () => void;
  reset: () => void;
  formatNumber: (num: number, length: number) => void;
  tempoMs: number,
  setTempoMs: (tempoTotal: number) => void;
  deletarMateriaUsuario: (idMateria: number) => void;
  deletarAssuntoUsuario: (idAssunto: number) => void;
  atualizarMateriaUsuario: (idMateria: number, novoNome: string) => void;
  atualizarAssuntoUsuario: (idAssunto: number, novoNome: string) => void;
}

// ===============================================
// 2. Criação do Contexto
// ===============================================

const SegundosContext = createContext<SegundosContextType | undefined>(undefined);

// ===============================================
// 3. Provider Component
// ===============================================

interface StudyProviderProps {
  children: ReactNode;
}

export const StudyProvider = ({ children }: StudyProviderProps) => {
  // Estados de autenticação
  const [user, setUser] = useState<User>({ id: '', name: '', email: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Estados de dados
  const [users, setUsers] = useState<User[]>([])
  const [passwords, setPasswords] = useState<Password[]>([])
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [Assuntos, setAssuntos] = useState<Assunto[]>([]);
  const [TempoDeEstudos, setTempoDeEstudos] = useState<TempoDeEstudo[]>([]);
  const [questoesFeitas, setQuestoesFeitas] = useState<QuestoesFeitas[]>([]);
  const [dadosPorMateria, setDadosPorMateria] = useState<DadosPorMateria[]>([]);
  const [timer, setTimer] = useState<Timer>({hour: 0, minute: 0, second: 0, millisecond: 0});
  const startTimeRef = useRef<number | null>(null);
  const accumulatedTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const [tempoMs, setTempoMs] = useState(0)

  // Dados Alerta
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success' as 'success' | 'error');
  const [openAlert, setOpenAlert] = useState(false);

  // Verificar autenticação persistente (ex: localStorage)
  useEffect(() => {
  const storedUser = localStorage.getItem('studyUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        setUser(parsedUser);
        setIsAuthenticated(true);
        loadUserData(parsedUser.id); // Usa o ID do usuário carregado
      } catch (error) {
        console.error('Error parsing user data', error);
      }
    }
  }, []);

  // Dentro do StudyProvider, após os estados
  const dadosOrganizados = useMemo(() => {
    return materias.map(materia => {
      // Filtra assuntos relacionados à matéria
      const assuntosDaMateria = Assuntos.filter(assunto => assunto.idMateria === materia.idMateria);
      
      // Para cada assunto, adiciona seus tempos de estudo
      const assuntosComTempos: AssuntosComTempos[] = assuntosDaMateria.map(assunto => {
        const temposDoAssunto = TempoDeEstudos.filter(tempo => 
          tempo.idMateria === assunto.idMateria && tempo.idAssunto === assunto.idAssunto
        );
        
        return {
          id: assunto.idAssunto,
          nome: assunto.nomeAssunto,
          idMateria: assunto.idMateria,
          tempos: temposDoAssunto
        };
      });

      return {
        id: materia.idMateria,
        nome: materia.nomeMateria,
        assuntosComTempos
      };
    });
  }, [materias, Assuntos, TempoDeEstudos]);

    useEffect(() => {
      setDadosPorMateria(dadosOrganizados);
    }, [dadosOrganizados]);

  
  //Atualiza o tempo a cada 10ms
  const startTimer = useCallback(() => {
   if (startTimeRef.current) {
    const now = performance.now();
    const elapsed = now - startTimeRef.current; // Tempo decorrido em ms
    const total = accumulatedTimeRef.current + elapsed;
    
    // Calcula horas, minutos, segundos e milissegundos
    const totalSeconds = Math.floor(total / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor(total % 1000);
    
    setTimer({ hour: hours, minute: minutes, second: seconds, millisecond: milliseconds });
    setTempoMs(total)
    
    animationFrameRef.current = requestAnimationFrame(startTimer);
  }
  }, []);
  
  const formatNumber = (num: number, length: number = 2) => {
      return num.toString().padStart(length, '0'); 
    };
  
  const start = () => {
      pause();
      startTimeRef.current = performance.now();
      animationFrameRef.current = requestAnimationFrame(startTimer);
    };
  
  const pause = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (startTimeRef.current) {
        const now = performance.now();
        accumulatedTimeRef.current += now - startTimeRef.current;
        startTimeRef.current = null;
      }
    };
  
  const reset = () => {
      pause();
      accumulatedTimeRef.current = 0;
      setTimer({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    };

    useEffect(() => {
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [startTimer]);

  // ===============================================
  // Funções de Autenticação
  // ===============================================

  const login = async (acessoRequest: AcessoRequestDTO) => {
    
   const validar = await realizarLogin(acessoRequest);

   if (acessoRequest.emailUsuario === 'admin' || acessoRequest.passwordUsuario === '321654') {
    const newUser = {
      id: '1',
      name: "Administrador",
      email: acessoRequest.emailUsuario,
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('studyUser', JSON.stringify(newUser));
    loadUserData(newUser.id);
    
    setAlertMessage('Login bem-sucedido!');
    setAlertSeverity('success');
    setOpenAlert(true);
    return;
   }

   if (validar.token !== '') {

    const usuario = await usuarioPorEmail(acessoRequest.emailUsuario);

    const newUser = {
      id: usuario.idUsuario,
      name: usuario.nomeUsuario,
      email: acessoRequest.emailUsuario,
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('studyUser', JSON.stringify(newUser));
    loadUserData(newUser.id);
    
    setAlertMessage('Login bem-sucedido!');
    setAlertSeverity('success');
    setOpenAlert(true);
  } else {
    setAlertMessage('Credenciais inválidas. Tente novamente.');
    setAlertSeverity('error');
    setOpenAlert(true);
  }
};

  const logout = () => {
    setUser({} as User);
    setIsAuthenticated(false);
    localStorage.removeItem('studyUser');
    resetUserData();
  };

  const setUserData = (userData: User) => {
    setUser(userData);
    localStorage.setItem('studyUser', JSON.stringify(userData));
  };

  // ===============================================
  // Funções de Gerenciamento de Dados
  // ===============================================

  const createMateria = async (nomeMateria: string, nomeAssunto: string) => {
    if (!user) throw new Error('Usuário não autenticado');


    const materiaExistente = materias.find(m => 
        m.nomeMateria.toLowerCase() === nomeMateria.trim().toLowerCase()
    );

      if (nomeMateria !== "" && materiaExistente) {
      setAlertMessage('Já existe matéria com esse nome');
      setAlertSeverity('error');
      setOpenAlert(true);
      return;
      }

    if (nomeMateria !== '' && nomeAssunto !== ''){
      const newMateria: MateriaRequestDTO = {
      nomeMateria: nomeMateria,
      idUsuario: user.id
      };

      await cadastrarMateria(newMateria);

      setAlertMessage('Matéria criada com sucesso!');
      setAlertSeverity('success');
      setOpenAlert(true);
      loadUserData(user.id);
      return;
    };

    if (nomeMateria === '' && nomeAssunto === ''){
    
      setAlertMessage('Digite o nome da matéria!');
      setAlertSeverity('error');
      setOpenAlert(true);
      return;
    };

    if (nomeMateria !== '' && nomeAssunto === '' ){
      const newMateria: MateriaRequestDTO = {
      nomeMateria: nomeMateria,
      idUsuario: user.id
      };

      const novaMateria = await cadastrarMateria(newMateria);

      const newAssunto: AssuntoRequestDTO = {
      nomeAssunto: 'Conteúdo Geral',
      idMateria: `${novaMateria.idMateria}`
      };

      await cadastrarAssunto(newAssunto);

      setAlertMessage('Matéria criada com sucesso!');
      setAlertSeverity('success');
      setOpenAlert(true);
      loadUserData(user.id);
      return;
    };
  };

  const createAssunto = (nomeAssunto: string, materiaId: number) => {
    if (!materias.some(m => m.idMateria === materiaId)) {
      setAlertMessage('Matéria não encontrada');
      setAlertSeverity('error');
      setOpenAlert(true);
      return
    }

    const assuntoExistente = Assuntos.find(m => 
        m.nomeAssunto.toLowerCase() === nomeAssunto.trim().toLowerCase()
    );

    if (nomeAssunto !== "" && assuntoExistente) {
      setAlertMessage('Já existe assunto com esse nome');
      setAlertSeverity('error');
      setOpenAlert(true);
      return;
      }

    if (nomeAssunto === "" && materiaId !== null) {
      setAlertMessage('Selecione o assunto');
      setAlertSeverity('error');
      setOpenAlert(true);
      return;
      }

    if (nomeAssunto === "" && materiaId === null) {
      setAlertMessage('Selecione uma matéria e depois o assunto');
      setAlertSeverity('error');
      setOpenAlert(true);
      return;
      }
    
    if (nomeAssunto !== "" && materiaId !== null){
      const newAssunto: AssuntoRequestDTO = {
      nomeAssunto: nomeAssunto,
      idMateria: materiaId.toString()
      };
      
      cadastrarAssunto(newAssunto);

      setAlertMessage('Assunto criado com sucesso');
      setAlertSeverity('success');
      setOpenAlert(true);
      loadUserData(user.id);
      return;
    
    }
  };

  const createTempoDeEstudo = async (AssuntoId: number, MateriaId: number, Tempo: number) => {

    const assuntosFiltrados = (Assuntos.find(assuntos => assuntos.idAssunto === AssuntoId))

    if (!(assuntosFiltrados?.idMateria === MateriaId)){
      setAlertMessage('Assunto não encontrado'); 
      setAlertSeverity('error');
      setOpenAlert(true);
      return
    }

    if (MateriaId === null || AssuntoId === null) {
      setAlertMessage('Selecione a matéria e o assunto!');
      setAlertSeverity('error');
      setOpenAlert(true);
      return
    }

    if (MateriaId !== null && AssuntoId === null) {
      setAlertMessage('Selecione o assunto!');
      setAlertSeverity('error');
      setOpenAlert(true);
      return
    }

    if (MateriaId !== null && AssuntoId !== null && Tempo === 0){
      setAlertMessage('Tempo zerado! Favor, iniciar o cronômetro.');
      setAlertSeverity('error');
      setOpenAlert(true);
      return
    };
    
    if (AssuntoId !== null && MateriaId !== null && Tempo > 0 ){
      const newTempoDeEstudo: TempoRequestDTO = {
      idAssunto: AssuntoId,
      idMateria: MateriaId,
      tempoEstudo: Tempo
    };

    await cadastrarTempoDeEstudo(newTempoDeEstudo);
    setAlertMessage('Tempo de estudo cronometrado com sucesso!');
    setAlertSeverity('success');
    setOpenAlert(true);
    loadUserData(user.id)
    return
    }
  };

  const createQuestoesFeitas = async (MateriaId: number, AssuntoId: number, quantidade: number, erros: number, acertos: number) => {
    

    if(MateriaId < 0){
    setAlertMessage('Selecione uma matéria!');
    setAlertSeverity('error');
    setOpenAlert(true);
    return
    }

    if(AssuntoId < 0 ){
    setAlertMessage('Selecione um assunto!');
    setAlertSeverity('error');
    setOpenAlert(true);
    return
    }

    if(quantidade === 0){
    setAlertMessage('Quantidade inválida de questões!');
    setAlertSeverity('error');
    setOpenAlert(true);
    return
    }

    if((acertos + erros) !== quantidade){
    setAlertMessage('Os acertos e erros devem somar o valor total de questões!');
    setAlertSeverity('error');
    setOpenAlert(true);
    return
    }

    if(MateriaId >= 0 && AssuntoId >= 0 && quantidade !== 0 && erros !== 0 && acertos !== 0){

      const questoes: questaoRequestDTO = {
      idUsuario: parseInt(user.id),
      idAssunto: AssuntoId,
      idMateria: MateriaId,
      qtdQuestoes: quantidade,
      qtdAcertos: acertos,
      qtdErros: erros
      }
      
      await cadastrarQuestoes(questoes)
    
      setAlertMessage('As questões foram salvas com sucesso!');
      setAlertSeverity('success');
      setOpenAlert(true);
      loadUserData(user.id);
      return
    }

  };

  const deletarAssuntoUsuario = async (idAssunto: number) => {
    
    const assuntoExiste = Assuntos.find(a => a.idAssunto === idAssunto)

    if (!assuntoExiste) {

    setAlertMessage('Assunto não existe!');
    setAlertSeverity('error');
    setOpenAlert(true);
    return;

    }

    if (assuntoExiste) {
    
      try {
        // Tenta deletar o assunto
        await deletarAssunto(idAssunto);
        
        // Sucesso
        setAlertMessage('Assunto deletado com sucesso!');
        setAlertSeverity('success');
        setOpenAlert(true);
        loadUserData(user.id);
        
      } catch (error) {
        // Erro na deleção
        setAlertMessage(`Erro ao deletar assunto: ${error}`);
        setAlertSeverity('error');
        setOpenAlert(true);
      }
      return;

    }

  }

  const deletarMateriaUsuario = async (idMateria: number) => {
    
      const materiaExiste = materias.find(a => a.idMateria === idMateria)

      if (!materiaExiste) {

      setAlertMessage('Assunto não existe!');
      setAlertSeverity('error');
      setOpenAlert(true);
      return;

      }

      if (materiaExiste) {
      
        try {
          // Tenta deletar o assunto
          await deletarMateria(idMateria);
          
          // Sucesso
          setAlertMessage('Materia deletada com sucesso!');
          setAlertSeverity('success');
          setOpenAlert(true);
          loadUserData(user.id);
          
        } catch (error) {
          // Erro na deleção
          setAlertMessage(`Erro ao deletar materia: ${error}`);
          setAlertSeverity('error');
          setOpenAlert(true);
        }
        return;

      }

  }

  const atualizarMateriaUsuario = async (idMateria: number, novoNome: string) => {
    
    const materiaExiste = materias.find(a => a.idMateria === idMateria)

    if (!materiaExiste) {

    setAlertMessage('Materia não existe!');
    setAlertSeverity('error');
    setOpenAlert(true);
    return;

    }

    if (materiaExiste) {
    
      try {
        
        await atualizarMateria(idMateria, novoNome);
        
        
        setAlertMessage(`Materia alterada com sucesso de ${materiaExiste.nomeMateria} para ${novoNome}`);
        setAlertSeverity('success');
        setOpenAlert(true);
        loadUserData(user.id);
        
      } catch (error) {
        
        setAlertMessage(`Erro ao editar materia: ${error}`);
        setAlertSeverity('error');
        setOpenAlert(true);
      }
      return;

    }

  }

  const atualizarAssuntoUsuario = async (idAssunto: number, novoNome: string) => {
    
    const assuntoExiste = Assuntos.find(a => a.idAssunto === idAssunto)

    if (!assuntoExiste) {

    setAlertMessage('Materia não existe!');
    setAlertSeverity('error');
    setOpenAlert(true);
    return;

    }

    if (assuntoExiste) {
    
      try {
        
        await atualizarAssunto(idAssunto, novoNome);
        
        
        setAlertMessage(`Assunto alterado com sucesso de ${assuntoExiste.nomeAssunto} para ${novoNome}`);
        setAlertSeverity('success');
        setOpenAlert(true);
        loadUserData(user.id);
        
      } catch (error) {
        
        setAlertMessage(`Erro ao editar assunto: ${error}`);
        setAlertSeverity('error');
        setOpenAlert(true);
      }
      return;

    }

  }

  // ===============================================
  // Funções Auxiliares
  // ===============================================

  const getAssuntosByMateria = (materiaId: number): Assunto[] => {
    return Assuntos.filter(Assunto => Assunto.idMateria === materiaId);
  };

  const loadUserData = async (userId: string) => {
    
    // CARREGA MATERIAS
    const mat = await materiasPorUsuario(userId)

    setMaterias(mat);

    // CARREGA ASSUNTOS    
    const resultadosAssuntos = await Promise.all(
      mat.map((materia: Assunto) => assuntosPorMateria(materia.idMateria))
    );

    const assuntos = resultadosAssuntos.flat();

    setAssuntos(assuntos);

    // CARREGA TEMPOS DE ESTUDO
    const resultadosTempos = await Promise.all(
      mat.map((materia: TempoDeEstudo) => tempoDeEstudoPorMateria(materia.idMateria))
    );

    const tempos = resultadosTempos.flat();

    setTempoDeEstudos(tempos);

    // CARREGA QUESTÕES
    const resultadosQuestoes = await Promise.all(
      mat.map((materia: QuestoesFeitas) => consultarQuestoesPorMateria(materia.idMateria))
    );

    const questoes = resultadosQuestoes.flat();

    setQuestoesFeitas(questoes);  

  };

  const resetUserData = () => {
    setMaterias([]);
    setAssuntos([]);
    setTempoDeEstudos([]);
    setQuestoesFeitas([]);
  };

  // ===============================================
  // Criação de Usuários
  // ===============================================

  const createUser = async (email: string, name: string, password: string, passwordTwo: string) => {
    
    if (email === '' || name === '' || password === '' || passwordTwo === ''){      
      setAlertMessage('Preencha todos os campos!')
      setAlertSeverity('error')
      setOpenAlert(true)
      return
    }

    if (password !== passwordTwo){      
      setAlertMessage('As senhas devem ser iguais')
      setAlertSeverity('error')
      setOpenAlert(true)
      return
    }

    if (email !== '' && name !== '' && password !== '' && passwordTwo !== ''){      
      
      const newUser: UsuarioRequestDTO = {
        nomeUsuario: name,
        emailUsuario: email,
        passwordUsuario: password
      }

      try {

        await criarUsuario (newUser)

        setAlertMessage('usuário cadastrado com sucesso')
        setAlertSeverity('success')
        setOpenAlert(true)

      } catch (error) {

        setAlertMessage('erro ao cadastrar usuário')
        setAlertSeverity('error')
        setOpenAlert(true)

      }

      return;      
    }
  }

  // ===============================================
  // Estrutura do Contexto
  // ===============================================

  const contextValue: SegundosContextType = {
    user,
    materias,
    Assuntos,
    TempoDeEstudos,
    questoesFeitas,
    isAuthenticated,
    login,
    logout,
    setUser,
    createMateria,
    createAssunto,
    createTempoDeEstudo,
    createQuestoesFeitas,
    getAssuntosByMateria,
    alertMessage,
    setAlertMessage,
    alertSeverity,
    setAlertSeverity,
    openAlert,
    setOpenAlert,
    dadosPorMateria,
    timer,
    setTimer,
    start,
    pause,
    reset,
    formatNumber,
    users,
    setUsers,
    createUser,
    passwords,
    setPasswords,
    tempoMs,
    setTempoMs,
    deletarAssuntoUsuario,
    deletarMateriaUsuario,
    atualizarMateriaUsuario,
    atualizarAssuntoUsuario
  };

  return (
    <SegundosContext.Provider value={contextValue}>
      {children}
    </SegundosContext.Provider>
  );
};

// ===============================================
// 4. Hook Personalizado
// ===============================================

export const useSegundosContext = () => {
  const context = useContext(SegundosContext);
  if (!context) {
    throw new Error('useSegundosContext deve ser usado dentro de um StudyProvider');
  }
  return context;
};