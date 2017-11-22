import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import BaseComponent from './BaseComponent';
import Immutable from 'immutable';
import ChainTypes from './ChainTypes';

import BindToChainState from './BindToChainState';

import BaseFormat from "./BaseFormat";

class Chain extends Component {
  static propTypes = {
    synced: PropTypes.bool,
    object: ChainTypes.ChainObject.isRequired,
  };

  static defaultProps = {
    object: null,
    synced: false
  };

  constructor(props) {
    super(props);
    console.log('------------- Account::constructor - ', props.synced);

  }

  shouldComponentUpdate(nextProps) {
    console.log('------------- Account::shouldComponentUpdate - ', nextProps.object);
    return (
      nextProps.object != this.props.object
      || nextProps.synced !== this.props.synced
    );
  }


  componentWillReceiveProps(nextProps) {
    console.log('------------- Account::componentWillReceiveProps - ', 
      nextProps.object, this.props.object, nextProps.synced, this.props.synced);

  }

  componentDidMount() {
    console.log('------------- Account::componentDidMount - ', this.props.synced);

  }

  render() {
    let { synced, object } = this.props;

    if (!object) {
      return <div>No Object</div>;
    }
    return (
      <div style={{ 'textAlign': 'left' }}>
      <div>{object?<BaseFormat base={object} />:"Hello World"}</div>
      </div>
    );
  }
}

export default BindToChainState(Chain, { keep_updating: true });

