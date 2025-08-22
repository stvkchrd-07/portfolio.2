
import React from 'react';
import { notFound } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ThreeCanvas from '../../../components/ThreeCanvas';
import { marked } from 'marked';
import type { Post } from '../../../types';

async function getPost(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const post = await getPost(params.slug as string);

  if (!post) {
    notFound();
  }

  const postBodyHtml = marked.parse(post.content);

  return (
    <div className="relative min-h-screen bg-white text-black font-sans">
      <ThreeCanvas />
      <div className="content-wrapper max-w-7xl mx-auto p-4 md:p-8 relative z-10">
        <Header isBlog={true} />
        <main>
          <article className="border-2 border-black p-6 md:p-8 bg-white/80 backdrop-blur-sm">
            <p className="text-base mb-2">{new Date(post.date).toLocaleDateString()}</p>
            <h1 className="font-black text-3xl md:text-4xl mb-8">{post.title}</h1>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: postBodyHtml }}></div>
          </article>
          <div className="h-32 md:h-64 lg:h-96"></div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default PostPage;
