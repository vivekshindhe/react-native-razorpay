/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import RazorpayCheckout from 'react-native-razorpay';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Button
            title={'Pay with Razorpay'}
            onPress={() => {
              var options = {
                "order_id": "order_OUWYU0HsXRlBUP",
                "currency": "INR",
                "key":"rzp_test_QTKTXv39GiucD5",
                "ep":"https://api-web-appma.ext.dev.razorpay.in/test/checkout.html",
                "name": "prashant",
                "one_click_checkout": true,
                "customer_cart": {
                    "currency": "INR",
                    "value": "300.0",
                    "content_type": "product",
                    "contents": [
                        {
                            "id": 8089863487764,
                            "variant_id": 44358994428180,
                            "name": "Digital Testing Product",
                            "value": "100.0",
                            "quantity": 2
                        },
                        {
                            "id": 8009200566548,
                            "variant_id": 45182720311572,
                            "name": "Shirt",
                            "value": "100.0",
                            "quantity": 1
                        },
                        {
                            "id": 8009200566548,
                            "variant_id": 45182720311572,
                            "name": "Shirt",
                            "value": "100.0",
                            "quantity": 1
                        }
                    ]
                },
                "script_coupon_applied": true
              
                };
              RazorpayCheckout.open(options)
                .then(data => {
                  // handle success
                  alert(`Success: ${data.razorpay_payment_id}`);
                })
                .catch(error => {
                  // handle failure
                  alert(`Error: ${error.code} | ${error.description}`);
                });
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
