import React, { Component } from 'react';
import AccountStore from "stores/AccountStore";
import BlockchainStore from 'stores/BlockchainStore';
import AltContainer from 'alt-container';
import Main from "./Main";

class MainContainer extends Component {
  render() {

    return (
      <AltContainer
        stores={[BlockchainStore, AccountStore]}
        inject={{
          blocks: () => {
            return BlockchainStore.getState().blocks;
          },
          accounts: () => {
            return AccountStore.getState().accounts;
          },
          searchAccounts: () => {
            return AccountStore.getState().searchAccounts;
          }
        }}
      >
        <Main {...this.props} />
      </AltContainer>
    );
  }
}

export default MainContainer;
