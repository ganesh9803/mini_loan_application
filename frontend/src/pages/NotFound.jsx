const NotFound = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-semibold text-gray-700">404 - Page Not Found</h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-600">
            The page you are looking for does not exist or you are not authorized to view it.
          </p>
          <div className="mt-6">
            <a
              href="/home"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-700 transition duration-300"
            >
              Go Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  };
  
  export default NotFound;
  