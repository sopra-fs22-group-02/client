import "styles/ui/Box.scss";

const Box = props => (
    <h2
        {...props}
        style={{width: props.width, ...props.style}}
        className={`primary-box ${props.className}`}>
    
    </h2>
);
