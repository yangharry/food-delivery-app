import {View, Text, Platform, Alert, StyleSheet, Pressable} from 'react-native';
import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import {useAppDispatch} from '../store';
import axios from 'axios';
import Config from 'react-native-config';
import userSlice from '../slices/user';
import EncryptedStorage from 'react-native-encrypted-storage/';

const Settings = () => {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const dispatch = useAppDispatch();
  const onLogout = useCallback(async () => {
    try {
      await axios.post(
        __DEV__
          ? Platform.OS === 'ios'
            ? `${Config.DEV_IOS_API_URL}/logout`
            : `${Config.DEV_ANDROID_API_URL}/logout`
          : `${Config.API_URL}/logout`,
        {},
        {headers: {Authorization: `Bearer ${accessToken}`}},
      );
      Alert.alert('알림', '로그아웃 되었습니다.');
      dispatch(
        userSlice.actions.setUser({name: '', email: '', accessToken: ''}),
      );
      await EncryptedStorage.removeItem('refreshToken');
    } catch (err: any) {
      console.error(err);
    }
  }, [accessToken, dispatch]);
  return (
    <View>
      <View style={styles.buttonZone}>
        <Pressable
          style={StyleSheet.compose(
            styles.loginButton,
            styles.loginButtonActive,
          )}
          onPress={onLogout}>
          <Text style={styles.loginButtonText}>로그아웃</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonZone: {
    alignItems: 'center',
    paddingTop: 20,
  },
  loginButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
export default Settings;
