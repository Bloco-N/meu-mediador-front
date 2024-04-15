if (typeof window === 'undefined') {
  global.window = {};
}

import html2pdf from 'html2pdf.js';

export class PdfService {
  public async exportPdf(id:number, firstName: string, lastName: string, locale: string){
    try {
      // Verifique se o navegador suporta o download de arquivos
      if (typeof window !== 'undefined' && (typeof URL.createObjectURL === 'undefined' || typeof document.createElement('a').download === 'undefined')) {
        throw new Error('O navegador não suporta a funcionalidade de download de arquivos.');
      }

      // Carregue o conteúdo da URL fornecida em um iframe oculto
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = url;
      document.body.appendChild(iframe);

      // Aguarde um breve momento para garantir que o conteúdo seja carregado
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Capture o conteúdo do iframe e converta-o em PDF
      const pdfData = await this.captureIframeContentAsPdf(iframe.contentDocument.body);
      this.createAndDownloadBlobFile(pdfData, `${firstName}_${lastName}_profile`);

      // Remova o iframe após o download do PDF
      document.body.removeChild(iframe);
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
    }
  }

  private async captureIframeContentAsPdf(content: HTMLElement): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const pdf = html2pdf().from(content);
      pdf.toPdf().get('pdf').then(resolve).catch(reject);
    });
  }

  private createAndDownloadBlobFile(body: ArrayBuffer, filename: string, extension = 'pdf') {
    if (typeof window === 'undefined') {
      // Saia da função se não estiver em um ambiente de navegador
      return;
    }

    const blob = new Blob([body]);
    const fileName = `${filename}.${extension}`;
    const link = document.createElement('a');

    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url); // Limpeza
  }
}
