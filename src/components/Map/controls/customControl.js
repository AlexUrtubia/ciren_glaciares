import {  Control, defaults as defaultControls } from "ol/control";


export class CustomControl extends Control {
  constructor(options) {

    const position = options.position || {
      'top': '100em',
      'left': '100em'
    };

    const container = document.createElement('div');
    container.className = 'custom-control ol-unselectable ol-control';    
    container.id = 'asdasd'
    container.style.top = position['top']
    container.style.left = position['left']
    container.classList.add('element-hidden')

    const button = document.createElement('button');
    let i = document.createElement('i');
    i.className = 'fa fa-' + options.icon
    
    button.appendChild(i);
    container.style.width = '40px'
    container.style.height = '35px'

    button.style.width = '30px'
    button.style.height = '25px'
    button.style.zIndex = '999'
    
    const content = document.createElement('div');
    content.style.visibility = 'hidden';
    content.style.display = 'none';
    content.innerHTML = options.content; // Contenido HTML personalizable
    
    container.appendChild(button);
    container.appendChild(content);
    
    button.onclick = (e) => {

      let trigger = true;

      if (trigger) {
          let visible = content.style.visibility === 'visible';
          content.style.visibility = visible ? 'hidden' : 'visible';
          content.style.display = visible ? 'none' : 'block';
          container.style.width = visible? '40px' : '550px';
          container.style.height = visible? '35px' : 'auto';
          // container.style.padding = visible? 'auto' : '';
          button.style.position = visible ? '' : 'relative'; 
          button.style.left = visible ? '' : '-4px' 
          button.style.backgroundColor = visible ? '#efefef' : 'rgba(255,  255,  255,  0.01)'
          button.style.border = visible ? 'solid #767676 1px' : 'none'
          button.style.borderRadius = visible ? '2px' : 'none';
          i.className = visible ? 'fa fa-' + options.icon : 'fa fa-times'
      }
  }; 

    super({
      element: container,
      target: options.target,
      icon: options.icon,
      position: options.position // Definir la posición del control
    });
  }
}
