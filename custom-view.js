/**
 * Created by puxiang on 2018/1/26.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
  View,
  requireNativeComponent,
  NativeModules,
} from 'react-native';

//requireNativeComponent函数中的第一个参数就是刚刚CircleManager.getName返回的值。
const RCTCustomView = requireNativeComponent('AndroidCustomView', {
  propTypes: {
    title: PropTypes.string,
    dialogue: PropTypes.string,
    ...View.propTypes // 包含默认的View的属性
  },
});
export default class CustomView extends Component {

  static propTypes = {
    title: PropTypes.string,
    dialogue: PropTypes.string,
    ...View.propTypes
  }

  render() {
    return (
      <RCTCustomView
        style={{width: 200, height: 200}}
        title={this.props.title}
        dialogue={this.props.dialogue}
      />
    )
  }

  setVisiable(){
    NativeModules.CustomViewMoudle.setTitleToggle(true).then(res=>{
      console.log('chenggong')
    }).catch(err=>{
      console.log('shibai')
    })
  }

}