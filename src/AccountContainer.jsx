import React from 'react';
import AltContainer from 'alt-container';
import AccountStore from "./AccountStore";
import HelpStore from "./HelpStore";
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
        <Account {...this.props} name={name} />
      </AltContainer>
    );
  }
}

export default AccountContainer;
