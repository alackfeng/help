import React, { Component } from 'react';
import HelpStore from "./HelpStore";
import AltContainer from 'alt-container';
import Chain from './Chain';

class ChainContainer extends Component {
  render() {
    //let height = this.props.location.search.split("=")[1];
    let object = this.props.match.params ? this.props.match.params.object : "2.1.0";
    console.log('------------- ChainContainer::BlockContainer - ', object);
    return (
      <AltContainer
        stores={[HelpStore]}
        inject={{
          synced: () => {
            return HelpStore.getState().beSynced;
          }
        }}
      >
        <Chain {...this.props} object={object} />
      </AltContainer>
    );
  }
}

export default ChainContainer;
