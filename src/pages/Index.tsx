
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Navega para o dashboard
    navigate('/');
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-trinks-darkBlue">Carregando Trinks...</h1>
        <p className="text-xl text-gray-600">Por favor, aguarde enquanto carregamos seu dashboard.</p>
      </div>
    </div>
  );
};

export default Index;
