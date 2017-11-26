import alt from "alt-instance";
import { Apis } from 'assetfunjs-ws';


class HelpActions {

  setSync(sync) {
    console.log('=========HelpActions::setSync - sync - ', sync);
    return sync;
  }

  change(item) {
  	console.log('=========HelpActions::change - item - ', item);
  	return item;
  }

  node(node) {
  	console.log('=========HelpActions::change - node - ', node);
  	return node;
  }

}

export default HelpActions = alt.createActions(HelpActions);
