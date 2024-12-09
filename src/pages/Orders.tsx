import {View, Text, FlatList} from 'react-native';
import React, {useCallback} from 'react';
import {Order} from '../slices/order';
import {useAppSelector} from '../store';
import EachOrder from '../components/EachOrder';

const Orders = () => {
  const orders = useAppSelector(state => state.order.orders);
  const renderItem = useCallback(({item}: {item: Order}) => {
    return <EachOrder item={item} />;
  }, []);
  return (
    <View>
      <FlatList
        data={orders}
        keyExtractor={item => item.orderId}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Orders;
