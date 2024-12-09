import {View, Text, Platform, Alert, StyleSheet, Pressable} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import {useAppDispatch} from '../store';
import axios from 'axios';
import Config from 'react-native-config';
import userSlice from '../slices/user';
import EncryptedStorage from 'react-native-encrypted-storage/';

const Settings = () => {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const money = useSelector((state: RootState) => state.user.money);
  const name = useSelector((state: RootState) => state.user.name);

  const email = useSelector((state: RootState) => state.user.email);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getMoney() {
      const responese = await axios.get<{data: number}>(
        __DEV__
          ? Platform.OS === 'ios'
            ? `${Config.DEV_IOS_API_URL}/showmethemoney`
            : `${Config.DEV_ANDROID_API_URL}/showmethemoney`
          : `${Config.API_URL}/showmethemoney`,
        {headers: {Authorization: `Bearer ${accessToken}`}},
      );
      dispatch(userSlice.actions.setMoney(responese.data.data));
    }
    getMoney();
  }, [accessToken, dispatch]);

  const onDelete = useCallback(async () => {
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
      Alert.alert('알림', '회원탈퇴 되었습니다.');
      dispatch(
        userSlice.actions.setUser({name: '', email: '', accessToken: ''}),
      );
      await EncryptedStorage.removeItem('refreshToken');
    } catch (err: any) {
      console.error(err);
    }
  }, [accessToken, dispatch]);
  const logout = async () => {
    try {
      dispatch(
        userSlice.actions.setUser({name: '', email: '', accessToken: ''}),
      );
      await EncryptedStorage.removeItem('refreshToken');
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <View>
      <View style={styles.money}>
        <Text style={styles.moneyText}>
          {name}님의 수익금{' '}
          <Text style={{fontWeight: 'bold'}}>
            {money.toString().replace(/\B(?=(\d{3})+(?!\d))/, ',')}
          </Text>
        </Text>
      </View>
      <View style={styles.buttonZone}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 20,
            paddingHorizontal: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 16}}>내 이메일 : </Text>
          <Text style={{fontSize: 16}}>{email}</Text>
        </View>
        <Pressable
          style={StyleSheet.compose(
            styles.loginButton,
            styles.loginButtonActive2,
          )}
          onPress={onDelete}>
          <Text style={styles.loginButtonText}>회원탈퇴</Text>
        </Pressable>
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          style={StyleSheet.compose(
            styles.loginButton,
            styles.loginButtonActive,
          )}
          onPress={logout}>
          <Text style={styles.loginButtonText}>로그아웃</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  money: {
    padding: 20,
  },
  moneyText: {
    padding: 16,
  },
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
  loginButtonActive2: {
    backgroundColor: 'red',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
export default Settings;
