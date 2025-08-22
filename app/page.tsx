
"use client";
import React, { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ThreeCanvas = dynamic(() => import("../components/ThreeCanvas"), {
  ssr: false,
  loading: () => null,
});
import ProjectModal from '../components/ProjectModal';
import { supabase } from '../lib/supabaseClient';
import type { Project } from '../types';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('projects').select('*').order('id', { ascending: false });
      if (error) {
        console.error('Error fetching projects:', error);
      } else {
        setProjects((data || []) as Project[]);
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    // Animate loader to 100% when projects are loaded
    const loader = document.getElementById('loader');
    const loaderBar = document.getElementById('loader-bar');
    const loaderText = document.getElementById('loader-text');
    if (!loader) return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      if (loaderBar) loaderBar.style.width = `${Math.min(progress, 100)}%`;
      if (loaderText) loaderText.textContent = `${Math.min(progress, 100)}%`;
      if (progress >= 100 || !loading) {
        clearInterval(interval);
        setTimeout(() => { loader.style.display = 'none'; }, 300);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [loading]);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground font-sans antialiased">
      <ThreeCanvas />
      <div className="content-wrapper max-w-7xl mx-auto p-4 md:p-8 relative z-10">
        <Header />
        <main className="grid grid-cols-1 lg:grid-cols-1 gap-8 md:gap-12">
          <section id="projects">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-black text-4xl md:text-5xl mb-6"
            >
              Projects
            </motion.h2>
            {loading ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-muted-foreground"
              >
                Loading projects...
              </motion.p>
            ) : (
              <motion.div
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {projects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 }
                    }}
                    onClick={() => openModal(project)}
                    className="group relative overflow-hidden border-2 border-border p-6 bg-background/80 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:shadow-lg dark:hover:shadow-primary/20"
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.h3 
                      className="font-black text-2xl md:text-3xl text-foreground"
                      initial={{ y: 0 }}
                      whileHover={{ y: -2 }}
                    >
                      {project.title}
                    </motion.h3>
                    <p className="mt-2 text-base text-muted-foreground">{project.subtitle}</p>
                    <div className="absolute inset-0 border-2 border-primary opacity-0 transition-opacity group-hover:opacity-100" />
                  </motion.div>
                ))}
              </motion.div>
            )}
            <div className="h-32 md:h-64 lg:h-96"></div>
          </section>
        </main>
        <Footer />
      </div>
      {isModalOpen && <ProjectModal project={selectedProject} onClose={closeModal} />}
    </div>
  );
}
