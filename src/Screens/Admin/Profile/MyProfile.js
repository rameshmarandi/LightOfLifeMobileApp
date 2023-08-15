import React, {Component} from 'react';
import {Text, View, Switch} from 'react-native';
import theme from '../../../utility/theme';
import {backgroundColorHandler, getAsyncValue, setAsyncValue, textColorHandler} from '../../../components/commonHelper';

import {connect} from 'react-redux';
import {store} from '../../../utility/store';
import {isDarkMode} from '../../../features/auth';
import { backgroundColor } from '../../../config/constants';

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: false,
    };
  }
  async componentDidMount() {}
  handleDarkMode = async () => {
    const res = await getAsyncValue('darkMode');
    if (typeof res == 'string' && res == 'false') {
      await setAsyncValue('darkMode', true);
      store.dispatch(isDarkMode(true));
    } else {
      await setAsyncValue('darkMode', false);
      store.dispatch(isDarkMode(false));
    }

  };
  render() {
    const{isDarkMode} = this.props
    return (
      <View
        style={{
          flex: 1,
          backgroundColor :backgroundColorHandler()
        }}>
        <Text>MyProfile</Text>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: '5%',
          }}>
          <Text
            style={{
              fontFamily: theme.font.semiBold,
              color:textColorHandler(),
              marginRight: '4%',
            }}>
            Dark Mode
          </Text>
          <Switch
            trackColor={{false: '#F9EDEA', true: theme.color.primary}}
            thumbColor={theme.color.primary}
            ios_backgroundColor="#3e3e3e"
            onValueChange={this.handleDarkMode}
            value={isDarkMode}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isDarkMode: state.auth.isDarkMode,
});

const mapDispatchToProps = {
  GetProductAPI: payload => dispatch(GetProductAPI(payload)),
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
