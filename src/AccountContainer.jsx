import React from 'react';
import AccountStore from './AccountStore';
import AltContainer from 'alt-container';
import Account from './Account';

class AccountContainer extends React.Component {
  render() {
    let name = this.props.match.params ? this.props.match.params.name : "";

    return (
      <AltContainer
        stores={[AccountStore]}
        inject={{
          accounts: () => {
            return AccountStore.getState().accounts;
          }
        }}
      >
        <Account {...this.props} name={name} />
      </AltContainer>
    );
  }
}

export default AccountContainer;
