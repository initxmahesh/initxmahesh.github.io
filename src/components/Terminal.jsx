import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const introLines = [
  { text: '$ git init initxmahesh', type: 'command' },
  { text: 'Initialized empty Git repository in /home/initxmahesh/', type: 'output' },
  { text: '$ echo "Hi, I\'m Mahesh, a Software Engineer!"', type: 'command' },
  { text: 'Hi, I\'m Mahesh, a Software Engineer!', type: 'output' },
  { text: '$ npm start', type: 'command' },
  { text: 'Starting development server...', type: 'output' },
];

const SECTIONS = {
  about: { id: 'about', description: 'About Me — who I am and my skills' },
  skills: { id: 'skills', description: 'Skills — technologies I work with' },
  projects: { id: 'projects', description: 'Projects — things I\'ve built' },
  contact: { id: 'contact', description: 'Contact — get in touch' },
};

const HELP_TEXT = [
  { text: 'Available commands:', type: 'info' },
  { text: '  ls              List all sections', type: 'output' },
  { text: '  cd <section>    Navigate to a section', type: 'output' },
  { text: '  whoami          Display user info', type: 'output' },
  { text: '  pwd             Print working directory', type: 'output' },
  { text: '  clear           Clear the terminal', type: 'output' },
  { text: '  help            Show this help message', type: 'output' },
  { text: '', type: 'output' },
  { text: 'Sections: about, skills, projects, contact', type: 'info' },
];

const Terminal = () => {
  const { theme } = useTheme();
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [introComplete, setIntroComplete] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState('~');
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const skills = ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express', 'TypeScript'];

  // Typewriter effect for intro
  useEffect(() => {
    if (introComplete || currentLine >= introLines.length) {
      if (!introComplete && currentLine >= introLines.length) {
        setTimeout(() => {
          setIntroComplete(true);
          setDisplayedLines((prev) => [
            ...prev,
            { text: '', type: 'output' },
            { text: 'Type "help" for available commands.', type: 'info' },
          ]);
        }, 250);
      }
      return;
    }

    const line = introLines[currentLine];
    const speed = line.type === 'command' ? 30 : 12;

    if (currentChar < line.text.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          if (newLines.length <= currentLine) {
            newLines.push({ text: line.text.charAt(0), type: line.type });
          } else {
            newLines[currentLine] = {
              text: line.text.substring(0, currentChar + 1),
              type: line.type,
            };
          }
          return newLines;
        });
        setCurrentChar((c) => c + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 250);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, currentChar, introComplete]);

  // Track user scroll to prevent auto-scroll when user is reading history
  useEffect(() => {
    const terminal = terminalRef.current;
    if (!terminal) return;

    const handleScroll = () => {
      const isAtBottom = terminal.scrollHeight - terminal.scrollTop <= terminal.clientHeight + 10;
      setIsUserScrolling(!isAtBottom);
    };

    terminal.addEventListener('scroll', handleScroll);
    return () => terminal.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll terminal only if user is at bottom (like real terminal)
  useEffect(() => {
    if (terminalRef.current && !isUserScrolling) {
      const terminal = terminalRef.current;
      const isAtBottom = terminal.scrollHeight - terminal.scrollTop <= terminal.clientHeight + 10;
      if (isAtBottom) {
        // Small delay to ensure content is rendered
        setTimeout(() => {
          terminal.scrollTop = terminal.scrollHeight;
        }, 0);
      }
    }
  }, [displayedLines, isUserScrolling]);

  // Focus input when intro completes
  useEffect(() => {
    if (introComplete) {
      inputRef.current?.focus();
    }
  }, [introComplete]);

  const processCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const parts = trimmed.split(/\s+/);
    const command = parts[0];
    const arg = parts[1];

    const newLines = [{ text: `$ ${cmd}`, type: 'command' }];

    switch (command) {
      case 'ls': {
        newLines.push({ text: '📂 Contents of ~/initxmahesh/', type: 'info' });
        newLines.push({ text: '', type: 'output' });
        Object.entries(SECTIONS).forEach(([name, sec]) => {
          newLines.push({
            text: `  📁 ${name.padEnd(12)} ${sec.description}`,
            type: 'output',
          });
        });
        newLines.push({ text: '', type: 'output' });
        newLines.push({ text: 'Use "cd <folder>" to navigate.', type: 'info' });
        break;
      }

      case 'cd': {
        if (!arg) {
          newLines.push({ text: 'Usage: cd <section>', type: 'error' });
          newLines.push({
            text: 'Available: about, skills, projects, contact',
            type: 'info',
          });
        } else if (arg === '~' || arg === '/') {
          setCurrentPath('~');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          newLines.push({ text: 'Navigating to home...', type: 'info' });
        } else if (SECTIONS[arg]) {
          const target = SECTIONS[arg].id;
          const el = document.getElementById(target);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            setCurrentPath(`~/${arg}`);
            newLines.push({
              text: `Navigating to ${arg}...`,
              type: 'info',
            });
          }
        } else {
          newLines.push({
            text: `bash: cd: ${arg}: No such directory`,
            type: 'error',
          });
          newLines.push({
            text: 'Try "ls" to see available sections.',
            type: 'info',
          });
        }
        break;
      }

      case 'pwd':
        newLines.push({ text: currentPath, type: 'output' });
        break;

      case 'whoami':
        newLines.push({ text: 'initxmahesh', type: 'highlight' });
        newLines.push({
          text: 'Software Engineer | React enthusiast',
          type: 'output',
        });
        break;

      case 'help':
        newLines.push(...HELP_TEXT);
        break;

      case 'clear':
        setDisplayedLines([]);
        return;

      case '':
        break;

      default:
        newLines.push({
          text: `bash: ${command}: command not found`,
          type: 'error',
        });
        newLines.push({
          text: 'Type "help" for available commands.',
          type: 'info',
        });
    }

    setDisplayedLines((prev) => [...prev, ...newLines]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const cmd = inputValue;
      processCommand(cmd);
      if (cmd.trim()) {
        setCommandHistory((prev) => [cmd, ...prev]);
      }
      setInputValue('');
      setHistoryIndex(-1);
      // Reset scroll tracking when new command is entered
      setIsUserScrolling(false);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInputValue('');
      }
    }
  };

  const highlightKeywords = (text) => {
    const highlightColor = theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600';
    return text.replace(
      /(JavaScript|React|JS|TypeScript|Node\.js|MongoDB|Express)/g,
      `<span class="${highlightColor} font-semibold">$1</span>`
    );
  };

  const getLineColor = (type) => {
    const isDark = theme === 'dark';
    switch (type) {
      case 'command':
        return isDark ? 'text-green-400 terminal-glow' : 'text-green-600 terminal-glow';
      case 'highlight':
        return isDark ? 'text-green-400 font-bold' : 'text-green-600 font-bold';
      case 'error':
        return 'text-red-500';
      case 'info':
        return isDark ? 'text-gray-400' : 'text-gray-600';
      default:
        return isDark ? 'text-gray-300' : 'text-gray-700';
    }
  };

  const handleTerminalClick = () => {
    if (introComplete) inputRef.current?.focus();
  };

  const floatingIcons = [
    { emoji: '⚛️', label: 'React', x: '-8%', y: '10%', delay: 0 },
    { emoji: '🟨', label: 'JS', x: '95%', y: '5%', delay: 0.3 },
    { emoji: '🟩', label: 'Node', x: '-12%', y: '65%', delay: 0.6 },
    { emoji: '🐙', label: 'GitHub', x: '92%', y: '70%', delay: 0.9 },
    { emoji: '🔷', label: 'TS', x: '5%', y: '90%', delay: 1.2 },
    { emoji: '🍃', label: 'Mongo', x: '88%', y: '40%', delay: 0.5 },
  ];

  return (
    <section
      id="home"
      className={`min-h-screen flex items-center justify-center px-4 pt-24 pb-12 ${
        theme === 'dark' ? 'bg-black' : 'bg-gray-50'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
        {/* Left — Intro */}
        <div className="relative flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Floating tech icons */}
          {floatingIcons.map((icon) => (
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

          <p className={`font-mono text-sm terminal-glow mb-3 ${
            theme === 'dark' ? 'text-green-400' : 'text-green-600'
          }`}>
            $ whoami
          </p>
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Hi, I'm{' '}
            <span className={`terminal-glow ${
              theme === 'dark' ? 'text-green-400' : 'text-green-600'
            }`}>Mahesh</span>
            <br />
            <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Chaudhary</span>
          </h1>
          <p className={`mt-4 text-lg md:text-xl font-sans max-w-md ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Software Engineer
          </p>
          <div className="mt-5 flex flex-wrap justify-center lg:justify-start gap-2">
            {skills.map((t) => (
              <span
                key={t}
                className={`font-mono text-xs px-3 py-1 rounded-full border text-yellow-300 ${
                  theme === 'dark'
                    ? 'border-gray-700 bg-gray-900'
                    : 'border-gray-300 bg-gray-100 text-yellow-600'
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right — Terminal */}
        <div className="flex-1 w-full max-w-2xl">
          <div
            className={`rounded-lg overflow-hidden border cursor-text shadow-2xl flex flex-col ${
              theme === 'dark'
                ? 'border-gray-800 bg-gray-900'
                : 'border-gray-300 bg-white'
            }`}
            style={{ height: '500px' }}
            onClick={handleTerminalClick}
          >
            {/* Terminal Header */}
            <div className={`px-4 py-3 flex items-center gap-2 border-b shrink-0 ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-gray-100 border-gray-200'
            }`}>
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className={`ml-3 text-xs font-mono ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                initxmahesh@dev:~
              </span>
            </div>

            {/* Terminal Body - Scrollable Content (like real terminal) */}
            <div
              ref={terminalRef}
              className="p-5 md:p-6 font-mono text-sm leading-relaxed overflow-y-auto terminal-output flex-1"
              style={{ minHeight: 0 }}
            >
              {displayedLines.map((line, i) => (
                <div
                  key={i}
                  className={`${getLineColor(line.type)} whitespace-pre-wrap mb-1`}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlightKeywords(line.text),
                    }}
                  />
                </div>
              ))}

              {/* Interactive input - Inside scrollable area (like real terminal) */}
              {introComplete ? (
                <div className="flex items-center mt-1">
                  <span className={`terminal-glow mr-2 shrink-0 ${
                    theme === 'dark' ? 'text-green-400' : 'text-green-600'
                  }`}>
                    <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>initxmahesh</span>
                    <span className={theme === 'dark' ? 'text-green-400' : 'text-green-600'}>@dev</span>
                    <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>:~$</span>
                  </span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={`flex-1 bg-transparent outline-none font-mono text-sm ${
                      theme === 'dark'
                        ? 'text-green-400 caret-green-400'
                        : 'text-green-600 caret-green-600'
                    }`}
                    spellCheck={false}
                    autoComplete="off"
                  />
                </div>
              ) : (
                <span className={`inline-block w-2.5 h-5 animate-blink align-middle ml-0.5 ${
                  theme === 'dark' ? 'bg-green-400' : 'bg-green-600'
                }`} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terminal;
