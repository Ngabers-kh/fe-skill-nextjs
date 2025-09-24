import React from "react";

export default function ServiceSection() {
  return (
    <div className="bg-[#022C5C]">
      <div className="max-w-7xl mx-auto px-7">
        <div className="flex flex-col items-center justify-center py-30">
          <h1 className="text-6xl py-4 font-bold text-white">
            Your work, everywhere you are
          </h1>
          <p className="text-center py-4 text-white">
            Access your notes from your computer, phone or tablet by
            synchronising with various services, including whitepace, Dropbox
            and OneDrive. The app is available on Windows, macOS, Linux, Android
            and iOS. A terminal app is also available!
          </p>
          <a className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-3 rounded-md font-medium mt-10">
            Try Taskey →
          </a>
        </div>
      </div>
    </div>
  );
}
