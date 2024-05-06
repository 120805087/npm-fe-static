const loadScript = (src: string) => {
  const headElement = document.head || document.getElementsByTagName("head")[0];
  const _importedScript: any = {};

  return new Promise<void>((resolve, reject) => {
    if (src in _importedScript) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.onerror = (err) => {
      headElement.removeChild(script);
      reject(new URIError(`The Script ${src} is no accessible.`));
    };
    script.onload = () => {
      _importedScript[src] = true;
      resolve();
    };
    headElement.appendChild(script);
    script.src = src;
  });
};

export { loadScript };
