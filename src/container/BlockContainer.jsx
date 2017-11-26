import React, { Component } from 'react';
import BlockchainStore from "stores/BlockchainStore";
import AltContainer from 'alt-container';
import Block from './Block';

class BlockContainer extends Component {
  render() {
    //let height = this.props.location.search.split("=")[1];
    let height = this.props.match.params ? this.props.match.params.height : "1";
    height = parseInt(height, 10);
    console.log('------------- BlockContainer::BlockContainer - ', height);
    return (
      <AltContainer
        stores={[BlockchainStore]}
        inject={{
          blocks: () => {
            return BlockchainStore.getState().blocks;
          },
        }}
      >
        <Block {...this.props} height={height} />
      </AltContainer>
    );
  }
}

export default BlockContainer;
