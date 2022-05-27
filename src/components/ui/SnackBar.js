import "styles/ui/MenuItem.scss";
import { Alert, Button } from '@mui/material';

export const SnackBar = (props) => {

    const alertsList = props.alerts ? props.alerts : [];

    console.log(`Alertslist: ${JSON.stringify(alertsList)}`);

    return (
        <div className="alerts">
            {
            alertsList.map((o, i) => {

            const callback = o.callback ? o.callback : () => {};

            const action = o.action ? (
                <Button color="inherit" size="small" onClick={(e) => {e.preventDefault(); callback()}}>{o.buttonMsg ? o.buttonMsg : "CLICK"}</Button>
            ) : null;
        

            return (
                <Alert key={i} variant="filled" severity={o.severity ? o.severity : "info"} action={action ? action : ""}>
                    {o.message}
                </Alert>
            )}
        )
            }
        </div>
        )
};
