
export interface Pagamento {
  id_pagamento: number;
  id_agendamento: number;
  valor_pago: number;
  forma_pagamento: 'Dinheiro' | 'Cartão Crédito' | 'Cartão Débito' | 'Pix';
  data_pagamento: string; // formato ISO
  descricao?: string;
  id_profissional?: number;
  nome_profissional?: string;
}

export interface Profissional {
  id_profissional: number;
  nome: string;
}

export interface FiltroFinanceiro {
  dataInicio: Date;
  dataFim: Date;
  formaPagamento: string | null;
  idProfissional: number | null;
}

export interface ResumoFinanceiro {
  receitas: number;
  despesas: number;
  resultado: number;
}

export interface DetalheFormaPagamento {
  forma: string;
  total: number;
  percentual: number;
}
