export function getBase64ImageSize(base64: string) {
    return new Promise((resolve, reject) => {
      // Converte a string base64 em um objeto Blob
      const blob = base64ToBlob(base64);
      if (!blob) {
        reject(new Error('Falha na conversão de base64 para Blob'));
        return;
      }
  
      // Cria um URL de objeto temporário
      const url = URL.createObjectURL(blob);
  
      // Carrega a imagem e obtém as dimensões
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
        URL.revokeObjectURL(url); // Libera o URL do objeto
      };
      img.onerror = () => {
        reject(new Error('Falha ao carregar a imagem'));
      };
  
      img.src = url;
    });
  }
  
  export function base64ToBlob(base64: string) {
    // Extrai o conteúdo de dados de base64
    const parts = base64.split(';base64,');
    if (parts.length !== 2) return null;
  
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
  
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
  
    return new Blob([uInt8Array], { type: contentType });
  }

  export function resizeAndCropImage(base64Image: string, dyTop: number, targetWidth: number, targetHeight: number, callback: any) {
    const img = new Image();
    img.src = base64Image;
  
    img.onload = () => {
      const canvas: any = document.getElementById('canvas');
      const context = canvas.getContext('2d');
      const aspectRatio = img.height / img.width;
      console.log("window: ", img.width*targetHeight/targetWidth, "recuo: ", dyTop)
      context.drawImage(img, 0, dyTop, img.width, img.height, 0, 0, targetWidth, targetHeight/aspectRatio);

      callback(canvas.toDataURL());
    };
  
    img.onerror = () => {
      callback(null, new Error("Erro ao carregar a imagem"));
    };
  }
  

  export function base64ToFile(base64: string, filename: string) {
    const parts = base64.split(';base64,');
    const imageType = parts[0].split(':')[1];
    const decodedData = window.atob(parts[1]);
    const byteNumbers = new Array(decodedData.length);
  
    for (let i = 0; i < decodedData.length; i++) {
      byteNumbers[i] = decodedData.charCodeAt(i);
    }
  
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: imageType });
  
    const file = new File([blob], filename, { type: imageType });
    return readFile(file)
  }

  export function readFile(file: File) {
    const fr = new FileReader();
  
    fr.onload = () => {
      // Processa o arquivo carregado
      console.log('Arquivo lido:', fr.result);
    };
  
    fr.onerror = () => {
      console.error('Erro ao ler o arquivo');
    };
  
    fr.readAsDataURL(file);
    return fr;
  }