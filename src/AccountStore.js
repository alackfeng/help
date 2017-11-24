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
    });
  }

  _getInitialState() {
    return {
      accounts: Immutable.Map(),
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

}

export default alt.createStore(AccountStore, 'AccountStore');
