/** @jsx devctor */
import "./styles.css";

function devctor(type, props, ...args) {
  const children = [].concat(...args);
  return {
    type,
    props,
    children
  };
}
function render(node) {
  if (typeof node.type === "function") {
    const result = node.type(node.props);
    return render(result);
  }

  const element = document.createElement(node.type);

  if (node.props) {
    Object.keys(node.props).map((key) => {
      return element.setAttribute(key, node.props[key]);
    });
  }

  node.children.forEach((child) => {
    if (typeof child === "string") {
      return element.appendChild(document.createTextNode(node.children));
    }

    return element.appendChild(render(child));
  });

  return element;
}

const Title = <h1 class="title">Hola Hector</h1>;
const Subtitle = ({ text }) => <h2>{text}</h2>;
const Menu = ({ name, secondName }) => (
  <ul>
    <li>{name}</li>
    <li>{secondName}</li>
  </ul>
);

document.body.appendChild(render(Title));
document.body.appendChild(
  render(<Subtitle text="Probando los componentes funcionales" />)
);
document.body.appendChild(render(<Subtitle text="desde Vanilla.js" />));
document.body.appendChild(render(<Menu name="Hector" secondName="Ary" />));
