import HomeIntro from './HomeIntro';
import TerminalWindow from './TerminalWindow';

const Home = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 pt-24 pb-12 bg-black"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
        {/* Left — Intro Section */}
        <HomeIntro />

        {/* Right — Terminal Section */}
        <TerminalWindow />
      </div>
    </section>
  );
};

export default Home;

