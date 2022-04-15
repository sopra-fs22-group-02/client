import "styles/ui/MenuItem.scss";

export const MenuItem = props => (
  <button
    {...props}
    style={{width: props.width, ...props.style}}
    className={`menu-item ${props.className}`}>
    {props.children}
  </button>
);
