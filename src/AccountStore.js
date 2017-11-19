import Immutable from 'immutable';
import alt from './alt-instance';
import AccountActions from './AccountActions';
import { ChainStore } from 'fidchainjs/es';

class AccountStore {
  constructor() {
    // This might not need to be an immutable map, a normal structure might suffice..

    this.state = this._getInitialState();

    this.bindListeners({
      onAccountSearch: AccountActions.accountSearch,
      onGetFullAccount: AccountActions.getFullAccount,
      onGetAccount: AccountActions.getAccount,
      onUpdateRpcConnectionStatus: AccountActions.updateRpcConnectionStatus
    });
  }

  _getInitialState() {
    return {
      accounts: Immutable.Map(),
      rpc_connection_status: null,
      no_ws_connection: false,
      searchAccounts: Immutable.Map(),
      searchTerm: ""
    };
  }

  onAccountSearch(payload) {
    this.state.searchTerm = payload.searchTerm;
    this.state.searchAccounts = this.state.searchAccounts.clear();
    payload.accounts.forEach(account => {
        this.state.searchAccounts = this.state.searchAccounts.withMutations(map => {
            map.set(account[1], account[0]);
        });
    });
  }

  onGetFullAccount(account) {
    if (!this.state.accounts.get(account.id)) {
      this.state.accounts = this.state.accounts.set(account.id, account);
      console.warn("-------------AccountStore::onGetAccount - ", JSON.stringify(account));
    }
  }

  onGetAccount(account) {
    [account] = account;
    account = account.toJS();
    if (!this.state.accounts.get(account.name)) {
      this.state.accounts = this.state.accounts.set(account.name, account);
      console.warn("-------------AccountStore::onGetAccount - ", JSON.stringify(account));
    }
  }

  onUpdateRpcConnectionStatus(status) {
    let prev_status = this.state.rpc_connection_status;
    if (status === 'reconnect') ChainStore.resetCache();
    else this.state.rpc_connection_status = status;
    if (prev_status === null && status === 'error')
      this.state.no_ws_connection = true;
    if (this.state.no_ws_connection && status === 'open')
      this.state.no_ws_connection = false;
  }
}

export default alt.createStore(AccountStore, 'AccountStore');
