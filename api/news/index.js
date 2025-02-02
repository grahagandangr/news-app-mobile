import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';

export const useNewsList = ({ query = '' }) => {
  return useQuery({
    queryKey: ['news', query],
    queryFn: () => axios.get(`/everything?sources=bbc-news&sortBy=popularity&q=${query}`).then((res) => res.data),
  });
};
