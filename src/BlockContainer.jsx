import React, { Component } from 'react';
import BlockchainStore from './BlockchainStore';
import AltContainer from 'alt-container';
import Block from './Block';

class BlockContainer extends Component {
  render() {
    let height = this.props.location.search.split("=")[1];
    height = parseInt(height, 10);

    return (
      <AltContainer
        stores={[BlockchainStore]}
        inject={{
          blocks: () => {
            return BlockchainStore.getState().blocks;
          }
        }}
      >
        <Block {...this.props} height={height} />
      </AltContainer>
    );
  }
}

export default BlockContainer;
