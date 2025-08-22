"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
    const [toastVisible, setToastVisible] = useState(false);
    const email = 'satvikc73@gmail.com';

    const copyEmailToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setToastVisible(true);
            setTimeout(() => setToastVisible(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <>
            <motion.footer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                id="contact"
                className="mt-20 pt-8 border-t-2 border-border bg-background/80 backdrop-blur-sm"
            >
                <div className="text-center">
                    <motion.p
                        className="mb-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <motion.span
                            onClick={copyEmailToClipboard}
                            className="text-foreground hover:text-primary cursor-pointer transition-colors"
                            whileHover={{ y: -2 }}
                        >
                            {email}
                        </motion.span>
                    </motion.p>
                    <p className="text-muted-foreground">
                        © {new Date().getFullYear()} Satvik Chaturvedi. All rights reserved.
                    </p>
                </div>
            </motion.footer>
            
            <AnimatePresence>
                {toastVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg dark:shadow-primary/20 z-50"
                    >
                        <p className="text-sm font-medium">Email copied to clipboard</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Footer;