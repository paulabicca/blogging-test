import { useState, useEffect } from 'react';
import { formatTimestamp } from '../utils/dateUtils'; 
import { fetchData, Post } from '../types/dataType'; 
import { NestComments } from '../utils/NestComments';

interface useDataResult {
    post: Post | null;
    formattedDate: string;
    loading: boolean;
    error: string | null;
  }
  
  export const useData = (): useDataResult => {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    const formattedDate = post ? formatTimestamp(post.timestamp) : ''; 

    useEffect(() => {
      const loadPost = async () => {
        try {
          const fetchedData = await fetchData();
          const organizedComments = NestComments(fetchedData.comments);
          setPost({ ...fetchedData, comments: organizedComments });
          setPost(fetchedData);
        } catch (error) {
          setError("Erro ao carregar os dados.");
        } finally {
          setLoading(false);
        }
      };
      loadPost();
    }, []);
  
    return { post, formattedDate, loading, error };
  };
