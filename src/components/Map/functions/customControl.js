import { Control } from "ol/control";

export class CustomControl extends Control {
  constructor(options) {

    const position = options.position || {
      'top': '100em',
      'left': '100em'
    };

    const width = options.width || '700px'
    const container = document.createElement('div');
    container.className = 'custom-control ol-unselectable ol-control';    
    container.style.top = position['top']
    container.style.left = position['left']
    container.classList.add('element-hidden')

    const button = document.createElement('button');
    let i = document.createElement('i');
    i.className = 'fa fa-' + options.icon
    
    button.appendChild(i);
    container.style.width = '3.15em'
    container.style.height = '3em'

    button.style.width = '2.4em'
    button.style.height = '2.2em'
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
          container.style.width = visible? '3.15em' : width;
          container.style.height = visible? '3em' : 'auto';
          button.style.position = visible ? '' : 'relative'; 
          button.style.left = visible ? '' : '-4px' 
          button.style.backgroundColor = visible ? '#efefef' : 'rgba(255,  255,  255,  0.01)'
          container.style.backgroundColor = visible ? 'rgba(255,  255,  255,  0.4)' : 'rgba(255,  255,  255,  0.6)'
          button.style.borderTop = visible ? 'solid #72787a 2px' : 'none'
          button.style.borderLeft = visible ? 'solid #72787a 2px' : 'none'
          button.style.borderRight = visible ? 'solid #212121 2px' : 'none'
          button.style.borderBottom = visible ? 'solid #212121 2px' : 'none'
          button.style.borderRadius = visible ? '2px' : 'none';
          i.className = visible ? 'fa fa-' + options.icon : 'fa fa-times'
      }
  }; 

    super({
      element: container,
      id: options.id,
      target: options.target,
      icon: options.icon,
      width: options.width,
      position: options.position 
    });
  }
}
