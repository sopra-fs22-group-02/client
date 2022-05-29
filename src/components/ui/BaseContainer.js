import 'styles/ui/BaseContainer.scss';
import PropTypes from "prop-types";
import { SnackBar } from './SnackBar';
import { useState } from 'react';

const BaseContainer = props => {

  console.log(`Prop alerts: ${props.alerts}`)

  console.log(`Prop message: ${props.message}`)

  const [alerts, setAlerts] = useState(props.alerts ?? [])

  // const location = useLocation();

  // useEffect(() => {
  //   setAlerts([]);
  // }, [location])

  return (
    <div className='master-base'>
      <SnackBar alerts={alerts} />
      <div {...props} className={`base-container ${props.className ?? ''}`}>
        {props.children}
      </div>
    </div>
  )
  };

BaseContainer.propTypes = {
  children: PropTypes.node,
};

export default BaseContainer;