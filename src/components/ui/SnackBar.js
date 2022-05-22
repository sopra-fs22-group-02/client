import "styles/ui/MenuItem.scss";
import { Alert } from '@mui/material';

export const SnackBar = (props) => {

    const alertsList = props.alerts ? props.alerts : [];

    console.log(`Alertslist: ${JSON.stringify(alertsList)}`);

    return (
        <div className="alerts">
            {
            alertsList.map((o, i) => (
                <Alert key={i} variant="filled" severity={o.severity ? o.severity : "info"}>
                    {o.message}
                </Alert>
            ))
            }
        </div>
        )
};
