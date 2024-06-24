import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../api/FetchPorudcts';
import {
  useAddNewPostMutation,
  useGetDataByIdQuery,
  useGetDataQuery,
} from '../services/GetApiCall';

const DemoApp = () => {
  const dispatch = useDispatch();
  //const products = useSelector(state => state);
  //console.log(JSON.stringify(products));

  const { data, isError, isFetching, isLoading, isSuccess } = useGetDataQuery();
  console.log(data);

  const res = useGetDataByIdQuery(1);
  console.log('This is 1 ID Data =================>' + JSON.stringify(res));

  const [addPost] = useAddNewPostMutation();

  const addNewPost = async () => {
    try {
      const response = await addPost({
        title: 'test product',
        price: 13.5,
        description: 'lorem ipsum set',
        image: 'https://i.pravatar.cc',
        category: 'electronic',
      });
      console.log('This is add post===============================>', response);
    } catch (err) {
      console.error('Failed to add post: ', err);
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.conView}>
        <Text
          style={styles.textstyle}
          onPress={() => {
            dispatch(fetchProducts());
          }}
        >
          Api Call
        </Text>
        <Text
          style={styles.textstyle}
          onPress={() => {
            addNewPost();
          }}
        >
          Add New Post
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default DemoApp;

const styles = StyleSheet.create({
  conView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  textstyle: {
    padding: 20,
    borderWidth: 0.5,
  },
});
