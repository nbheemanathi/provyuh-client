import React from "react";
import Header from "../partials/Header";
import HeroHome from "../partials/HeroHome";
export default function Home() {

  return (
    <div className="flex flex-col overflow-hidden">
      <Header />
      <main className="flex-grow">
        <HeroHome />
      </main>
    </div>
  );
}
