/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  WebView,
  Text,
  View, TouchableOpacity, FlatList, processColor,Dimensions
} from 'react-native';

import SQLite from 'react-native-sqlite-storage';
import CustomView from './custom-view';
import _ from 'lodash';
const {width,height} = Dimensions.get('window');


const userData = [{name: 'yuheng', age: 'sd', phone: '123444'},
  {name: 'yuheng', age: 'sd', phone: '123444'},
  {name: 'yuheng', age: 'sd', phone: '123444'},
  {name: 'yuheng', age: 'sd', phone: '123444'},
  {name: 'yuheng', age: 'sd', phone: '123444'},
  {name: 'yuheng', age: 'sd', phone: '123444'}];

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});

import DOCView from './doc/index';

export default class App extends Component<{}> {


  state = {
    inverted: false,
    data: [{name: 'yuddheng', age: 'sd', phone: '123444'},
      {name: 'yuheng', age: 'sd', phone: '123444'},
      {name: 'yuhggeng', age: 'sd', phone: '123444'},
      {name: 'yuhcveng', age: 'sd', phone: '123444'},
      {name: 'yuvvvvvvvheng', age: 'sd', phone: '123444'},
      {name: 'vvvvvvvvnnnnnyuheng', age: 'sd', phone: '123444'}],
    isRefreshing: false
  };


  componentWillMount() {
    this.timer = setTimeout(() => {
      this.setState({
        inverted: true,
      })
    }, 2000);

  }

  componentDidMount() {
    const a = {
      a:1,
      a:1
    };
    console.log('getkey',Object.keys(a).length);
    console.log('componentDidMount', this.state.inverted)

  }

  componentWillUnmount() {
    console.log('componentWillUnmount', this.state.inverted)

  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', this.state.inverted)

  }

  shouldComponentUpdate(nextProps) {
    return true;

  }

  componentWillUpdate() {
    console.log('componentWillUpdate', this.state.inverted)

  }

  componentDidUpdate() {
    console.log('componentDidUpdate', this.state.inverted);
    const check  = this.props.checked ?  this.props.checked : this.state.checked
    console.log('componentDidUpdate', check);

  }

  render() {
    // return (
    //   <View style={{flex: 1}}>
    //     <DOCView
    //       source={{uri: 'https://s3-ap-southeast-1.amazonaws.com/boss-job-assets/users/staging/358/resume/zcSopEEE6ctIDKDqAoFlVUBKERy2DokekSKj4XzK.doc'}}
    //     />
    //   </View>)
    return (
      <View style={{flex: 1,}}>
        <View style={{backgroundColor:'red',height:40,width:width}}>
          <Text style={{alignSelf:'center'}}>标题</Text>
        </View>
        <CustomView
          ref={(customView)=>this.customView = customView}
          style={{width: 100, height: 100}}
          title='abc'
          dialogue="我出来了"
        />

        <FlatList
          onRefresh={this._onRefresh}
          style={{flex: 1, marginTop: 40}}
          inverted={this.state.inverted}
          data={this.state.data}
          extraData={this.state}
          refreshing={this.state.isRefreshing}
          keyExtractor={(item, index) => index}
          renderItem={({item, index}) => {
            return (
              <View>
                <Text>{item.name}</Text>
              </View>
            )
          }}
        />
        <TouchableOpacity
          onPress={() => {
            this.setState({
              inverted: !this.state.inverted
            })

            this.customView.setVisiable();
          }}>
          <Text>点击我翻转</Text>
        </TouchableOpacity>
      </View>

    );

    // return (
    //   <View style={styles.container}>
    //     <Text style={styles.welcome}>
    //       Welcome to React Native!
    //     </Text>
    //     <Text style={styles.instructions}>
    //       To get started, edit App.js
    //     </Text>
    //     <TouchableOpacity
    //       onPress={
    //         () => {
    //           this.createTable();
    //         }
    //       }>
    //       <Text style={styles.instructions}>
    //         打开数据库，并创建表
    //       </Text>
    //     </TouchableOpacity>
    //
    //     <TouchableOpacity
    //       onPress={
    //         () => {
    //           this.insertIntoTable();
    //         }
    //       }>
    //       <Text style={styles.instructions}>
    //         插入数据
    //       </Text>
    //     </TouchableOpacity>
    //
    //     <TouchableOpacity
    //       onPress={
    //         () => {
    //           this._seleDataFromTB();
    //         }
    //       }>
    //       <Text style={styles.instructions}>
    //         查询数据
    //       </Text>
    //     </TouchableOpacity>
    //
    //   </View>
    // );
  }

  /**
   * 下拉刷新
   */
  _onRefresh = () => {
    //当前的页
    this._page = 1;

    this.setState({
      isRefreshing: true
    });
  };

  open = () => {
    window.db = SQLite.openDatabase("test.db", "1.0", "Test Database", 200000, () => {
    }, (err) => {
      console.log(err)
    });

  }

  createTable = () => {
    if (!window.db) {
      this.open();
    }
    const sql = 'CREATE TABLE IF NOT EXISTS USER(' +
      'id INTEGER PRIMARY KEY  AUTOINCREMENT,' +
      'name VARCHAR,' +
      'age VARCHAR,' +
      'phone VARCHAR)';
    //创建用户表
    window.db.transaction((tx) => {
      tx.executeSql(sql
        , [], () => {
          this._successCB('executeSql');
        }, (err) => {
          this._errorCB('executeSql', err);
        });
    }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
      this._errorCB('transaction', err);
      console.log('sql', sql)
    }, () => {
      this._successCB('transaction');
    })
  };

  insertIntoTable = () => {
    window.db.transaction((tx) => {
      for (let i = 0; i < userData.length; i++) {
        const user = userData[i];
        let name = user.name + i;
        let age = user.age;
        let phone = user.phone;
        let sql = "INSERT INTO USER(name,age,phone)" +
          "values(?,?,?)";
        tx.executeSql(sql, [name, age, phone], () => {

          }, (err) => {
            console.log(err);
          }
        );
      }
    }, (error) => {
      this._errorCB('transaction', error);
    }, () => {
      this._successCB('transaction insert data');
    });
  };

  _successCB = (name) => {
    console.log("SQLiteStorage " + name + " success");
  };

  _seleDataFromTB = () => {
    if (!window.db) {
      this.open();
    }
    const sql = 'SELECT * FROM USER';
    window.db.transaction((tx) => {
      tx.executeSql(sql, [], (tx, results) => {

        const len = results.rows.length;
        for (let i = 0; i < len; i++) {
          let USER = results.rows.item(i);
          console.log('_seleDataFromTB', `USER name: ${USER.name}, USER age: ${USER.age}, USER phone:  ${USER.phone}`);
        }

      });
    })
  };

  _errorCB = (name, err) => {
    console.log("SQLiteStorage " + name);
    console.log(err);
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
