
import * as XLSX from 'xlsx';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Pagamento } from '@/types/financial';

// Função para formatar os dados para o Excel
export const formatPagamentosForExcel = (pagamentos: Pagamento[]) => {
  return pagamentos.map(pagamento => {
    // Formata o valor para moeda brasileira sem o símbolo
    const valorFormatado = pagamento.valor_pago.toLocaleString('pt-BR', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    // Determina o status com base no valor (positivo = Recebido, negativo = Pago)
    const status = pagamento.valor_pago >= 0 ? 'Recebido' : 'Pago';

    // Formata a forma de pagamento para exibição
    let formaPagamentoExibicao = pagamento.forma_pagamento;
    if (pagamento.forma_pagamento === 'Cartão Crédito') formaPagamentoExibicao = 'Cartão de Crédito';
    else if (pagamento.forma_pagamento === 'Cartão Débito') formaPagamentoExibicao = 'Cartão de Débito';

    return {
      'Data': format(new Date(pagamento.data_pagamento), 'dd/MM/yyyy'),
      'Descrição': pagamento.descricao || `Agendamento #${pagamento.id_agendamento}`,
      'Forma de Pagamento': formaPagamentoExibicao,
      'Profissional': pagamento.nome_profissional || '-',
      'Valor (R$)': valorFormatado,
      'Status': status
    };
  });
};

// Função principal para exportar dados para Excel
export const exportToExcel = (pagamentos: Pagamento[], fileName?: string) => {
  // Formata os dados para o Excel
  const data = formatPagamentosForExcel(pagamentos);

  // Cria uma nova planilha
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Cria um novo livro
  const workbook = XLSX.utils.book_new();

  // Adiciona a planilha ao livro
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Financeiro');

  // Define o nome do arquivo com data atual se não for fornecido
  const hoje = new Date();
  const nomeArquivo = fileName || `financeiro_${format(hoje, 'dd_MM_yyyy')}`;

  // Exporta o arquivo Excel
  XLSX.writeFile(workbook, `${nomeArquivo}.xlsx`);
};
