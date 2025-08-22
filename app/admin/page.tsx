"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import type { Project, Post } from '../../types';
import { useRouter } from 'next/navigation';

const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

const AdminPage = () => {
  const [user, setUser] = useState<any | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  const [newProject, setNewProject] = useState({ title: '', subtitle: '', description: '', imageUrl: '', liveUrl: '' });
  const [newPost, setNewPost] = useState({ title: '', date: '', content: '' });

  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        await Promise.all([fetchProjects(), fetchPosts()]);
        setLoading(false);
      } else {
        router.push('/login');
      }
    };
    checkUser();
  }, [router]);

  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const fetchProjects = async () => {
    const { data } = await supabase.from('projects').select('*').order('id', { ascending: false });
    setProjects((data || []) as Project[]);
  };

  const fetchPosts = async () => {
    const { data } = await supabase.from('posts').select('*').order('date', { ascending: false });
    setPosts((data || []) as Post[]);
  };

  const handleAddProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase.from('projects').insert([newProject]);
    if (error) {
      alert(error.message);
    } else {
      setNewProject({ title: '', subtitle: '', description: '', imageUrl: '', liveUrl: '' });
      fetchProjects();
      showSuccessMessage('Project added successfully!');
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const { error } = await supabase.from('projects').delete().match({ id });
      if (error) alert(error.message);
      else {
        fetchProjects();
        showSuccessMessage('Project deleted successfully!');
      }
    }
  };

  const handleAddPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const slug = slugify(newPost.title);
    const postWithSlug = { ...newPost, slug };
    const { error } = await supabase.from('posts').insert([postWithSlug]);
    if (error) {
      alert(error.message);
    } else {
      setNewPost({ title: '', date: '', content: '' });
      fetchPosts();
      showSuccessMessage('Post added successfully!');
    }
  };

  const handleDeletePost = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const { error } = await supabase.from('posts').delete().match({ id });
      if (error) alert(error.message);
      else {
        fetchPosts();
        showSuccessMessage('Post deleted successfully!');
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="p-4 md:p-8 bg-gray-100">
        {successMessage && (
            <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
                {successMessage}
            </div>
        )}
        <div className="content-wrapper max-w-7xl mx-auto">
            <header className="mb-12">
                <div className="flex justify-between items-center border-b-2 border-black pb-4">
                    <h1 className="font-black text-4xl md:text-6xl tracking-tighter">Admin Panel</h1>
                    <div>
                      <a href="/" className="underline hover:no-underline font-bold mr-4">← Back to Site</a>
                      <button onClick={handleLogout} className="underline hover:no-underline font-bold">Logout</button>
                    </div>
                </div>
            </header>

            <main className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <section id="manage-projects">
                    <h2 className="font-black text-3xl md:text-4xl mb-6">Manage Projects</h2>
                    <div className="border-2 border-black p-6 bg-white mb-8">
                        <h3 className="font-black text-2xl mb-4">Add New Project</h3>
                        <form onSubmit={handleAddProject}>
                            <input type="text" placeholder="Project Title" value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} className="w-full p-2 border-2 border-black mb-4" required />
                            <input type="text" placeholder="Subtitle" value={newProject.subtitle} onChange={(e) => setNewProject({ ...newProject, subtitle: e.target.value })} className="w-full p-2 border-2 border-black mb-4" required />
                            <textarea placeholder="Description" value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} className="w-full p-2 border-2 border-black mb-4" required />
                            <input type="url" placeholder="Image URL" value={newProject.imageUrl} onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })} className="w-full p-2 border-2 border-black mb-4" required />
                            <input type="url" placeholder="Live URL" value={newProject.liveUrl} onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })} className="w-full p-2 border-2 border-black mb-4" required />
                            <button type="submit" className="bg-black text-white font-bold py-2 px-4 border-2 border-black hover:bg-white hover:text-black">Add Project</button>
                        </form>
                    </div>
                    <h3 className="font-black text-2xl mb-4">Existing Projects</h3>
                    <div className="space-y-4">
                        {projects.map(p => (
                            <div key={p.id} className="border-2 border-black p-4 bg-white flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold text-xl">{p.title}</h4>
                                    <p>{p.subtitle}</p>
                                </div>
                                <button onClick={() => handleDeleteProject(p.id)} className="underline text-red-600">Delete</button>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="manage-blog">
                    <h2 className="font-black text-3xl md:text-4xl mb-6">Manage Blog</h2>
                    <div className="border-2 border-black p-6 bg-white mb-8">
                        <h3 className="font-black text-2xl mb-4">Add New Blog Post</h3>
                        <form onSubmit={handleAddPost}>
                            <input type="text" placeholder="Blog Title" value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} className="w-full p-2 border-2 border-black mb-4" required />
                            <input type="date" value={newPost.date} onChange={(e) => setNewPost({ ...newPost, date: e.target.value })} className="w-full p-2 border-2 border-black mb-4" required />
                            <textarea placeholder="Blog Content (Markdown)" value={newPost.content} onChange={(e) => setNewPost({ ...newPost, content: e.target.value })} className="w-full p-2 border-2 border-black mb-4 h-48" required />
                            <button type="submit" className="bg-black text-white font-bold py-2 px-4 border-2 border-black hover:bg-white hover:text-black">Add Post</button>
                        </form>
                    </div>
                    <h3 className="font-black text-2xl mb-4">Existing Posts</h3>
                    <div className="space-y-4">
                        {posts.map(p => (
                            <div key={p.id} className="border-2 border-black p-4 bg-white flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold text-xl">{p.title}</h4>
                                    <p>{new Date(p.date).toLocaleDateString()}</p>
                                </div>
                                <button onClick={() => handleDeletePost(p.id)} className="underline text-red-600">Delete</button>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    </div>
  );
};

export default AdminPage;