import Immutable from 'immutable';
import alt from './alt-instance';
import HelpActions from "./HelpActions";

import ls from "lib/localStorage";
const STORAGE_KEY = "__afthelp__";
const ss = new ls(STORAGE_KEY);


const settingsAPIs = {
    DEFAULT_WS_NODE: "ws://39.108.154.111:11011",
    WS_NODE_LIST: [
        {url: "ws://39.108.154.111:11011", location: "AFT-node1-online-111"},
        {url: "ws://39.108.173.85:11011", location: "AFT-node2-online-85"},
        {url: "ws://119.23.40.206:11011", location: "AFT-node3-206"},
        {url: "ws://123.56.18.119:21014", location: "AFT-node4-119"},
        {url: "ws://112.74.166.82:11011", location: "AFT-Test-82"},
    ],
};

class HelpStore {
  constructor() {

    this.beSynced = false;
    this.status = false;
    this.settings = {
        currentNode: ss.get("settings.currentNode", settingsAPIs.DEFAULT_WS_NODE),
        listNode: settingsAPIs.WS_NODE_LIST,
    };

    this.bindListeners({
      onSetSync: HelpActions.setSync,
      onChange: HelpActions.change,
      onNode: HelpActions.node,
    });

    this.exportPublicMethods({
        getSettings: this.getSettings
    });
  }

  getSettings() {
    let settings = {
        currentNode: ss.get("settings.currentNode", settingsAPIs.DEFAULT_WS_NODE),
        listNode: settingsAPIs.WS_NODE_LIST,
    }
    return settings;
  }

  onSetSync(sync) {
    this.beSynced = sync;
  }

  onNode(node) {
    // 
    ss.set("settings.currentNode", node.currentNode);
    this.setState(node);
  }
  onChange(change) {
  	if(typeof change !== 'object')
  		return;
  	this.setState(change);
  }
}

export default alt.createStore(HelpStore, 'HelpStore');
