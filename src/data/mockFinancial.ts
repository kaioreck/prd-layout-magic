
import { Pagamento, Profissional } from '@/types/financial';
import { addDays, subDays, format } from 'date-fns';

// Data atual para referência
const hoje = new Date();

// Lista de profissionais
export const profissionais: Profissional[] = [
  { id_profissional: 1, nome: 'João Silva' },
  { id_profissional: 2, nome: 'Maria Oliveira' },
  { id_profissional: 3, nome: 'Carlos Santos' },
  { id_profissional: 4, nome: 'Ana Pereira' }
];

// Dados de exemplo para pagamentos
export const pagamentosMock: Pagamento[] = [
  {
    id_pagamento: 1,
    id_agendamento: 101,
    valor_pago: 45.00,
    forma_pagamento: 'Dinheiro',
    data_pagamento: subDays(hoje, 12).toISOString(),
    descricao: 'Corte masculino',
    id_profissional: 1,
    nome_profissional: 'João Silva'
  },
  {
    id_pagamento: 2,
    id_agendamento: 102,
    valor_pago: 75.00,
    forma_pagamento: 'Cartão Crédito',
    data_pagamento: subDays(hoje, 11).toISOString(),
    descricao: 'Corte e barba',
    id_profissional: 2,
    nome_profissional: 'Maria Oliveira'
  },
  {
    id_pagamento: 3,
    id_agendamento: 103,
    valor_pago: 120.00,
    forma_pagamento: 'Pix',
    data_pagamento: subDays(hoje, 9).toISOString(),
    descricao: 'Coloração',
    id_profissional: 1,
    nome_profissional: 'João Silva'
  },
  {
    id_pagamento: 4,
    id_agendamento: 104,
    valor_pago: 65.00,
    forma_pagamento: 'Cartão Débito',
    data_pagamento: subDays(hoje, 7).toISOString(),
    descricao: 'Corte feminino',
    id_profissional: 3,
    nome_profissional: 'Carlos Santos'
  },
  {
    id_pagamento: 5,
    id_agendamento: 105,
    valor_pago: 50.00,
    forma_pagamento: 'Dinheiro',
    data_pagamento: subDays(hoje, 6).toISOString(),
    descricao: 'Barba',
    id_profissional: 4,
    nome_profissional: 'Ana Pereira'
  },
  {
    id_pagamento: 6,
    id_agendamento: 106,
    valor_pago: 180.00,
    forma_pagamento: 'Cartão Crédito',
    data_pagamento: subDays(hoje, 5).toISOString(),
    descricao: 'Hidratação e corte',
    id_profissional: 2,
    nome_profissional: 'Maria Oliveira'
  },
  {
    id_pagamento: 7,
    id_agendamento: 107,
    valor_pago: 90.00,
    forma_pagamento: 'Pix',
    data_pagamento: subDays(hoje, 4).toISOString(),
    descricao: 'Progressiva',
    id_profissional: 1,
    nome_profissional: 'João Silva'
  },
  {
    id_pagamento: 8,
    id_agendamento: 108,
    valor_pago: 55.00,
    forma_pagamento: 'Cartão Débito',
    data_pagamento: subDays(hoje, 3).toISOString(),
    descricao: 'Corte infantil',
    id_profissional: 4,
    nome_profissional: 'Ana Pereira'
  },
  {
    id_pagamento: 9,
    id_agendamento: 109,
    valor_pago: 145.00,
    forma_pagamento: 'Cartão Crédito',
    data_pagamento: subDays(hoje, 2).toISOString(),
    descricao: 'Corte e escova',
    id_profissional: 3,
    nome_profissional: 'Carlos Santos'
  },
  {
    id_pagamento: 10,
    id_agendamento: 110,
    valor_pago: 60.00,
    forma_pagamento: 'Dinheiro',
    data_pagamento: subDays(hoje, 1).toISOString(),
    descricao: 'Corte masculino premium',
    id_profissional: 1,
    nome_profissional: 'João Silva'
  },
  {
    id_pagamento: 11,
    id_agendamento: 111,
    valor_pago: 130.00,
    forma_pagamento: 'Pix',
    data_pagamento: hoje.toISOString(),
    descricao: 'Tratamento capilar',
    id_profissional: 2,
    nome_profissional: 'Maria Oliveira'
  },
  {
    id_pagamento: 12,
    id_agendamento: 112,
    valor_pago: 70.00,
    forma_pagamento: 'Cartão Débito',
    data_pagamento: hoje.toISOString(),
    descricao: 'Barba modelada',
    id_profissional: 3,
    nome_profissional: 'Carlos Santos'
  },
  {
    id_pagamento: 13,
    id_agendamento: 113,
    valor_pago: 195.00,
    forma_pagamento: 'Cartão Crédito',
    data_pagamento: addDays(hoje, 1).toISOString(),
    descricao: 'Pacote completo',
    id_profissional: 4,
    nome_profissional: 'Ana Pereira'
  },
  {
    id_pagamento: 14,
    id_agendamento: 114,
    valor_pago: 80.00,
    forma_pagamento: 'Dinheiro',
    data_pagamento: addDays(hoje, 2).toISOString(),
    descricao: 'Corte moderno',
    id_profissional: 2,
    nome_profissional: 'Maria Oliveira'
  }
];

// Função para filtrar pagamentos por período, forma de pagamento e profissional
export const filtrarPagamentos = (
  dataInicio: Date, 
  dataFim: Date, 
  formaPagamento: string | null = null, 
  idProfissional: number | null = null
): Pagamento[] => {
  return pagamentosMock.filter(pagamento => {
    const dataPagamento = new Date(pagamento.data_pagamento);
    
    // Filtro por período
    const dentroDoPeríodo = 
      dataPagamento >= new Date(dataInicio.setHours(0, 0, 0, 0)) && 
      dataPagamento <= new Date(dataFim.setHours(23, 59, 59, 999));
    
    if (!dentroDoPeríodo) return false;
    
    // Filtro por forma de pagamento (se especificado)
    if (formaPagamento && pagamento.forma_pagamento !== formaPagamento) 
      return false;
      
    // Filtro por profissional (se especificado)
    if (idProfissional && pagamento.id_profissional !== idProfissional) 
      return false;
    
    return true;
  });
};

// Função para calcular o resumo financeiro
export const calcularResumoFinanceiro = (pagamentos: Pagamento[]) => {
  const receitas = pagamentos.reduce((total, pag) => total + pag.valor_pago, 0);
  
  // Por enquanto, estamos considerando as despesas como zero pois não temos uma tabela de despesas
  const despesas = 0;
  
  return {
    receitas,
    despesas,
    resultado: receitas - despesas
  };
};

// Função para calcular os totais por forma de pagamento
export const calcularTotaisPorFormaPagamento = (pagamentos: Pagamento[]) => {
  const totalGeral = pagamentos.reduce((total, pag) => total + pag.valor_pago, 0);
  
  const formasDePagamento = ['Dinheiro', 'Cartão Crédito', 'Cartão Débito', 'Pix'];
  
  return formasDePagamento.map(forma => {
    const pagamentosDestaForma = pagamentos.filter(pag => pag.forma_pagamento === forma);
    const total = pagamentosDestaForma.reduce((sum, pag) => sum + pag.valor_pago, 0);
    const percentual = totalGeral > 0 ? (total / totalGeral) * 100 : 0;
    
    return {
      forma,
      total,
      percentual
    };
  }).filter(item => item.total > 0);
};

// Função para obter o intervalo de datas do mês atual
export const obterIntervaloMesAtual = () => {
  const hoje = new Date();
  const primeiroDiaDoMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
  const ultimoDiaDoMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
  
  return {
    inicio: primeiroDiaDoMes,
    fim: ultimoDiaDoMes
  };
};
