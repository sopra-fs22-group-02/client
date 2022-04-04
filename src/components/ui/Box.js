import "styles/ui/Box.scss";

export const Box = props => (
    <h1
        {...props}
        style={{width: props.width, ...props.style}}
        className={`primary-box ${props.className}`}
    >
    {props.value}
    </h1>
);
