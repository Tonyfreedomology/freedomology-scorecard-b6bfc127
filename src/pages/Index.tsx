import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  console.log("Rendering welcome page");

  return (
    <div 
      className="min-h-screen flex items-start justify-center relative overflow-hidden"
      style={{
        backgroundImage: "url('https://static.wixstatic.com/media/af616c_493e2c122a7049cf84997445a1c30517~mv2.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Logo in top right corner */}
      <img 
        src="https://static.wixstatic.com/media/af616c_750d594b45cd42a4bb4f3290aad0fa61~mv2.png" 
        alt="Freedomology Logo" 
        className="absolute top-6 right-6 h-12 md:h-16 z-20 cursor-pointer hover:scale-105 transition-transform"
        onClick={() => navigate("/")}
      />
      
      <div className="relative z-10 w-full max-w-3xl mx-auto p-4 md:p-8 text-center space-y-6 md:space-y-8 pt-20 md:pt-28">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-sans px-2 md:px-4 text-[#3A4348]">
          How Free Are You?
        </h1>

        <div className="flex justify-center space-x-6 md:space-x-16">
          <div className="flex flex-col items-center space-y-2">
            <div className="relative">
              <div className="absolute inset-0 -m-2 rounded-full bg-[radial-gradient(circle,rgba(23,190,187,0.3)_0%,rgba(23,190,187,0)_70%)] animate-pulse" />
              <img 
                src="https://static.wixstatic.com/media/af616c_29340f0ac2544ea0b413a7d67075a5a2~mv2.png"
                alt="Financial icon"
                className="w-8 h-8 md:w-10 md:h-10 object-contain relative z-10"
              />
            </div>
            <span className="text-sm md:text-base font-medium text-[#3A4348]">Finances</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="relative">
              <div className="absolute inset-0 -m-2 rounded-full bg-[radial-gradient(circle,rgba(237,184,139,0.3)_0%,rgba(237,184,139,0)_70%)] animate-pulse" />
              <img 
                src="https://static.wixstatic.com/media/af616c_b6f5c191747244d3bd07ab3fce1bcf94~mv2.png"
                alt="Health icon"
                className="w-8 h-8 md:w-10 md:h-10 object-contain relative z-10"
              />
            </div>
            <span className="text-sm md:text-base font-medium text-[#3A4348]">Health</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="relative">
              <div className="absolute inset-0 -m-2 rounded-full bg-[radial-gradient(circle,rgba(239,62,54,0.3)_0%,rgba(239,62,54,0)_70%)] animate-pulse" />
              <img 
                src="https://static.wixstatic.com/media/af616c_4a5f9c62983540fb8acb46d96c216469~mv2.png"
                alt="Relationships icon"
                className="w-8 h-8 md:w-10 md:h-10 object-contain relative z-10"
              />
            </div>
            <span className="text-sm md:text-base font-medium text-[#3A4348]">Relationships</span>
          </div>
        </div>

        <div className="space-y-4 md:space-y-6 text-base md:text-lg lg:text-xl font-light leading-relaxed px-2 md:px-0 text-[#3A4348]">
          <p>
            Discover your Freedomology Score™ – a comprehensive measure of your freedom across financial, health, and relationship dimensions.
          </p>
          <p>
            Take our quick 10-minute assessment to understand where you stand and identify areas for growth in your journey to true freedom.
          </p>
        </div>

        <button
          onClick={() => {
            console.log("Starting assessment");
            navigate("/assessment");
          }}
          className="relative inline-flex items-center justify-center bg-[#17BEBB] text-white text-base md:text-lg px-8 py-4 rounded-full 
            before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-[#17BEBB] before:opacity-50 before:blur-2xl 
            hover:scale-105 transition-transform duration-300 overflow-hidden
            after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-gradient-to-r 
            after:from-transparent after:via-white/20 after:to-transparent after:animate-shimmer"
        >
          <span className="relative z-10 flex items-center gap-2">
            Find Out Your Score
            <ArrowRight className="h-5 w-5" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Index;