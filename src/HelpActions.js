import alt from "./alt-instance";
import { Apis } from 'fidchainjs-ws';


class HelpActions {

  setSync(sync) {
    console.log('=========HelpActions::setSync - sync - ', sync);
    return sync;
  }

  change(item) {
  	console.log('=========HelpActions::change - item - ', item);
  	return item;
  }

}

export default HelpActions = alt.createActions(HelpActions);
