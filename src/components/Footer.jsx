const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 text-gray-400 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Mahesh. All rights reserved.
          </p>
          <p className="text-xs mt-2 text-gray-500 font-mono">
            initxmahesh
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

