import Link from 'next/link';
import Navigation from '../components/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <img src="/StrawHatsLogo.svg" alt="A Straw Hat on a Pirate Skull and Crossbones making the One Piece Logo" className="w-32 h-32 mb-4 mx-auto" />
            <h1 className="text-4xl font-bold text-outer-space dark:text-gray-200 mb-2">
              OP Character Creator
            </h1>
            <p className="text-outer-space/70 dark:text-gray-300 text-lg">
              Generate your own One Piece-inspired character!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link
              href="/character"
              className="w-full bg-ripe-mango dark:bg-dark-ripe-mango hover:bg-ripe-mango/90 dark:hover:bg-dark-ripe-mango/90 text-outer-space dark:text-dark-outer-space font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center min-h-[56px] shadow-lg"
            >
              <span className="text-2xl mr-3">🎲</span>
              <div className="text-left">
                <div className="text-lg">Random Character</div>
                <div className="text-sm opacity-80">Generate instantly</div>
              </div>
            </Link>

            <Link
              href="/form"
              className="w-full bg-celtic-blue dark:bg-dark-celtic-blue hover:bg-celtic-blue/90 dark:hover:bg-dark-celtic-blue/90 text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center min-h-[56px] shadow-lg"
            >
              <span className="text-2xl mr-3">✏️</span>
              <div className="text-left">
                <div className="text-lg">Create Manually</div>
                <div className="text-sm opacity-80">Choose your traits</div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
