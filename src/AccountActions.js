import alt from "./alt-instance";
import { Apis } from 'fidchainjs-ws';
import { ChainStore } from 'fidchainjs/es';

class AccountActions {

  getAccount(name_or_id) {
    console.log('=========AccountActions::getAccount - name - ', name_or_id);
    return dispatch => {
      console.log('=========AccountActions::getAccount - account - ', ChainStore.getAccount(name_or_id));

      Apis.instance()
        .db_api()
        .exec('get_account_by_name', [name_or_id])
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

  updateRpcConnectionStatus(status) {
    return status;
  }
}

const AccountActionsInstance = alt.createActions(AccountActions);
Apis.setRpcConnectionStatusCallback(
  AccountActionsInstance.updateRpcConnectionStatus
);

export default AccountActionsInstance;
