import React from 'react';
import { PropTypes } from 'prop-types';
import BaseComponent from './BaseComponent';
//import {FormattedDate} from "react-intl";
import Immutable from 'immutable';
import BlockchainActions from 'stores/BlockchainActions';
//import Transaction from "./Transaction";
//import Translate from "react-translate-component";
import ChainTypes from 'lib/ChainTypes';
import BindToChainState from 'lib/BindToChainState';
//import LinkToWitnessById from "./LinkToWitnessById";
//import JSONTree from 'react-json-tree';

import BaseFormat from "./BaseFormat";

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
};

class TransactionList extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.block.id !== this.props.block.id;
  }

  render() {
    let { block } = this.props;
    let transactions = null;

    transactions = [];

    if (block.transactions.length > 0) {
      transactions = [];

      block.transactions.forEach((trx, index) => {
        let trx_id = '';
        if (block.transaction_ids) {
          trx_id = block.transaction_ids[index];
        }
        transactions.push(JSON.stringify(trx));
      });
    }

    return <div>{transactions}</div>;
  }
}

class Block extends BaseComponent {
  static propTypes = {
    dynGlobalObject: ChainTypes.ChainObject.isRequired,
    blocks: PropTypes.object.isRequired,
    height: PropTypes.number.isRequired
  };

  static defaultProps = {
    dynGlobalObject: '2.1.0',
    blocks: {},
    height: 1
  };

  constructor(props) {
    super(props);
    this._bind('_previousBlock', '_nextBlock');
  }

  shouldComponentUpdate(nextProps) {
    return (
      !Immutable.is(nextProps.blocks, this.props.blocks) ||
      nextProps.height !== this.props.height// ||
      //nextProps.dynGlobalObject !== this.props.dynGlobalObject
    );
  }

  _getBlock(height) {
    if (height) {
      height = parseInt(height, 10);
      if (!this.props.blocks.get(height)) {
        BlockchainActions.getBlock(height);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.height !== this.props.height) {
      this._getBlock(nextProps.height);
    }
  }

  _nextBlock() {
    let height = this.props.height;
    let nextBlock = Math.min(
      this.props.dynGlobalObject.get('head_block_number'),
      parseInt(height, 10) + 1
    );
    //this.props.router.push(`/block/${nextBlock}`);
  }

  _previousBlock() {
    let height = this.props.height;
    let previousBlock = Math.max(1, parseInt(height, 10) - 1);
    //this.props.router.push(`/block/${previousBlock}`);
  }

  componentDidMount() {
    this._getBlock(this.props.height);
  }

  render() {
    let { blocks } = this.props;
    let height = parseInt(this.props.height, 10);
    let block = blocks.get(height);
    console.log('------------- Block::render - ', height, block);

    return (
      <div style={{ textAlign: 'center' }}>
        <h4 className="text-center">BLOCK: #{height}</h4>
        {/*<JSONTree data={block} theme={theme} invertTheme={false} />*/}
        {/*JSON.stringify(block) */}
        <div>{block?<BaseFormat base={block} />:"Hello World"}</div>
      </div>
    );
  }
}

export default BindToChainState(Block, { keep_updating: true });
