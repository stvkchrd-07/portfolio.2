"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { FadeIn } from './animations/FadeIn';

interface HeaderProps {
  isBlog?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isBlog = false }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <FadeIn className="mb-12 md:mb-20">
      <header>
        <div className="flex flex-col md:flex-row justify-between md:items-center border-b-2 border-border pb-4 mb-4 dark:border-border">
          <Link href="/">
            <motion.h1
              whileHover={{ scale: 1.01 }}
              className="font-black text-5xl sm:text-6xl md:text-7xl tracking-tighter cursor-pointer hover:text-primary"
            >
              Satvik Chaturvedi
            </motion.h1>
          </Link>
          <motion.nav
            variants={container}
            initial="hidden"
            animate="show"
            className="mt-4 md:mt-0 flex items-center gap-4"
          >
            <motion.ul className="flex space-x-2" variants={container} initial="hidden" animate="show">
              <motion.li variants={item}>
                <a
                  href="https://x.com/StvkChrd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brutalist-hover block border-2 border-border p-3 font-bold hover:bg-primary hover:text-primary-foreground transition-colors"
                  title="X (Twitter)"
                >
                  X
                </a>
              </motion.li>
              <motion.li variants={item}>
                <a
                  href="https://www.linkedin.com/in/stvkchrd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brutalist-hover block border-2 border-border p-3 font-bold hover:bg-primary hover:text-primary-foreground transition-colors"
                  title="LinkedIn"
                >
                  in
                </a>
              </motion.li>
              <motion.li variants={item}>
                <a
                  href="mailto:satvikc73@gmail.com"
                  className="brutalist-hover block border-2 border-border p-3 font-bold hover:bg-primary hover:text-primary-foreground transition-colors"
                  title="Mail"
                >
                  @
                </a>
              </motion.li>
              <motion.li variants={item}>
                <Link
                  href="/blog"
                  className={`brutalist-hover block border-2 border-border px-4 py-3 font-bold hover:bg-primary hover:text-primary-foreground transition-colors ${
                    isBlog ? 'bg-primary text-primary-foreground' : ''
                  }`}
                >
                  BLOG
                </Link>
              </motion.li>
            </motion.ul>
            <motion.div variants={item} className="mt-0.5">
              <ThemeToggle />
            </motion.div>
          </motion.nav>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {isBlog ? (
            <p className="lekh-title text-2xl md:text-3xl font-extrabold mt-2 uppercase tracking-wider">
              लेख
            </p>
          ) : (
            <p className="pivot-experiment text-2xl md:text-3xl font-extrabold mt-2">
              Pivot &middot; Experiment &middot; Ship &middot; Scale
            </p>
          )}
        </motion.div>
      </header>
    </FadeIn>
  );
};

export default Header;