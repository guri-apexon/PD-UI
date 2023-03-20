import Typography from 'apollo-react/components/Typography';
import { useContext } from 'react';
import ChevronLeft from 'apollo-react-icons/ChevronLeft';
import ChevronRight from 'apollo-react-icons/ChevronRight';
import { TableEvents } from './Constants';
import TabelContext from './Context';
import './styles.css';

function ArrangePanel() {
  const { state, dispatch } = useContext(TabelContext);
  return (
    <div className="arrange-panel-container" data-testid="settings-button">
      <Typography
        className="arrange-panel-items-setting"
        onClick={() =>
          dispatch({
            type: TableEvents.SET_SETTINGS_OPEN,
            payload: !state.openSettings,
          })
        }
      >
        <div className="arrange-panel-items-setting-container">
          <Typography variant="title1" className="arrange-panel-items">
            Settings
          </Typography>
          {state.openSettings ? (
            <ChevronLeft style={{ color: 'white' }} />
          ) : (
            <ChevronRight style={{ color: 'white' }} />
          )}
        </div>
      </Typography>
    </div>
  );
}
export default ArrangePanel;
