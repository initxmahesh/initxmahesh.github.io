const SKILLS = [
  'JavaScript',
  'React',
  'Node.js',
  'MongoDB',
  'Express',
  'TypeScript',
];

const FLOATING_ICONS = [
  { emoji: '⚛️', label: 'React', x: '-8%', y: '10%', delay: 0 },
  { emoji: '🟨', label: 'JS', x: '95%', y: '5%', delay: 0.3 },
  { emoji: '🟩', label: 'Node', x: '-12%', y: '65%', delay: 0.6 },
  { emoji: '🐙', label: 'GitHub', x: '92%', y: '70%', delay: 0.9 },
  { emoji: '🔷', label: 'TS', x: '5%', y: '90%', delay: 1.2 },
  { emoji: '🍃', label: 'Mongo', x: '88%', y: '40%', delay: 0.5 },
];

const HomeIntro = () => {

  return (
    <div className="relative flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
      {/* Floating tech icons */}
      {FLOATING_ICONS.map((icon) => (
        <div
          key={icon.label}
          className="absolute text-2xl md:text-3xl select-none pointer-events-none floating-icon"
          style={{
            left: icon.x,
            top: icon.y,
            animationDelay: `${1 + icon.delay}s`,
          }}
          aria-label={icon.label}
        >
          {icon.emoji}
        </div>
      ))}

      {/* Terminal prompt */}
      <p className="font-mono text-sm terminal-glow mb-3 text-green-400">
        $ whoami
      </p>

      {/* Name */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
        Hi, I'm{' '}
        <span className="terminal-glow text-green-400">Mahesh</span>
        <br />
        <span className="text-white">Chaudhary</span>
      </h1>

      {/* Title */}
      <p className="mt-4 text-lg md:text-xl font-sans max-w-md text-gray-400">
        Software Engineer
      </p>

      {/* Skill tags */}
      <div className="mt-5 flex flex-wrap justify-center lg:justify-start gap-2">
        {SKILLS.map((skill) => (
          <span
            key={skill}
            className="font-mono text-xs px-3 py-1 rounded-full border border-gray-700 bg-gray-900 text-yellow-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HomeIntro;

