import Immutable from 'immutable';
import alt from './alt-instance';
import AccountActions from './AccountActions';
import { ChainStore } from 'fidchainjs/es';

class AccountStore {
  constructor() {
    // This might not need to be an immutable map, a normal structure might suffice..
    this.accounts = Immutable.Map();
    this.rpc_connection_status = null;
    this.no_ws_connection = false;

    this.bindListeners({
      onGetAccount: AccountActions.getAccount,
      onUpdateRpcConnectionStatus: AccountActions.updateRpcConnectionStatus
    });
  }

  onGetAccount(account) {
    if (!this.accounts.get(account.id)) {
      this.accounts = this.accounts.set(account.id, account);
    }
  }

  onUpdateRpcConnectionStatus(status) {
    let prev_status = this.rpc_connection_status;
    if (status === 'reconnect') ChainStore.resetCache();
    else this.rpc_connection_status = status;
    if (prev_status === null && status === 'error')
      this.no_ws_connection = true;
    if (this.no_ws_connection && status === 'open')
      this.no_ws_connection = false;
  }
}

export default alt.createStore(AccountStore, 'AccountStore');
