import React, { Component } from 'react';
import BlockchainStore from './BlockchainStore';
import AltContainer from 'alt-container';
import Main from "./Main";

class MainContainer extends Component {
  render() {

    return (
      <AltContainer
        stores={[BlockchainStore]}
        inject={{
          blocks: () => {
            return BlockchainStore.getState().blocks;
          }
        }}
      >
        <Main />
      </AltContainer>
    );
  }
}

export default MainContainer;
