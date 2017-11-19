import Immutable from 'immutable';
import alt from './alt-instance';
import HelpActions from './HelpActions';

class HelpStore {
  constructor() {

    this.beSynced = false;

    this.bindListeners({
      onSetSync: HelpActions.setSync,
    });
  }

  onSetSync(sync) {
    this.beSynced = sync;
  }
}

export default alt.createStore(HelpStore, 'HelpStore');
