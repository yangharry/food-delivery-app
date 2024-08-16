import {useSelector} from 'react-redux';
import SocketClient, {Socket} from 'socket.io-client';
import {RootState} from '../store/reducer';
import {useCallback} from 'react';
import Config from 'react-native-config';

let socket: Socket | undefined;
const useSocket = (): [Socket | undefined, () => void] => {
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  const disconnect = useCallback(() => {
    if (socket && !isLoggedIn) {
      console.log(socket && !isLoggedIn, '웹소켓 연결을 해제합니다.');
      socket.disconnect();
      socket = undefined;
    }
  }, [isLoggedIn]);
  if (!socket && isLoggedIn) {
    console.log(!socket && isLoggedIn, '웹소켓 연결을 진행합니다.');
    socket = SocketClient(`${Config.API_URL}`, {transports: ['websocket']});
  }
  return [socket, disconnect];
};

export default useSocket;
