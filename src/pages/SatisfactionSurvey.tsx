
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SatisfactionSurvey: React.FC = () => {
  const averageScore = 4.7;
  const totalResponses = 128;
  
  const ratings = [
    { stars: 5, count: 96, percentage: 75 },
    { stars: 4, count: 26, percentage: 20 },
    { stars: 3, count: 4, percentage: 3 },
    { stars: 2, count: 1, percentage: 1 },
    { stars: 1, count: 1, percentage: 1 }
  ];

  const comments = [
    { name: "Maria Silva", rating: 5, date: "15/03/2025", comment: "Serviço excelente! Adorei o resultado do meu cabelo." },
    { name: "João Santos", rating: 5, date: "12/03/2025", comment: "Atendimento muito profissional e pontual." },
    { name: "Ana Oliveira", rating: 4, date: "10/03/2025", comment: "Gostei do resultado, mas achei o preço um pouco alto." },
    { name: "Carlos Ferreira", rating: 5, date: "08/03/2025", comment: "Ótimo ambiente e profissionais muito atenciosos." },
    { name: "Juliana Costa", rating: 3, date: "05/03/2025", comment: "O serviço foi bom, mas esperava um pouco mais." }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Pesquisa de Satisfação</h1>
        <p className="text-sm text-gray-500 mt-1">
          Confira o feedback dos seus clientes
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <div className="bg-orange-50 border border-orange-200 text-orange-800 px-3 py-2 rounded-md text-sm">
          <span>Período: 01/03/2025 a 31/03/2025</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-trinks-blue mb-2">{averageScore.toFixed(1)}</div>
              <div className="flex justify-center my-2">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-6 h-6 ${i < Math.floor(averageScore) ? 'text-yellow-400' : 'text-gray-300'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-500 text-sm">Baseado em {totalResponses} avaliações</p>
            </div>

            <div className="mt-6 space-y-2">
              {ratings.map((rating) => (
                <div key={rating.stars} className="flex items-center">
                  <div className="w-16 text-sm">{rating.stars} estrelas</div>
                  <div className="flex-1 mx-2 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-trinks-blue" 
                      style={{ width: `${rating.percentage}%` }}
                    ></div>
                  </div>
                  <div className="w-12 text-sm text-right">{rating.percentage}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">Comentários Recentes</h2>
            <div className="space-y-4">
              {comments.map((comment, idx) => (
                <div key={idx} className="border-b pb-4 last:border-b-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">{comment.name}</p>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-4 h-4 ${i < comment.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {comment.date}
                    </Badge>
                  </div>
                  <p className="text-gray-600">{comment.comment}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold mb-4">Métricas de Satisfação</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border rounded-md p-4 text-center">
              <p className="text-sm text-gray-500">Taxa de Resposta</p>
              <p className="text-2xl font-bold text-trinks-blue">78%</p>
            </div>
            <div className="border rounded-md p-4 text-center">
              <p className="text-sm text-gray-500">NPS</p>
              <p className="text-2xl font-bold text-trinks-blue">82</p>
            </div>
            <div className="border rounded-md p-4 text-center">
              <p className="text-sm text-gray-500">Recomendariam</p>
              <p className="text-2xl font-bold text-trinks-blue">92%</p>
            </div>
            <div className="border rounded-md p-4 text-center">
              <p className="text-sm text-gray-500">Retornariam</p>
              <p className="text-2xl font-bold text-trinks-blue">87%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SatisfactionSurvey;
