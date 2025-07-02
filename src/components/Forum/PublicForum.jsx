import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Forum = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    // Fetch posts from the backend
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:4000/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostSubmit = async () => {
    if (newPost.trim() === '') return;

    try {
      const response = await fetch('http://localhost:4000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newPost })
      });

      if (response.ok) {
        const newPostData = await response.json();
        setPosts((prevPosts) => [newPostData, ...prevPosts]);
        setNewPost('');
      }
    } catch (error) {
      console.error('Error posting update:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{t('forum.title')}</h1>
      <div className="mb-4">
        <textarea
          className="w-full border p-2 rounded"
          placeholder={t('forum.placeholder')}
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          onClick={handlePostSubmit}
        >
          {t('forum.postButton')}
        </button>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">{t('forum.updatesTitle')}</h2>
        {posts.map((post, index) => (
          <div key={index} className="border p-4 mb-4 rounded">
            <p>{post.content}</p>
            <span className="text-sm text-gray-500">
              {new Date(post.timestamp).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;
