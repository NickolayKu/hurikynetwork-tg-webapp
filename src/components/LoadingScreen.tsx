import { Loader, Loader2 } from "lucide-react";

interface LoadingScreenProps {
  isShowing: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isShowing }) => {
  return (
    <div className={`loading-screen min-h-screen flex bg-gray-950/40 fixed top-0 left-0 right-0 px-5 flex-col items-center justify-center text-center w-full ${isShowing ? 'showing' : ''}`}>
      <div className="flex items-center">
        <div className="w-12 h-12 flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-loader text-huriky-yellow/90" />
        </div>
      </div>
    </div>
  )
}


export default LoadingScreen;