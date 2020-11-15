import logo from '@@/src/logo.png';
const component = (): HTMLElement => {
  const element: HTMLDivElement = document.createElement('div');
  const webpackLogo: HTMLImageElement = new Image();
  webpackLogo.src = logo;
  webpackLogo.width = 200;
  element.appendChild(webpackLogo);
  return element;
};
document.getElementById('root')?.appendChild(component());
