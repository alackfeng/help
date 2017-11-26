import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import BaseComponent from './BaseComponent';
import Immutable from 'immutable';
import ChainTypes from 'lib/ChainTypes';

import AccountActions from 'stores/AccountActions';
import BindToChainState from 'lib/BindToChainState';

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


class Account extends Component {
  static propTypes = {
    name: PropTypes.string,
    synced: PropTypes.bool,
    account: ChainTypes.ChainAccount.isRequired,
  };

  static defaultProps = {
    account: null,
    name: null,
    synced: false
  };

  constructor(props) {
    super(props);
    console.log('------------- Account::constructor - ', props.name);

  }

  shouldComponentUpdate(nextProps) {
    console.log('------------- Account::shouldComponentUpdate - ', nextProps.name);
    return (
      nextProps.account != this.props.account
      || nextProps.name !== this.props.name
      || nextProps.synced !== this.props.synced
    );
  }

  _getAccount(name, force) {
    if (name) {
      if (force || (this.props.synced && this.props.account.get("id") !== name)) {
        AccountActions.getAccount(name);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('------------- Account::componentWillReceiveProps - ', 
      nextProps.name, this.props.name, nextProps.synced, this.props.synced);
    if (nextProps.synced || nextProps.name !== this.props.name) {
      this._getAccount(nextProps.name, true);
    }
  }

  componentDidMount() {
    console.log('------------- Account::componentDidMount - ', this.props.name);
    this._getAccount(this.props.name);
  }

  render() {
    let { synced, account } = this.props;
    let name, id = null;
    if(account) {
      id = account.get("id");
      name = account.get("name");
      console.log('------------- Account::render - account - ', name, JSON.stringify(account), synced);
    } else {
      console.log('------------- Account::render - account - ', synced);
    }
    

    if (!account) {
      return <div>No Account</div>;
    }
    return (
      <div style={{ 'textAlign': 'center' }}>
        {/*Account : <JSONTree
          data={account}
          theme={theme}
          invertTheme={false}
        />{' '} */}
       <h4 className="text-center">ACCOUNT #{id}/{name}</h4>
       <div>{account?<BaseFormat base={account} />:"Hello World"}</div>

      </div>
    );
  }
}

Account= BindToChainState(Account, { keep_updating: true });

class AccountWrapper extends Component {
  render() {
    return (
      <div>{this.props.synced ? <Account {...this.props} /> : null }</div>
    );
  }
}
export default AccountWrapper;
