import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Immutable from 'immutable';

import BindToChainState from './BindToChainState';
import AccountActions from './AccountActions';

import BaseComponent from './BaseComponent';
import BaseFormat from "./BaseFormat";

//import JSONTree from 'react-json-tree';
/*
const theme = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#272822',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#a6e22e',
  base0C: '#a1efe4',
  base0D: '#66d9ef',
  base0E: '#ae81ff',
  base0F: '#cc6633'
}; */

class Account extends BaseComponent {
  static propTypes = {
    accounts: PropTypes.object.isRequired,
    name: PropTypes.string
  };

  static defaultProps = {
    accounts: {},
    name: null
  };

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return (
      !Immutable.is(nextProps.accounts, this.props.accounts) ||
      nextProps.name !== this.props.name || true
    );
  }

  _getAccount(name) {
    if (name) {
      if (!this.props.accounts.get(name)) {
        AccountActions.getAccount(name);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.name !== this.props.name) {
      this._getAccount(nextProps.name);
    }
  }

  componentDidMount() {
    this._getAccount(this.props.name);
  }

  render() {
    let { accounts } = this.props;
    let name = this.props.name;
    let account = accounts.get(name);
    console.log('------------- Account::render - account - ', name, account);

    if (!account) {
      //AccountActions.getAccount(name);
      return <div>No Account</div>;
    }
    return (
      <div style={{ 'text-align': 'left' }}>
        {/*Account : <JSONTree
          data={account}
          theme={theme}
          invertTheme={false}
        />{' '} */}
       <div>{account?<BaseFormat base={account} />:"Hello World"}</div>

      </div>
    );
  }
}

export default BindToChainState(Account, { keep_updating: true });
