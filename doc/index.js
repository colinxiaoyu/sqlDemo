/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  WebView,
  View, NativeModules,
} from 'react-native';

import PropTypes from 'prop-types';


import RNFetchBlob from 'react-native-fetch-blob'
const SHA1 = require('crypto-js/sha1');

export default class DOCView extends Component<{}> {

  state = {
    path: '',
  }


  componentDidMount() {
    const source = this.props.source;
    const cacheFile = RNFetchBlob.fs.dirs.CacheDir + '/' + SHA1(source.uri) + '.doc';

    // delete old cache file
    RNFetchBlob.fs.unlink(cacheFile);

    this._downloadFile(source, cacheFile);

    if (__DEV__) {
      console.log('componentDidMount cacheFile', cacheFile);
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {
          Platform.OS === 'android' && this.state.path ?
            <WebView
              style={{flex: 1}}
              source={{uri: this.state.path}}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
              scalesPageToFit={true}
            >
            </WebView> : null
        }
      </View>)
  }

  _downloadFile = (source, cacheFile) => {


    if (this.lastRNBFTask) {
      this.lastRNBFTask.cancel(err => {
      })
    }

    this.lastRNBFTask = RNFetchBlob.config({
      path: cacheFile,
    })
      .fetch(
        source.method ? source.method : 'GET',
        source.uri,
        source.headers ? source.headers : {}
      )
      .progress((received, total) => {
        this.props.onLoadProgress && this.props.onLoadProgress(received / total)
      });

    this.lastRNBFTask
      .then(res => {
        this.lastRNBFTask = null;
        this.openDoc(cacheFile);
        if (__DEV__) {
          console.log('cacheFile', cacheFile);
        }
      })
      .catch(error => {
        if (__DEV__) {
          console.warn(`download ${source.uri} error.`);
          console.log(error);
        }
        this.lastRNBFTask = null;
        RNFetchBlob.fs.unlink(cacheFile);
        this.props.onError && this.props.onError('load doc failed.');
      })
  };

  openDoc = (path) => {
    NativeModules.RNOpenDocModule.openDoc(path).then(res => {
      this.setState({
        path: res
      });
      if (__DEV__) {
        console.log('RNOpenDocModule', res);
      }
    })
  }
}

