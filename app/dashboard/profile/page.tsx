export default function ProfilePage() {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-2xl p-8">
        {/* Bagian foto */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-24 h-24 rounded-full bg-red-500 flex items-center justify-center text-white text-lg font-bold">
            Foto
          </div>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600">
            Add Photo
          </button>
        </div>

        {/* Form Profile */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              placeholder="Enter your address"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job
            </label>
            <input
              type="text"
              placeholder="Enter your job"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              placeholder="Write something about yourself..."
              rows={4}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 shadow"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}
