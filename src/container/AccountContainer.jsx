import React from 'react';
import AltContainer from 'alt-container';
import AccountStore from "stores/AccountStore";
import HelpStore from "stores/HelpStore";
import Account from './Account';


class AccountContainer extends React.Component {
  render() {
    let name = this.props.match.params ? this.props.match.params.name : "";
    console.log('------------- AccountContainer::AccountContainer - ', name);
    return (
      <AltContainer
        stores={[AccountStore, HelpStore]}
        inject={{
          accounts: () => {
            return AccountStore.getState().accounts;
          },
          synced: () => {
            return HelpStore.getState().beSynced;
          }
        }}
      >
        <Account {...this.props} account={name} />
      </AltContainer>
    );
  }
}

export default AccountContainer;
