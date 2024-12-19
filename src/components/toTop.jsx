export default function ToTop({ isVisible }) {
    
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-5 right-3 p-3 bg-emerald-500 text-white rounded-full shadow-lg hover:bg-emerald-600 focus:outline-none transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
        >
            ↑
        </button>
    )
}