import alt from "./alt-instance";
import { Apis } from 'fidchainjs-ws';


class HelpActions {

  setSync(sync) {
    console.log('=========HelpActions::setSync - sync - ', sync);
    return sync;
  }

}

export default HelpActions = alt.createActions(HelpActions);
