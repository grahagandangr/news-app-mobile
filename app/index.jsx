import { ActivityIndicator, FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { useNewsList } from '@/api/news';

export default function News() {
  const [searchInput, setSearchInput] = useState('');
  const [submittedSearchInput, setSubmittedSearchInput] = useState('');
  const { isLoading, error, data, refetch, isFetching } = useNewsList({ query: submittedSearchInput });

  const handleOnChangeText = (text) => {
    setSearchInput(text);
  };

  const handleOnSubmit = () => {
    setSubmittedSearchInput(searchInput);
  };

  return (
    <View className="flex-1 bg-white">
      {/* SearchBar Section */}
      <View className="p-4">
        <Text className="text-lg font-semibold text-black">Search News</Text>
        <View className="flex-row items-center space-x-2">
          <TextInput
            className="flex-1 mt-2 p-2 border border-gray-300 rounded"
            placeholder="Enter a keyword"
            onChangeText={handleOnChangeText}
            value={searchInput}
            onSubmitEditing={handleOnSubmit}
          />
        </View>
      </View>

      {/* NewsList Section */}
      {isLoading ? (
        <ActivityIndicator />
      ) : error ? (
        <Text>Error: {error.message}</Text>
      ) : (
        <FlatList
          data={data.articles}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View className="p-4 border-b border-gray-200">
              <Text className="text-lg font-semibold text-black">{item.title}</Text>
              <Text className="text-gray-600 mt-2">{item.description}</Text>
            </View>
          )}
          refreshing={isFetching}
          onRefresh={refetch}
        />
      )}
    </View>
  );
}
