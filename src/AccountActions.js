import alt from "./alt-instance";
import { Apis } from 'fidchainjs-ws';
import { ChainStore, FetchChain } from 'fidchainjs/es';


let accountSearch = {};


class AccountActions {


  /**
   *  Account search results are not managed by the ChainStore cache so are
   *  tracked as part of the AccountStore.
   */
  accountSearch(start_symbol, limit = 50) {
      let uid = `${start_symbol}_${limit}}`;
      return (dispatch) => {
          if (!accountSearch[uid]) {
              accountSearch[uid] = true;
              return Apis.instance().db_api().exec("lookup_accounts", [
                  start_symbol, limit
              ])
              .then(result => {
                  accountSearch[uid] = false;
                  dispatch({accounts: result, searchTerm: start_symbol});
              });
          }
      };
  }

  getFullAccount(name_or_id) {
    console.log('=========AccountActions::getFullAccount - name - ', name_or_id);
    return dispatch => {

      Apis.instance()
        .db_api()
        .exec('get_full_accounts', [[name_or_id],true])
        .then(result => {
          if (!result) {
            return false;
          }
          result.id = name_or_id; // The returned object for some reason does not include the block height..

          dispatch(result);
        })
        .catch(error => {
          console.log('Error in AccountActions.getAccount: ', error);
        });
    };
  }

  getAccount(name_or_id) {
    console.log('=========AccountActions::getAccount - name - ', name_or_id);
    return dispatch => {
      //ChainStore.getAccount(name_or_id);
      //console.log('=========AccountActions::getAccount - account - ', account);

      Promise.all([
        FetchChain("getAccount", name_or_id)
      ]).then((account) => {
        console.log("=========AccountActions::getAccount - FetchChain ", account);
        dispatch(account);
      }).catch(err => {
        console.error("=========AccountActions::getAccount - FetchChain ", err);
      });
      /*
      Apis.instance()
        .db_api()
        .exec('get_full_accounts', [[name_or_id],true])
        .then(result => {
          if (!result) {
            return false;
          }
          result.id = name_or_id; // The returned object for some reason does not include the block height..

          let account = ChainStore.getAccount(name_or_id);
          console.log('=========AccountActions::getAccount - account - ', account);

          dispatch(result);
        })
        .catch(error => {
          console.log('Error in AccountActions.getAccount: ', error);
        });*/
    };
  }
}

const AccountActionsInstance = alt.createActions(AccountActions);
export default AccountActionsInstance;
