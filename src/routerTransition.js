import { Manager } from 'assetfunjs-ws';
import { ChainStore } from 'assetfunjs/es';
import HelpStore from "stores/HelpStore";


ChainStore.setDispatchFrequency(15);

let connect = true;
let connectionManager;

const willTransitionTo = (nextState, replaceState, callback, nodes) => {

  nodes = nodes ? nodes : HelpStore.getSettings();
  let connectionString = nodes.currentNode || 'ws://123.56.18.119:21014';
  let urls = [connectionString]; //nodes.WS_NODE_LIST.map((obj) => { return obj.url}) || ['ws://123.56.18.119:21014'];
  //let connectionString = 'ws://119.23.40.206:11011';
  //let urls = ['ws://119.23.40.206:11011'];
  // 25406

  console.warn('--------->>>>>>>>>>>>>>>>>>>>> ', connectionString, typeof callback);
  //if (!connectionManager)
    connectionManager = new Manager({ url: connectionString, urls });

  let connectionCheckPromise = connectionManager.checkConnections();
  Promise.all([connectionCheckPromise]).then(res => {
    if (connectionCheckPromise && res[0]) {
      let [latencies] = res;
      console.log('--------- latencies ', latencies);
      connectionManager.urls = urls;
    }

    connectionManager
      .connectWithFallback(connect)
      .then(() => {
        console.log('--------- connect ', connect);
        try {
          ChainStore.init().then(() => {
            console.log('[App.jsx] ----- synced ----->', 'synced');
            callback('synced');
          }).catch(err => {
            console.error('[App.jsx] ----- synced ----->', err);
          });
          console.log('[App.jsx] ----- synced ----->:', false);
        } catch (e) {
          console.error('================e:', e);
        }
      })
      .catch(error => {
        console.error(
          '----- App.willTransitionTo error ----->',
          error,
          new Error().stack
        );
      });

    console.log('--------- res ', res);
  });

  console.log('--------- connectionCheckPromise ', connectionCheckPromise);
  // Every 25 connections we check the latencies of the full list of nodes
  if (connect)
    connectionManager.checkConnections().then(res => {
      console.log('----- Connection latencies:', res);
    });

  return callback('inited');
};

export default willTransitionTo;

