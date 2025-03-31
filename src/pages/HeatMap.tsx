
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const HeatMap: React.FC = () => {
  // Hora de início do estabelecimento (8h)
  const startHour = 8;
  // Hora de fechamento do estabelecimento (20h)
  const endHour = 20;
  
  // Nomes dos dias da semana
  const weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  
  // Dados fictícios de fluxo para cada horário e dia da semana (0-100)
  const heatmapData = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Domingo
    [10, 20, 50, 80, 70, 60, 85, 90, 75, 60, 40, 20], // Segunda
    [15, 30, 55, 75, 65, 55, 80, 85, 70, 55, 35, 15], // Terça
    [20, 40, 65, 85, 75, 65, 90, 95, 80, 65, 45, 25], // Quarta
    [25, 45, 70, 90, 80, 70, 95, 100, 85, 70, 50, 30], // Quinta
    [30, 50, 75, 95, 85, 75, 90, 95, 80, 65, 45, 25], // Sexta
    [40, 60, 80, 95, 85, 75, 65, 55, 40, 30, 20, 10]  // Sábado
  ];

  // Mapeamento dos valores para tonalidades de cores
  const getHeatColor = (value: number) => {
    if (value === 0) return 'bg-gray-100';
    if (value < 20) return 'bg-blue-100';
    if (value < 40) return 'bg-blue-200';
    if (value < 60) return 'bg-blue-300';
    if (value < 80) return 'bg-blue-400';
    return 'bg-blue-500 text-white';
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Mapa de Calor</h1>
        <p className="text-sm text-gray-500 mt-1">
          Visualize os horários de maior movimento no seu estabelecimento
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <div className="bg-orange-50 border border-orange-200 text-orange-800 px-3 py-2 rounded-md text-sm">
          <span>Período: 01/03/2025 a 31/03/2025</span>
        </div>
      </div>

      <Tabs defaultValue="heatmap" className="mb-6">
        <TabsList>
          <TabsTrigger value="heatmap">Mapa de Calor</TabsTrigger>
          <TabsTrigger value="hourly">Análise por Hora</TabsTrigger>
          <TabsTrigger value="daily">Análise por Dia</TabsTrigger>
        </TabsList>

        <TabsContent value="heatmap">
          <Card>
            <CardHeader>
              <CardTitle>Mapa de Calor Semanal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="font-medium p-2 text-left">Dia/Hora</th>
                      {Array.from({ length: endHour - startHour }, (_, i) => (
                        <th key={i} className="font-medium p-2 text-center">
                          {startHour + i}:00
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {weekdays.map((day, dayIndex) => (
                      <tr key={day}>
                        <td className="font-medium p-2 border">{day}</td>
                        {Array.from({ length: endHour - startHour }, (_, hourIndex) => (
                          <td 
                            key={hourIndex} 
                            className={`p-2 border text-center ${getHeatColor(heatmapData[dayIndex][hourIndex])}`}
                          >
                            {heatmapData[dayIndex][hourIndex] > 0 ? `${heatmapData[dayIndex][hourIndex]}%` : '-'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 flex items-center justify-center gap-2">
                <div className="text-xs text-gray-500">Menos movimento</div>
                <div className="flex gap-1">
                  <div className="w-6 h-6 bg-blue-100 border"></div>
                  <div className="w-6 h-6 bg-blue-200 border"></div>
                  <div className="w-6 h-6 bg-blue-300 border"></div>
                  <div className="w-6 h-6 bg-blue-400 border"></div>
                  <div className="w-6 h-6 bg-blue-500 border"></div>
                </div>
                <div className="text-xs text-gray-500">Mais movimento</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hourly">
          <Card>
            <CardHeader>
              <CardTitle>Análise por Hora</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500">Gráfico de análise horária será exibido aqui</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="daily">
          <Card>
            <CardHeader>
              <CardTitle>Análise por Dia da Semana</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500">Gráfico de análise diária será exibido aqui</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Horários de Pico</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border rounded-md">
                <div>
                  <p className="font-medium">Principal Horário de Pico</p>
                  <p className="text-sm text-gray-500">Quinta-feira, 16:00 - 17:00</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">100%</p>
                  <p className="text-sm text-gray-500">de ocupação</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded-md">
                <div>
                  <p className="font-medium">Segundo Horário de Pico</p>
                  <p className="text-sm text-gray-500">Sexta-feira, 15:00 - 16:00</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">95%</p>
                  <p className="text-sm text-gray-500">de ocupação</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded-md">
                <div>
                  <p className="font-medium">Terceiro Horário de Pico</p>
                  <p className="text-sm text-gray-500">Quarta-feira, 16:00 - 17:00</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">95%</p>
                  <p className="text-sm text-gray-500">de ocupação</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Períodos de Baixa Frequência</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border rounded-md">
                <div>
                  <p className="font-medium">Domingo</p>
                  <p className="text-sm text-gray-500">Todo o dia</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">0%</p>
                  <p className="text-sm text-gray-500">de ocupação</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded-md">
                <div>
                  <p className="font-medium">Segunda a Sexta</p>
                  <p className="text-sm text-gray-500">08:00 - 09:00</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">10-30%</p>
                  <p className="text-sm text-gray-500">de ocupação</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded-md">
                <div>
                  <p className="font-medium">Segunda a Sexta</p>
                  <p className="text-sm text-gray-500">19:00 - 20:00</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">15-30%</p>
                  <p className="text-sm text-gray-500">de ocupação</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HeatMap;
