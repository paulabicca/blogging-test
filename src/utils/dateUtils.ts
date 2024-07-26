import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatTimestamp = (timestamp?: string): string => {
  if (!timestamp) {
    return 'Data não disponível';
  }

  const date = new Date(timestamp);

  return format(date, 'd \'de\' MMM, yyyy', { locale: ptBR });
};

