'use client';

const Loading = () => {
  return (
    <>
      {/* Your main content */}
      <div className="min-h-screen dark:bg-black bg-white">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center p-8">
            <div className="text-6xl mb-4">🚀</div>
            <h1 className="text-4xl font-bold mb-2">Welcome to the App!</h1>
            <p className="text-xl text-gray-600">Your content is now ready</p>
          </div>
        </div>

        <div className="h-screen flex items-center justify-center bg-red-400">

        </div>
      </div>

    
    </>
  );
};

export default Loading;