import { useState, useEffect, useRef } from 'react';
import { FaHome, FaArrowLeft, FaArrowRight, FaHistory, FaPiggyBank, FaUserCircle, FaChevronDown, FaChevronUp, FaUpload } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import OpenGraph from '../components/OpenGraph';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register')) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, location.pathname, navigate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setIsLoggedIn(false);
    setDropdownOpen(false);
    navigate('/login');
  };

  const goBack = () => navigate(-1);
  const goNext = () => navigate(1);
  const goHome = () => navigate('/');
  const goToPayment = () => navigate('/payment');
  const goToHistory = () => navigate('/withdrawal-history');

  return (
    <div className="flex flex-col min-h-screen">
      <OpenGraph />
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full p-4 text-white flex items-center justify-between z-50" 
              style={{ background: 'radial-gradient(circle at top right, #4b0082, #1c002c)' }}>
        <div className="flex items-center">
          <FaUpload className="mr-2 text-xl" />
          <h1 className="text-2xl font-bold">Vidify Host</h1>
        </div>
        <div className="flex items-center">
          {!isLoggedIn && (
            <button 
              onClick={() => navigate('/dashboard')} 
              className="mr-2 bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
            >
              Upload
            </button>
          )}
          {isLoggedIn && user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex flex-col items-center focus:outline-none"
              >
                <FaUserCircle className="text-white text-xl" />
                {dropdownOpen ? (
                  <FaChevronUp className="text-white mt-1 text-xs" />
                ) : (
                  <FaChevronDown className="text-white mt-1 text-xs" />
                )}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-gray-800 rounded-md shadow-lg z-10 transform transition duration-300 ease-out animate-fadeIn">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-white hover:bg-purple-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profil - {user.name || user.username || "User"}
                  </Link>
                  <Link
                    to="/payment-method"
                    className="block px-4 py-2 text-white hover:bg-purple-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Payment Method
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2 text-white hover:bg-purple-700"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 text-white pt-20" style={{ background: 'radial-gradient(circle at center, #1c002c, #0c0016)' }}>
        {children}
      </main>

      {/* Footer or Bottom Nav Bar with three conditions */}
      {
        isLoggedIn ? (
          <nav className="fixed bottom-0 left-0 w-full p-4 flex justify-around items-center z-50" 
              style={{ background: 'radial-gradient(circle at bottom left, #4b0082, #1c002c)' }}>
            <button onClick={goHome} className="flex flex-col items-center text-white">
              <FaHome className="text-2xl" />
              <span className="text-xs">Home</span>
            </button>
            <button onClick={goBack} className="flex flex-col items-center text-white">
              <FaArrowLeft className="text-2xl" />
              <span className="text-xs">Back</span>
            </button>
            <button onClick={goNext} className="flex flex-col items-center text-white">
              <FaArrowRight className="text-2xl" />
              <span className="text-xs">Next</span>
            </button>
            <button onClick={goToHistory} className="flex flex-col items-center text-white">
              <FaHistory className="text-2xl" />
              <span className="text-xs">History</span>
            </button>
            <button onClick={goToPayment} className="flex flex-col items-center text-white">
              <FaPiggyBank className="text-2xl" />
              <span className="text-xs">Saldo</span>
            </button>
          </nav>
        ) : (['/register', '/login'].includes(location.pathname) ? (
          <nav className="fixed bottom-0 left-0 w-full p-4 flex justify-around items-center z-50" 
              style={{ background: 'radial-gradient(circle at bottom left, #4b0082, #1c002c)' }}>
            <button onClick={goHome} className="flex flex-col items-center text-white">
              <FaHome className="text-2xl" />
              <span className="text-xs">Home</span>
            </button>
          </nav>
        ) : (
          <nav className="fixed bottom-0 left-0 w-full p-4 flex justify-around items-center z-50" 
              style={{ background: 'radial-gradient(circle at bottom left, #4b0082, #1c002c)' }}>
            <footer className="absolute bottom-0 left-0 w-full p-4 text-white text-center" 
                    style={{ background: 'radial-gradient(circle at bottom left, #4b0082, #1c002c)' }}>
              <p>© 2024 Vidify. All rights reserved.</p>
            </footer>
          </nav>
        ))
      }
    </div>
  );
};

export default Layout;
