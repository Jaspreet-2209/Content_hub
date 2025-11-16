import React, { useState, useEffect, useCallback } from "react";
import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd.css";
import "./styles.css"; 

const API_BASE_URL = "https://content-hub-uz2s.onrender.com";

const SearchIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const FileTextIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);
const LoaderIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);
const LogoIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </svg>
);
const SunIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m4.93 19.07 1.41-1.41" />
    <path d="m17.66 6.34 1.41-1.41" />
  </svg>
);
const MoonIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 3a6.364 6.364 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);
const SendIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const HelpCircleIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </svg>
);

const DocumentIcon = ({ format }) => {
  let iconClass = "text-gray-500";
  let label = format || "FILE";

  switch (String(format).toUpperCase()) {
    case "PDF":
      iconClass = "text-red-500";
      label = "PDF";
      break;
    case "DOCX":
      iconClass = "text-blue-500";
      label = "Word";
      break;
    case "XLSX":
      iconClass = "text-green-500";
      label = "Excel";
      break;
    case "PPTX":
      iconClass = "text-yellow-500";
      label = "Slides";
      break;
    default:
      iconClass = "text-gray-500";
      break;
  }

  return (
    <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-white dark:bg-gray-700 shadow-inner">
      <FileTextIcon className={`w-8 h-8 ${iconClass}`} />
      <span className={`text-xs font-semibold mt-1 ${iconClass}`}>{label}</span>
    </div>
  );
};

const DocumentCard = ({ doc }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01] border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row gap-4">
      <div className="flex-shrink-0">
        <DocumentIcon format={doc.format} />
      </div>
      <div className="flex-grow">
        <a
          href={doc.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl font-bold text-indigo-700 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-200 transition-colors duration-200"
        >
          {doc.title}
        </a>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{doc.content}</p>

        <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 rounded-full">
            {doc.category}
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-full">
            {doc.team} Team
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-full">
            Date: {new Date(doc.date).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="flex-shrink-0 flex items-center justify-end">
        <a
          href="./sample.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-indigo-600 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-md hover:bg-indigo-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          View / Preview
        </a>
      </div>
      
    </div>
  );
};

const AppHeader = ({ isDarkMode, onToggle }) => (
  <nav
    id="tour-header"
    className="sticky top-0 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-md dark:border-b dark:border-gray-700"
  >
    <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
      <div className="flex items-center gap-3">
        <LogoIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        <span className="text-xl font-bold text-gray-900 dark:text-white">Content Hub</span>
      </div>

      <button
        onClick={onToggle}
        className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? <SunIcon className="w-6 h-6 text-yellow-500" /> : <MoonIcon className="w-6 h-6 text-indigo-500" />}
      </button>
    </div>
  </nav>
);

const FeedbackForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null); 
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    setTimeout(() => {
      if (message && message.trim().length > 0) {
        setStatus("success");
        setEmail("");
        setMessage("");
        setTimeout(() => setStatus(null), 3000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus(null), 3000);
      }
    }, 900);
  };

  const isSubmitting = status === "sending";
  const isSuccess = status === "success";

  return (
    <div id="tour-feedback" className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg transition-colors duration-300">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">Provide Feedback</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Your Email (Optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <textarea
            placeholder="Your Message/Suggestion (Required)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="3"
            required
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isSuccess}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <LoaderIcon className="w-5 h-5 animate-spin" /> Sending...
            </>
          ) : isSuccess ? (
            "Thank You! Received."
          ) : (
            <>
              <SendIcon className="w-5 h-5" /> Submit Feedback
            </>
          )}
        </button>
        {status === "error" && <p className="text-sm text-red-500 mt-2">Please ensure the message field is filled out.</p>}
      </form>
    </div>
  );
};

const AppFooter = () => {
  const currentYear = new Date().getFullYear();
  const linkClasses = "text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200";
  const titleClasses = "text-lg font-bold text-gray-900 dark:text-white mb-3";

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="max-w-8xl mx-auto p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h4 className={titleClasses}>Content Hub</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Centralized platform for instant discovery of all marketing documents and digital assets. Built for efficiency and brand consistency.
          </p>
        </div>

        <div>
          <h4 className={titleClasses}>Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="#dashboard" className={linkClasses}>
                Dashboard
              </a>
            </li>
            <li>
              <a href="#assets" className={linkClasses}>
                Digital Assets
              </a>
            </li>
            <li>
              <a href="#campaigns" className={linkClasses}>
                Latest Campaigns
              </a>
            </li>
            <li>
              <a href="#help" className={linkClasses}>
                Help & Support
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className={titleClasses}>Resources</h4>
          <ul className="space-y-2">
            <li>
              <a href="#terms" className={linkClasses}>
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#privacy" className={linkClasses}>
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#sitemap" className={linkClasses}>
                Sitemap
              </a>
            </li>
          </ul>
        </div>

        <FeedbackForm />
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 py-4">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">&copy; {currentYear} Marketing Content Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const initializeTour = () => {
  try {
    if (!Shepherd) {
      console.warn("Shepherd is not available (import may have failed). Tour will not run.");
      return null;
    }

    const tour = new Shepherd.Tour({
      defaultStepOptions: {
        classes: "shadow-lg bg-white dark:bg-gray-800 rounded-lg p-3",
        scrollTo: true,
        cancelIcon: {
          enabled: true,
        },
      },
      useModalOverlay: true,
    });

    tour.addSteps([
      {
        id: "step-2-search",
        title: "Instant Search",
        text: "This is the <strong>Smart Search Bar</strong>. Just start typing, and results will instantly update below. No need to press Enter!",
        attachTo: { element: "#tour-search-bar", on: "bottom" },
        buttons: [{ text: "Next", action: tour.next, classes: "shepherd-button-primary" }],
      },
      {
        id: "step-3-filters",
        title: "Filter Tools",
        text: "Use these <strong>Category Filters</strong> to quickly narrow your search results by topic, project, or team.",
        attachTo: { element: "#tour-filters", on: "top" },
        buttons: [
          { text: "Back", action: tour.back },
          { text: "Next", action: tour.next, classes: "shepherd-button-primary" },
        ],
      },
      {
        id: "step-1-header",
        title: "Header & Dark Mode",
        text: "This is the main navigation header. Use the button on the right to toggle between <strong>Dark Mode</strong> and <strong>Bright Mode</strong>.",
        attachTo: { element: "#tour-header", on: "bottom" },
        buttons: [
          { text: "Back", action: tour.back },
          { text: "Next", action: tour.next, classes: "shepherd-button-primary" },
        ],
      },
      {
        id: "step-4-content",
        title: "Content Area",
        text: "The main <strong>Content Area</strong> displays all relevant documents. Each card shows the title, a summary, categorization, and a link to the original file.",
        attachTo: { element: "#tour-content-area", on: "top" },
        buttons: [
          { text: "Back", action: tour.back },
          { text: "Next", action: tour.next, classes: "shepherd-button-primary" },
        ],
      },
      {
        id: "step-5-feedback",
        title: "Feedback Form",
        text: "Finally, the <strong>Feedback Form</strong> in the footer is how you can submit suggestions or report issues with the Content Hub.",
        attachTo: { element: "#tour-feedback", on: "top" },
        buttons: [
          { text: "Back", action: tour.back },
          { text: "Finish Tour", action: tour.complete, classes: "shepherd-button-primary" },
        ],
      },
    ]);

    return tour;
  } catch (err) {
    console.error("Error initializing Shepherd tour:", err);
    return null;
  }
};

const WelcomeScreen = ({ onStartTour }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-lg" />
      <div className="relative bg-white dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-2xl max-w-lg w-full text-center transform transition-all duration-500 animate-fade-in">
        <LogoIcon className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-4 animate-bounce-slow" />
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">Welcome to Content Hub!</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Let us quickly guide you through the features of this new smart search dashboard.</p>

        <button
          onClick={onStartTour}
          className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          Start Guided Tour
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);
  const [showWelcome, setShowWelcome] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const storedValue = localStorage.getItem("darkMode");
      return storedValue === "true";
    } catch (e) {
      return false;
    }
  });

  const tourRef = React.useRef(null);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisitedContentHub");
    if (hasVisited !== "true") {
      const t = setTimeout(() => setShowWelcome(true), 120);
      return () => clearTimeout(t);
    }
    return undefined;
  }, []);
  
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) root.classList.add("dark");
    else root.classList.remove("dark");

    try {
      localStorage.setItem("darkMode", isDarkMode ? "true" : "false");
    } catch (err) {
      console.error("Could not persist dark mode:", err);
    }
  }, [isDarkMode]);

  const performSearch = useCallback(async (q, category) => {
    try {
      setLoading(true);
      
      const params = new URLSearchParams();
      if (q) params.append('q', q);
      if (category && category !== 'All') params.append('category', category);
      
      const response = await fetch(`${API_BASE_URL}/api/search?${params}`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      setResults(data.results || []);
      if (data.categories) {
        setCategories(['All', ...data.categories.filter(cat => cat !== 'All')]);
      }
    } catch (error) {
      console.error('Search API error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      performSearch(query, selectedCategory);
    }, 300);
    
    return () => clearTimeout(t);
  }, [query, selectedCategory, performSearch]);

  useEffect(() => {
    if (!tourRef.current) tourRef.current = initializeTour();

    const t = tourRef.current;
    if (!t) return;

    const onCompleteOrCancel = () => {
      try {
        localStorage.setItem("hasVisitedContentHub", "true");
      } catch (e) {
        // Ignore storage errors
      }
    };

    t.on("complete", onCompleteOrCancel);
    t.on("cancel", onCompleteOrCancel);

    return () => {
      try {
        t.off("complete", onCompleteOrCancel);
        t.off("cancel", onCompleteOrCancel);
      } catch (e) {
        // Ignore errors
      }
    };
  }, []);

  const startTour = () => {
    setShowWelcome(false);
    if (!tourRef.current) tourRef.current = initializeTour();
    if (tourRef.current) {
      try {
        tourRef.current.start();
      } catch (err) {
        console.error("Unable to start tour:", err);
      }
    }
  };

  const manualStartTour = () => {
    if (typeof window.confirm === "function") {
      if (!window.confirm("Do you want to restart the guided tour?")) return;
    }
    
    try {
      localStorage.removeItem("hasVisitedContentHub");
    } catch (e) {}
   
    setShowWelcome(false);
    if (!tourRef.current) tourRef.current = initializeTour();
    if (tourRef.current) {
      try {
        tourRef.current.start();
      } catch (err) {
        console.error("Unable to start tour:", err);
      }
    }
  };

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
  };

  const toggleDarkMode = () => setIsDarkMode((s) => !s);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300 flex flex-col">
      
      <style>{`
        .animate-bounce-slow { animation: bounce-slow 4s infinite; }
        @keyframes bounce-slow { 0%,100% { transform: translateY(-5%); } 50% { transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.45s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .shepherd-button-primary { background-color: #4f46e5 !important; color: white !important; }
        .shepherd-has-title .shepherd-content header { background: #6366f1 !important; color: white !important; }
        .shepherd-title { font-weight: 600 !important; }
        .dark .shepherd-content { background: #1f2937 !important; color: #e5e7eb !important; }
        .dark .shepherd-button { background: #374151 !important; color: #e5e7eb !important; }
        .dark .shepherd-button-primary { background: #818cf8 !important; color: #1f2937 !important; }
        .loader { animation: spin 1s linear infinite; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .slide-in { animation: slideIn 0.5s ease-out; }
        @keyframes slideIn { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
      `}</style>

      {showWelcome && <WelcomeScreen onStartTour={startTour} />}

      <AppHeader isDarkMode={isDarkMode} onToggle={toggleDarkMode} />

      <main className="flex-grow max-w-6xl mx-auto px-4 pt-10 w-full">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
              <span className="text-indigo-600 dark:text-indigo-400">Marketing</span> Search Dashboard
            </h1>
            <p className="mt-1 text-gray-500 dark:text-gray-400">Smart internal search across all documents. Updates instantly as you type.</p>
          </div>

          <button
            onClick={manualStartTour}
            className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/50 px-3 py-2 rounded-full font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors duration-200 shadow-md flex-shrink-0"
            aria-label="Restart tour guide"
          >
            <HelpCircleIcon className="w-5 h-5" />
          </button>
        </div>

        <div id="tour-search-bar" className="relative mb-8 shadow-xl rounded-2xl bg-white dark:bg-gray-800 transition-all duration-300">
          <div className="p-4 flex items-center border border-gray-200 dark:border-gray-700 rounded-2xl focus-within:ring-4 focus-within:ring-indigo-100 dark:focus-within:ring-indigo-800 transition-all duration-300">
            <span className="absolute left-6 flex items-center pointer-events-none">
              {loading ? <LoaderIcon className="w-5 h-5 text-indigo-500 dark:text-indigo-400 loader" /> : <SearchIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />}
            </span>

            <input
              type="text"
              placeholder="Type to search automatically..."
              className="flex-grow pl-12 pr-4 py-3 text-lg text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none bg-transparent"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        <div id="tour-filters" className="mt-8 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`text-sm font-semibold px-4 py-2 rounded-full transition-all ${selectedCategory === cat ? "bg-indigo-600 text-white shadow-md" : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-600 dark:hover:text-white"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div id="tour-content-area" className="mt-10 pb-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Results ({loading ? "..." : results.length})</h2>

          {loading && (
            <div className="p-12 text-center bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <LoaderIcon className="w-8 h-8 text-indigo-500 dark:text-indigo-400 animate-spin mx-auto" />
              <p className="text-lg text-indigo-600 dark:text-indigo-400 mt-3">Searching...</p>
            </div>
          )}

          {!loading && results.length === 0 && (
            <div className="p-12 text-center bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <p className="text-xl text-gray-500 dark:text-gray-400">No documents found.</p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="space-y-4">
              {results.map((doc) => (
                <DocumentCard key={doc.id} doc={doc} />
              ))}
            </div>
          )}
        </div>
      </main>

      <AppFooter />
    </div>
  );
};

export default App;
