import Immutable from 'immutable';
import alt from './alt-instance';
import HelpActions from './HelpActions';

const settingsAPIs = {
    DEFAULT_WS_NODE: "ws://39.108.154.111:11011",
    WS_NODE_LIST: [
        {url: "ws://39.108.154.111:11011", location: "AFT-node1-111"},
        {url: "ws://39.108.173.85:11011", location: "AFT-node2-85"},
        {url: "ws://119.23.40.206:11011", location: "AFT-node3-206"},
        {url: "ws://123.56.18.119:21014", location: "AFT-node4-119"},
    ],
};

class HelpStore {
  constructor() {

    this.beSynced = false;
    this.status = false;
    this.settings = settingsAPIs;

    this.bindListeners({
      onSetSync: HelpActions.setSync,
      onChange: HelpActions.change,
    });
  }

  onSetSync(sync) {
    this.beSynced = sync;
  }

  onChange(change) {
  	if(typeof change !== 'object')
  		return;
  	this.setState(change);
  }
}

export default alt.createStore(HelpStore, 'HelpStore');
