import React from "react";

const Body = () => {
  return (
    <div className="w-full min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Kiri atas */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Project<br />Management
          </h2>
          <p className="text-gray-500 mb-6 max-w-md">
            Images, videos, PDFs and audio files are supported. Create math expressions and diagrams directly from the app. Take photos with the mobile app and save them to a note.
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded transition-colors w-fit">
            Get Started &rarr;
          </button>
        </div>
        {/* Kanan atas */}
        <div className="flex justify-center items-center">
          <div className="w-[350px] h-[200px] bg-blue-200 rounded-lg opacity-60" />
        </div>
        {/* Kiri bawah */}
        <div className="flex justify-center items-center">
          {/* Lingkaran dengan dots */}
          <div className="relative w-[350px] h-[350px]">
            {/* Lingkaran luar */}
            <div className="absolute inset-0 rounded-full border-2 border-blue-100" />
            {/* Lingkaran dalam */}
            <div className="absolute inset-8 rounded-full border-2 border-blue-100" />
            {/* Dots */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2">
              <div className="w-8 h-8 bg-yellow-400 rounded-full" />
            </div>
            <div className="absolute right-0 top-1/4 -translate-y-1/2">
              <div className="w-8 h-8 bg-blue-400 rounded-full" />
            </div>
            <div className="absolute right-0 bottom-1/4 translate-y-1/2">
              <div className="w-8 h-8 bg-green-400 rounded-full" />
            </div>
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2">
              <div className="w-8 h-8 bg-blue-400 rounded-full" />
            </div>
            <div className="absolute left-0 bottom-1/4 translate-y-1/2">
              <div className="w-8 h-8 bg-yellow-400 rounded-full" />
            </div>
            <div className="absolute left-0 top-1/4 -translate-y-1/2">
              <div className="w-8 h-8 bg-red-400 rounded-full" />
            </div>
            {/* Dots dalam */}
            <div className="absolute left-1/2 top-8 -translate-x-1/2">
              <div className="w-6 h-6 bg-green-400 rounded-full" />
            </div>
            <div className="absolute right-8 top-1/2 -translate-y-1/2">
              <div className="w-6 h-6 bg-blue-400 rounded-full" />
            </div>
            <div className="absolute left-1/2 bottom-8 -translate-x-1/2">
              <div className="w-6 h-6 bg-blue-400 rounded-full" />
            </div>
            <div className="absolute left-8 top-1/2 -translate-y-1/2">
              <div className="w-6 h-6 bg-green-400 rounded-full" />
            </div>
            {/* Icon tengah */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M20 10L30 25H10L20 10Z" fill="#3B82F6"/>
              </svg>
            </div>
          </div>
        </div>
        {/* Kanan bawah */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Work <span className="text-gray-700">together</span>
          </h2>
          <p className="text-gray-500 mb-6 max-w-md">
            With whitespace, share your notes with your colleagues and collaborate on them. You can also publish a note to the internet and share the URL with others.
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