import { Scroll } from "lucide-react";

export const Loading = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-white">
      <div className="flex flex-col items-center justify-center space-y-8 p-8">
        <div className="relative">
          <Scroll className="w-16 h-16 text-amber-800 animate-pulse" />
          <span className="absolute inset-0 h-16 w-16 border-4 border-amber-800/20 border-t-amber-800 rounded-full animate-spin" />
        </div>
        
        <div className="flex flex-col items-center space-y-2">
          <p className="text-amber-900 text-2xl font-serif">Cargando...</p>
          <p className="text-amber-700/80 text-sm font-serif italic">
            "Lámpara es a mis pies tu palabra..."
          </p>
        </div>
        
        <div className="flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-amber-800/60 animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};