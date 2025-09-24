import React from "react";
import Link from "next/link";

const Body = () => {
  return (
    <div className="w-full min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Kiri atas */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Project
            <br />
            Management
          </h2>
          <p className="text-gray-500 mb-6 max-w-md">
            Images, videos, PDFs and audio files are supported. Create math
            expressions and diagrams directly from the app. Take photos with the
            mobile app and save them to a note.
          </p>
          <Link href="/register">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded transition-colors w-fit">
              Get Started &rarr;
            </button>
          </Link>
        </div>
        {/* Kanan atas */}
        <div className="flex justify-center items-center">
          <div className="w-[350px] h-[200px] bg-blue-200 rounded-lg opacity-60" />
        </div>
        {/* Kiri bawah */}
        <div className="flex justify-center items-center">
          {/* Lingkaran dengan dots */}
          <div className="relative w-[350px] h-[200px]"></div>
        </div>
        {/* Kanan bawah */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Work <span className="text-gray-700">together</span>
          </h2>
          <p className="text-gray-500 mb-6 max-w-md">
            With whitespace, share your notes with your colleagues and
            collaborate on them. You can also publish a note to the internet and
            share the URL with others.
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded transition-colors w-fit">
            Try it now &gt;&gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Body;
