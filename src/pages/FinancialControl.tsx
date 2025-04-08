
import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, Info, Plus, Calendar, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, subMonths, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Pagamento, FiltroFinanceiro, ResumoFinanceiro } from '@/types/financial';
import { pagamentosMock, profissionais, filtrarPagamentos, calcularResumoFinanceiro, calcularTotaisPorFormaPagamento, obterIntervaloMesAtual } from '@/data/mockFinancial';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { exportToExcel } from '@/utils/excelExport';

const FinancialControl: React.FC = () => {
  // Estados para gerenciamento dos filtros e dados
  const [filtro, setFiltro] = useState<FiltroFinanceiro>({
    dataInicio: obterIntervaloMesAtual().inicio,
    dataFim: obterIntervaloMesAtual().fim,
    formaPagamento: null,
    idProfissional: null
  });
  const [periodoSelecionado, setPeriodoSelecionado] = useState<string>('month');
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [resumoFinanceiro, setResumoFinanceiro] = useState<ResumoFinanceiro>({
    receitas: 0,
    despesas: 0,
    resultado: 0
  });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  
  // Estados para o modal de novo lançamento
  const [novoLancamentoOpen, setNovoLancamentoOpen] = useState(false);
  const [novoLancamento, setNovoLancamento] = useState({
    descricao: '',
    valor: '',
    formaPagamento: 'Dinheiro',
    idProfissional: '',
    data: new Date(),
    tipo: 'receita'
  });
  
  // Efeito para carregar os dados quando o filtro mudar
  useEffect(() => {
    carregarDados();
  }, [filtro]);
  
  // Função para carregar todos os dados com base nos filtros
  const carregarDados = () => {
    // Filtra os pagamentos de acordo com os critérios
    const pagamentosFiltrados = filtrarPagamentos(
      filtro.dataInicio, 
      filtro.dataFim, 
      filtro.formaPagamento as 'Dinheiro' | 'Cartão Crédito' | 'Cartão Débito' | 'Pix' | null, 
      filtro.idProfissional
    );
    
    // Define os pagamentos filtrados
    setPagamentos(pagamentosFiltrados);
    
    // Calcula o resumo financeiro
    const resumo = calcularResumoFinanceiro(pagamentosFiltrados);
    setResumoFinanceiro(resumo);
  };
  
  // Função para alterar o período
  const alterarPeriodo = (periodo: string) => {
    setPeriodoSelecionado(periodo);
    
    const hoje = new Date();
    let dataInicio: Date;
    let dataFim: Date;
    
    switch (periodo) {
      case 'today':
        dataInicio = hoje;
        dataFim = hoje;
        break;
      case 'week':
        dataInicio = startOfWeek(hoje, { weekStartsOn: 1 });
        dataFim = endOfWeek(hoje, { weekStartsOn: 1 });
        break;
      case 'month':
        dataInicio = startOfMonth(hoje);
        dataFim = endOfMonth(hoje);
        break;
      case 'last_month':
        const ultimoMes = subMonths(hoje, 1);
        dataInicio = startOfMonth(ultimoMes);
        dataFim = endOfMonth(ultimoMes);
        break;
      case 'year':
        dataInicio = startOfYear(hoje);
        dataFim = endOfYear(hoje);
        break;
      default:
        return; // Mantém as datas atuais para 'custom'
    }
    
    setFiltro(prev => ({
      ...prev,
      dataInicio,
      dataFim
    }));
  };
  
  // Função para formatar o intervalo de datas
  const formatarPeriodo = () => {
    if (periodoSelecionado === 'today') {
      return format(filtro.dataInicio, "'Hoje,' dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    }
    
    return `${format(filtro.dataInicio, "dd 'de' MMMM", { locale: ptBR })} - ${format(filtro.dataFim, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}`;
  };
  
  // Função para formatar valores monetários
  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };
  
  // Função para salvar um novo lançamento
  const salvarNovoLancamento = () => {
    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!novoLancamento.descricao || !novoLancamento.valor || !novoLancamento.formaPagamento) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }
    
    // Na implementação real, aqui seria feita uma chamada à API para salvar os dados
    // Por enquanto, apenas simulamos a adição de um novo registro
    
    const valor = parseFloat(novoLancamento.valor.replace(',', '.'));
    
    if (isNaN(valor) || valor <= 0) {
      toast.error('O valor informado é inválido');
      return;
    }
    
    const profissionalSelecionado = profissionais.find(
      prof => prof.id_profissional === parseInt(novoLancamento.idProfissional)
    );
    
    const novoRegistro: Pagamento = {
      id_pagamento: pagamentosMock.length + 1,
      id_agendamento: Math.floor(Math.random() * 1000) + 200, // Simulando um ID de agendamento
      valor_pago: novoLancamento.tipo === 'receita' ? valor : -valor,
      forma_pagamento: novoLancamento.formaPagamento as 'Dinheiro' | 'Cartão Crédito' | 'Cartão Débito' | 'Pix',
      data_pagamento: novoLancamento.data.toISOString(),
      descricao: novoLancamento.descricao,
      id_profissional: profissionalSelecionado ? parseInt(novoLancamento.idProfissional) : undefined,
      nome_profissional: profissionalSelecionado ? profissionalSelecionado.nome : undefined
    };
    
    // Adiciona o novo registro ao array de pagamentos mockados
    pagamentosMock.push(novoRegistro);
    
    // Recarrega os dados para atualizar a interface
    carregarDados();
    
    // Fecha o modal e limpa o formulário
    setNovoLancamentoOpen(false);
    setNovoLancamento({
      descricao: '',
      valor: '',
      formaPagamento: 'Dinheiro',
      idProfissional: '',
      data: new Date(),
      tipo: 'receita'
    });
    
    // Exibe mensagem de sucesso
    toast.success('Lançamento registrado com sucesso');
  };
  
  // Função para exportar dados para Excel
  const exportarDados = () => {
    try {
      // Nome do arquivo baseado no período selecionado
      let nomeArquivo;
      
      // Gera um nome de arquivo baseado no período selecionado
      if (periodoSelecionado === 'today') {
        nomeArquivo = `financeiro_hoje_${format(new Date(), 'dd_MM_yyyy')}`;
      } else if (periodoSelecionado === 'month') {
        nomeArquivo = `financeiro_mes_${format(new Date(), 'MM_yyyy')}`;
      } else if (periodoSelecionado === 'year') {
        nomeArquivo = `financeiro_ano_${format(new Date(), 'yyyy')}`;
      } else {
        nomeArquivo = `financeiro_${format(filtro.dataInicio, 'dd_MM_yyyy')}_a_${format(filtro.dataFim, 'dd_MM_yyyy')}`;
      }
      
      // Exporta os dados filtrados para Excel
      exportToExcel(pagamentos, nomeArquivo);
      
      // Exibe mensagem de sucesso
      toast.success('Relatório financeiro exportado com sucesso');
    } catch (error) {
      console.error('Erro ao exportar dados:', error);
      toast.error('Ocorreu um erro ao exportar os dados. Tente novamente.');
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Controle financeiro</h1>
        <p className="text-sm text-gray-500 mt-1">
          Gerencie suas receitas e despesas com facilidade
        </p>
      </div>

      {/* Cabeçalho com filtros */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="bg-orange-50 border border-orange-200 text-orange-800 px-4 py-3 rounded-md w-full md:w-auto">
            <span className="font-medium">Período: {formatarPeriodo()}</span>
          </div>
          
          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
            <Select 
              value={periodoSelecionado} 
              onValueChange={alterarPeriodo}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="week">Esta semana</SelectItem>
                <SelectItem value="month">Este mês</SelectItem>
                <SelectItem value="last_month">Mês anterior</SelectItem>
                <SelectItem value="year">Este ano</SelectItem>
                <SelectItem value="custom">Personalizado</SelectItem>
              </SelectContent>
            </Select>
            
            <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Datas</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <div className="flex flex-col sm:flex-row gap-4 p-4">
                  <div className="space-y-2">
                    <Label htmlFor="data-inicio">Data inicial</Label>
                    <CalendarComponent
                      mode="single"
                      selected={filtro.dataInicio}
                      onSelect={(date) => date && setFiltro(prev => ({ ...prev, dataInicio: date }))}
                      initialFocus
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="data-fim">Data final</Label>
                    <CalendarComponent
                      mode="single"
                      selected={filtro.dataFim}
                      onSelect={(date) => date && setFiltro(prev => ({ ...prev, dataFim: date }))}
                      initialFocus
                    />
                  </div>
                </div>
                <div className="p-4 border-t border-border flex justify-end">
                  <Button 
                    onClick={() => {
                      setIsDatePickerOpen(false);
                      setPeriodoSelecionado('custom');
                    }}
                  >
                    Aplicar
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium">Filtros</h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="profissional">Profissional</Label>
                    <Select 
                      value={filtro.idProfissional?.toString() || "todos"} 
                      onValueChange={(value) => setFiltro(prev => ({ 
                        ...prev, 
                        idProfissional: value === "todos" ? null : parseInt(value) 
                      }))}
                    >
                      <SelectTrigger id="profissional">
                        <SelectValue placeholder="Todos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        {profissionais.map(prof => (
                          <SelectItem 
                            key={prof.id_profissional} 
                            value={prof.id_profissional.toString()}
                          >
                            {prof.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <Button variant="outline" onClick={exportarDados} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Exportar
            </Button>
          </div>
        </div>
      </div>

      {/* Resumo financeiro */}
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 mb-6">
        <div className="flex items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Resumo financeiro</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="ml-2 text-gray-400 hover:text-gray-500">
                  <Info className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Diferença entre receitas e despesas no período</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex justify-center mb-6">
          <div className={`text-5xl font-bold ${resumoFinanceiro.resultado >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatarMoeda(resumoFinanceiro.resultado)}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card de receitas */}
          <Card className="border-green-100 shadow-sm">
            <CardHeader className="pb-2 border-b border-green-100 bg-green-50 rounded-t-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-green-800">Receitas</h3>
                <div className="bg-green-100 p-2 rounded-full">
                  <ArrowUp className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-3xl font-semibold mb-4 text-green-700">{formatarMoeda(resumoFinanceiro.receitas)}</p>
              
              <Dialog open={novoLancamentoOpen && novoLancamento.tipo === 'receita'} onOpenChange={(isOpen) => {
                setNovoLancamentoOpen(isOpen);
                if (isOpen) setNovoLancamento(prev => ({ ...prev, tipo: 'receita' }));
              }}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-green-500 hover:bg-green-600">
                    Lançar receita 
                    <Plus className="w-4 h-4 ml-2" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Nova Receita</DialogTitle>
                    <DialogDescription>
                      Preencha os dados abaixo para registrar uma nova receita.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="descricao">Descrição</Label>
                      <Input
                        id="descricao"
                        value={novoLancamento.descricao}
                        onChange={(e) => setNovoLancamento({ ...novoLancamento, descricao: e.target.value })}
                        placeholder="Ex: Corte masculino"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="valor">Valor (R$)</Label>
                      <Input
                        id="valor"
                        type="text"
                        value={novoLancamento.valor}
                        onChange={(e) => {
                          // Permite apenas números e vírgula
                          const value = e.target.value.replace(/[^0-9,]/g, '');
                          setNovoLancamento({ ...novoLancamento, valor: value });
                        }}
                        placeholder="0,00"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="forma-pagamento-novo">Forma de Pagamento</Label>
                      <Select
                        value={novoLancamento.formaPagamento}
                        onValueChange={(value) => setNovoLancamento({ ...novoLancamento, formaPagamento: value })}
                      >
                        <SelectTrigger id="forma-pagamento-novo">
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                          <SelectItem value="Cartão Crédito">Cartão de Crédito</SelectItem>
                          <SelectItem value="Cartão Débito">Cartão de Débito</SelectItem>
                          <SelectItem value="Pix">Pix</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="profissional-novo">Profissional</Label>
                      <Select
                        value={novoLancamento.idProfissional}
                        onValueChange={(value) => setNovoLancamento({ ...novoLancamento, idProfissional: value })}
                      >
                        <SelectTrigger id="profissional-novo">
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          {profissionais.map(prof => (
                            <SelectItem 
                              key={prof.id_profissional} 
                              value={prof.id_profissional.toString()}
                            >
                              {prof.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label>Data</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "justify-start text-left font-normal",
                              !novoLancamento.data && "text-muted-foreground"
                            )}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {novoLancamento.data ? (
                              format(novoLancamento.data, "dd/MM/yyyy")
                            ) : (
                              <span>Selecione uma data</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={novoLancamento.data}
                            onSelect={(date) => date && setNovoLancamento({ ...novoLancamento, data: date })}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setNovoLancamentoOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={salvarNovoLancamento} className="bg-green-500 hover:bg-green-600">
                      Salvar receita
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
          
          {/* Card de despesas */}
          <Card className="border-red-100 shadow-sm">
            <CardHeader className="pb-2 border-b border-red-100 bg-red-50 rounded-t-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-red-800">Despesas</h3>
                <div className="bg-red-100 p-2 rounded-full">
                  <ArrowDown className="w-5 h-5 text-red-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-3xl font-semibold mb-4 text-red-700">{formatarMoeda(Math.abs(resumoFinanceiro.despesas))}</p>
              
              <Dialog open={novoLancamentoOpen && novoLancamento.tipo === 'despesa'} onOpenChange={(isOpen) => {
                setNovoLancamentoOpen(isOpen);
                if (isOpen) setNovoLancamento(prev => ({ ...prev, tipo: 'despesa' }));
              }}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-red-500 hover:bg-red-600">
                    Lançar despesa
                    <Plus className="w-4 h-4 ml-2" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Nova Despesa</DialogTitle>
                    <DialogDescription>
                      Preencha os dados abaixo para registrar uma nova despesa.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="descricao">Descrição</Label>
                      <Input
                        id="descricao"
                        value={novoLancamento.descricao}
                        onChange={(e) => setNovoLancamento({ ...novoLancamento, descricao: e.target.value })}
                        placeholder="Ex: Aluguel"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="valor">Valor (R$)</Label>
                      <Input
                        id="valor"
                        type="text"
                        value={novoLancamento.valor}
                        onChange={(e) => {
                          // Permite apenas números e vírgula
                          const value = e.target.value.replace(/[^0-9,]/g, '');
                          setNovoLancamento({ ...novoLancamento, valor: value });
                        }}
                        placeholder="0,00"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="forma-pagamento-novo">Forma de Pagamento</Label>
                      <Select
                        value={novoLancamento.formaPagamento}
                        onValueChange={(value) => setNovoLancamento({ ...novoLancamento, formaPagamento: value })}
                      >
                        <SelectTrigger id="forma-pagamento-novo">
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                          <SelectItem value="Cartão Crédito">Cartão de Crédito</SelectItem>
                          <SelectItem value="Cartão Débito">Cartão de Débito</SelectItem>
                          <SelectItem value="Pix">Pix</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label>Data</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "justify-start text-left font-normal",
                              !novoLancamento.data && "text-muted-foreground"
                            )}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {novoLancamento.data ? (
                              format(novoLancamento.data, "dd/MM/yyyy")
                            ) : (
                              <span>Selecione uma data</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={novoLancamento.data}
                            onSelect={(date) => date && setNovoLancamento({ ...novoLancamento, data: date })}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setNovoLancamentoOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={salvarNovoLancamento} className="bg-red-500 hover:bg-red-600">
                      Salvar despesa
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Seção de Lançamentos */}
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Lançamentos</h2>
          <Button variant="outline" size="sm" onClick={() => setNovoLancamentoOpen(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Novo lançamento
          </Button>
        </div>
        
        {pagamentos.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Forma de pagamento</TableHead>
                  <TableHead>Profissional</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagamentos.map((pagamento) => (
                  <TableRow key={pagamento.id_pagamento}>
                    <TableCell>{format(new Date(pagamento.data_pagamento), 'dd/MM/yyyy')}</TableCell>
                    <TableCell>{pagamento.descricao || `Agendamento #${pagamento.id_agendamento}`}</TableCell>
                    <TableCell>
                      {pagamento.forma_pagamento === 'Cartão Crédito' ? 'Cartão de Crédito' : 
                       pagamento.forma_pagamento === 'Cartão Débito' ? 'Cartão de Débito' : 
                       pagamento.forma_pagamento}
                    </TableCell>
                    <TableCell>{pagamento.nome_profissional || '—'}</TableCell>
                    <TableCell className="text-right font-medium">
                      <span className={pagamento.valor_pago < 0 ? 'text-red-600' : 'text-green-600'}>
                        {formatarMoeda(pagamento.valor_pago)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500 mb-2">Nenhum lançamento encontrado no período selecionado.</p>
            <p className="text-gray-400">Use os botões "Lançar receita" ou "Lançar despesa" para adicionar registros.</p>
          </div>
        )}
      </div>

      <div className="mt-12 border-t border-gray-200 pt-6 text-sm text-gray-500">
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#" className="hover:text-trinks-blue">Meu site</a>
          <a href="#" className="hover:text-trinks-blue">Trinks Ajuda</a>
          <a href="#" className="hover:text-trinks-blue">Blog</a>
          <a href="#" className="hover:text-trinks-blue">Fale Conosco</a>
          <a href="#" className="hover:text-trinks-blue">Contato</a>
        </div>
      </div>
    </div>
  );
};

export default FinancialControl;
