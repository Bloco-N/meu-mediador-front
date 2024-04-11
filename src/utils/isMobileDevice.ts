export function isMobileDevice() {
    if (typeof window === 'undefined') {
      return false;
    }
  
    const userAgent = window.navigator?.userAgent;
    const mobileKeywords = [
      'Android',
      'webOS',
      'iPhone',
      'iPad',
      'iPod',
      'BlackBerry',
      'Windows Phone'
    ];
  
    return mobileKeywords.some(keyword => userAgent.includes(keyword));
  }
  