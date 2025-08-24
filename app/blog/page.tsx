import React, { Suspense } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ThreeCanvas from '../../components/ThreeCanvas';
import BlogList from '../../components/BlogList';

export const dynamic = 'force-dynamic';

const BlogPage = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground font-sans">
      <ThreeCanvas />
      <div className="content-wrapper max-w-7xl mx-auto p-4 md:p-8 relative z-10">
        <Header isBlog={true} />
        <main>
          <section id="blog-posts">
            <Suspense fallback={<p>Loading posts...</p>}>
              <BlogList />
            </Suspense>
            <div className="h-32 md:h-64 lg:h-96"></div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default BlogPage;