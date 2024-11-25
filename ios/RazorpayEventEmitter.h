//
//  RazorpayEventEmitter.h
//  RazorpayCheckout
//
//  Created by Akshay Bhalotia on 19/09/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "RCTEventEmitter.h"



@interface RazorpayEventEmitter : RCTEventEmitter

+ (void)onPaymentSuccess:(NSString *)payment_id
                 andData:(NSDictionary *)response;
+ (void)onPaymentError:(int)code
           description:(NSString *)str
               andData:(NSDictionary *)response;
+ (void)onExternalWalletSelected:(NSString *)walletName
                         andData:(NSDictionary *)paymentData;
+ (void)onCheckoutUrlGenerated:(NSString *)checkoutUrl;
@end
