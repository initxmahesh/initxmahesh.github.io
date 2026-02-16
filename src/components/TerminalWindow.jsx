import { useState, useEffect, useRef } from 'react';

const INTRO_LINES = [
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

const TerminalWindow = () => {
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

  // Typewriter effect for intro
  useEffect(() => {
    if (introComplete || currentLine >= INTRO_LINES.length) {
      if (!introComplete && currentLine >= INTRO_LINES.length) {
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

    const line = INTRO_LINES[currentLine];
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
      const isAtBottom =
        terminal.scrollHeight - terminal.scrollTop <= terminal.clientHeight + 10;
      setIsUserScrolling(!isAtBottom);
    };

    terminal.addEventListener('scroll', handleScroll);
    return () => terminal.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll terminal only if user is at bottom (like real terminal)
  useEffect(() => {
    if (terminalRef.current && !isUserScrolling) {
      const terminal = terminalRef.current;
      const isAtBottom =
        terminal.scrollHeight - terminal.scrollTop <= terminal.clientHeight + 10;
      if (isAtBottom) {
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
    return text.replace(
      /(JavaScript|React|JS|TypeScript|Node\.js|MongoDB|Express)/g,
      '<span class="text-yellow-400 font-semibold">$1</span>'
    );
  };

  const getLineColor = (type) => {
    switch (type) {
      case 'command':
        return 'text-green-400 terminal-glow';
      case 'highlight':
        return 'text-green-400 font-bold';
      case 'error':
        return 'text-red-500';
      case 'info':
        return 'text-gray-400';
      default:
        return 'text-gray-300';
    }
  };

  const handleTerminalClick = () => {
    if (introComplete) inputRef.current?.focus();
  };

  return (
    <div className="flex-1 w-full max-w-2xl">
      <div
        className="rounded-lg overflow-hidden border border-gray-800 bg-gray-900 cursor-text shadow-2xl flex flex-col"
        style={{ height: '500px' }}
        onClick={handleTerminalClick}
      >
        {/* Terminal Header */}
        <div className="px-4 py-3 flex items-center gap-2 border-b border-gray-700 bg-gray-800 shrink-0">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-3 text-xs font-mono text-gray-400">
            initxmahesh@dev:~
          </span>
        </div>

        {/* Terminal Body - Scrollable Content */}
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

          {/* Interactive input */}
          {introComplete ? (
            <div className="flex items-center mt-1">
              <span className="terminal-glow mr-2 shrink-0 text-green-400">
                <span className="text-gray-500">initxmahesh</span>
                <span className="text-green-400">@dev</span>
                <span className="text-gray-500">:~$</span>
              </span>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none font-mono text-sm text-green-400 caret-green-400"
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          ) : (
            <span className="inline-block w-2.5 h-5 animate-blink align-middle ml-0.5 bg-green-400" />
          )}
        </div>
      </div>
    </div>
  );
};

export default TerminalWindow;

