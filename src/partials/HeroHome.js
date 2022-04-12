import React from "react";
import { Link } from "react-router-dom";

export default function HeroHome() {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center md:text-left pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="pb-12 md:pb-16">
            <h1 className="banner-header text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4">
              Plan your <br className=" md:hidden " /> <span></span>
              <p className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                Your Way
              </p>
            </h1>
            <div className="max-w-3xl ">
              <p className="text-xl text-gray-600 mb-8">
                An incredible and totally new way to Organize your life Effortlessly.
              </p>
              <div className="sm:max-w-xs flex flex-wrap items-center sm:justify-start space-x-0 sm:space-x-3 space-y-2 sm:space-y-0">
                <Link
                  to="/register"
                  className="btn text-white bg-blue-600 hover:bg-blue-700 w-full sm:w-auto "
                  href="#0"
                >
                  Register
                </Link>
                <Link
                  className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4"
                  to="/"
                  href="#0"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
