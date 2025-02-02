import { ActivityIndicator, FlatList, Image, Pressable, Text, TextInput, View } from 'react-native';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { useColorScheme } from 'react-native';

import { useNewsList } from '@/api/news';
import { useSearchHistory } from '@/hooks/useSearchHistory';

export default function News() {
  const colorScheme = useColorScheme();
  const [searchInput, setSearchInput] = useState('');
  const [submittedSearchInput, setSubmittedSearchInput] = useState('');
  const { searchHistory, loadHistory, addToHistory, clearHistory } = useSearchHistory();
  const { isLoading, error, data, refetch, isFetching } = useNewsList({ query: submittedSearchInput });

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const handleOnChangeText = (text) => {
    setSearchInput(text);
  };

  const handleOnSubmit = async () => {
    if (searchInput.trim()) {
      setSubmittedSearchInput(searchInput);
      await addToHistory(searchInput);
    }
  };

  const handleHistoryItemPress = (item) => {
    setSearchInput(item);
    setSubmittedSearchInput(item);
  };

  const renderNewsItem = ({ item }) => (
    <View className="p-4 border-b border-gray-200 dark:border-gray-800">
      <View className="flex-row">
        {item.urlToImage && <Image source={{ uri: item.urlToImage }} className="w-20 h-20 rounded mr-3" />}
        <View className="flex-1">
          <Text className="text-lg font-semibold text-black dark:text-white">{item.title}</Text>
          <Text className="text-gray-600 dark:text-gray-300 mt-2">{item.description}</Text>
          <Text className="text-gray-400 dark:text-gray-500 text-sm mt-2">
            {moment(item.publishedAt).format('MMM dd, yyyy HH:mm')}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      {/* SearchBar Section */}
      <View className="p-4">
        <Text className="text-lg font-semibold text-black dark:text-white">Search News</Text>
        <View className="flex-row items-center space-x-2">
          <TextInput
            className="flex-1 mt-2 p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
            placeholder="Enter a keyword"
            placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'}
            onChangeText={handleOnChangeText}
            value={searchInput}
            onSubmitEditing={handleOnSubmit}
            clearButtonMode='always'
          />
        </View>

        {/* Search History */}
        {searchHistory.length > 0 && (
          <View className="mt-2">
            <View className="flex-row justify-between items-center">
              <Text className="text-sm text-gray-500 dark:text-gray-400">Recent Searches</Text>
              <Pressable onPress={clearHistory}>
                <Text className="text-sm text-blue-500">Clear</Text>
              </Pressable>
            </View>
            <View className="flex-row flex-wrap mt-2">
              {searchHistory.map((item) => (
                <Pressable
                  key={item}
                  className="bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 mr-2 mb-2"
                  onPress={() => handleHistoryItemPress(item)}>
                  <Text className="text-gray-600 dark:text-gray-300">{item}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}
      </View>

      {/* NewsList Section */}
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text className="mt-2 text-gray-600 dark:text-gray-400">Loading news...</Text>
        </View>
      ) : error ? (
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-red-500 mb-2">Error: {error.message}</Text>
          <Pressable className="bg-blue-500 px-4 py-2 rounded" onPress={refetch}>
            <Text className="text-white font-semibold">Retry</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={data.articles}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderNewsItem}
          refreshing={isFetching}
          onRefresh={refetch}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center p-4">
              <Text className="text-gray-500 dark:text-gray-400">No news found. Try a different search term.</Text>
            </View>
          }
        />
      )}
    </View>
  );
}
