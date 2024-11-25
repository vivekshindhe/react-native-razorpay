'use strict';

import { NativeModules, NativeEventEmitter } from 'react-native';

const razorpayEvents = new NativeEventEmitter(NativeModules.RazorpayEventEmitter);

const removeSubscriptions = () => {
  razorpayEvents.removeAllListeners('Razorpay::PAYMENT_SUCCESS');
  razorpayEvents.removeAllListeners('Razorpay::PAYMENT_ERROR');
  razorpayEvents.removeAllListeners('Razorpay::EXTERNAL_WALLET_SELECTED');
  razorpayEvents.removeAllListeners('Razorpay::MAGIC_X_RESPONSE');
};

class RazorpayCheckout {
  static open(options, successCallback, errorCallback) {
    return new Promise(function(resolve, reject) {
      razorpayEvents.addListener('Razorpay::PAYMENT_SUCCESS', (data) => {
        let resolveFn = successCallback || resolve;
        resolveFn(data);
        removeSubscriptions();
      });
      razorpayEvents.addListener('Razorpay::PAYMENT_ERROR', (data) => {
        let rejectFn = errorCallback || reject;
        rejectFn(data);
        removeSubscriptions();
      });
      NativeModules.RNRazorpayCheckout.open(options);
    });
  }

  static openMagicX(storefrontUrl, itemsJsonString, successCallback, errorCallback){
    return new Promise(function(resolve,reject){
      razorpayEvents.addListener('Razorpay::MAGIC_X_RESPONSE', (data) => {
        console.log("inside magicx response");
        console.log(JSON.stringify(data));
        let resolveFn = successCallback || resolve;
        resolveFn(data);
        removeSubscriptions();
      });
      NativeModules.RNRazorpayCheckout.openMagicX(storefrontUrl, itemsJsonString)
    });

  }

  static onExternalWalletSelection(externalWalletCallback) {
    razorpayEvents.addListener('Razorpay::EXTERNAL_WALLET_SELECTED', (data) => {
      externalWalletCallback(data);
      removeSubscriptions();
    });
  }
}

export default RazorpayCheckout;
