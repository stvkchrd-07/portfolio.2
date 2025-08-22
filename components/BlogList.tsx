
import React from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';
import { marked } from 'marked';

async function getPosts() {
  const { data, error } = await supabase.from('posts').select('*').order('date', { ascending: false });
  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
  return data;
}

const BlogList = async () => {
  const posts = await getPosts();

  return (
    <div className="space-y-8">
      {posts.map(post => {
        const summaryMarkdown = post.content.substring(0, 250) + (post.content.length > 250 ? '...' : '');
        const summaryHtml = marked.parse(summaryMarkdown);

        return (
          <div key={post.id} className="border-2 border-black p-6 md:p-8 bg-white/80 backdrop-blur-sm">
            <p className="text-base mb-2">{new Date(post.date).toLocaleDateString()}</p>
            <h2 className="font-black text-3xl md:text-4xl mb-4">{post.title}</h2>
            <div className="text-lg mb-4 post-summary" dangerouslySetInnerHTML={{ __html: summaryHtml }}></div>
            <Link href={`/blog/${post.slug}`} className="font-bold underline hover:no-underline">
              Read More &rarr;
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default BlogList;
