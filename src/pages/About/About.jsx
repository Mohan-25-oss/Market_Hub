// src/pages/About/About.jsx
import React from "react";
import { motion } from "framer-motion";

const About = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-20 text-center shadow-md">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl font-extrabold tracking-wide"
                >
                    About Us
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-lg mt-4 opacity-95 max-w-2xl mx-auto"
                >
                    Discover who we are, what we do, and why our mission matters.
                </motion.p>
            </section>

            {/* Mission Section */}
            <main className="max-w-5xl mx-auto p-6 mt-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="bg-white p-8 rounded-xl shadow-lg border border-gray-200"
                >
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                        Our Mission
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-lg">
                        We dedicate ourselves to delivering high-quality, reliable, and
                        engaging content that empowers individuals through knowledge. Our
                        goal is to provide valuable insights that support learning, growth,
                        and informed decision-making across various fields.
                    </p>
                </motion.div>

                {/* Features */}
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                    {[
                        {
                            title: "High-Quality Content",
                            desc: "Every piece of content is researched, verified, and thoughtfully written.",
                        },
                        {
                            title: "User-Centered Approach",
                            desc: "We create with our community in mind, focusing on clarity and value.",
                        },
                        {
                            title: "Continuous Innovation",
                            desc: "We evolve daily, improving content and user experience.",
                        },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 35 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center hover:shadow-xl transition-shadow"
                        >
                            <h3 className="text-xl font-semibold text-gray-800">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 mt-2 leading-relaxed">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Story Section */}
                <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="mt-14 bg-white p-8 rounded-xl shadow-md border"
                >
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                        Our Story
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-lg">
                        We started with a vision: to create a platform that brings clarity,
                        depth, and value to people seeking reliable information. Over time,
                        our small idea grew into a global resource used by learners and
                        professionals looking for trustworthy content.
                    </p>
                </motion.div>
            </main>
        </div>
    );
};

export default About;
