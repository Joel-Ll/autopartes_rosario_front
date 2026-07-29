import api from '@/lib/axios';
import type { QuotationFormValues } from '@/types/sales/sales.type';

export const generateQuotationAction = async (formData: QuotationFormValues) => {
  try {
    const url = `/reports/quotation/pdf`;
    const { data } = await api.post(url, formData, {
      responseType: 'blob'
    });

    const blob = new Blob([data], { type: 'application/pdf' });
    const urlBlob = window.URL.createObjectURL(blob);

    // Crea un enlace temporal para descargar el archivo
    const a = document.createElement('a');
    a.href = urlBlob;
    a.download = 'cotización.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(urlBlob); 
  } catch (error) {
    throw new Error('No hay registros');
  }
};