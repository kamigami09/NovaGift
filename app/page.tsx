"use client";

import React, { useState } from "react";
import Hero from "@/components/Hero";
import Catalogue from "@/components/Catalogue";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Process from "@/components/Process";
import Stats from "@/components/Stats";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [isToastOpen, setIsToastOpen] = useState(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setIsToastOpen(true);
    setTimeout(() => setIsToastOpen(false), 3000);
  };

  return (
    <>

      <main className="flex-1">
        <Hero />

        {/* Homepage catalogue — mode="homepage" so "Demander" navigates to /produit/[slug] */}
        <Catalogue
          activeFilter={activeFilter}
          onSelectFilter={setActiveFilter}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <Stats />
        <About />
        <Testimonials />
        <Process />
        <FAQ />

        <Contact onShowToast={showToast} />
      </main>

      <Footer />

      <Toast message={toastMessage} isOpen={isToastOpen} />
    </>
  );
}
