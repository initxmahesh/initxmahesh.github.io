const Projects = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: '🛒',
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      tech: ['React', 'Firebase', 'Tailwind CSS'],
      image: '📋',
    },
    {
      title: 'Weather Dashboard',
      description: 'A beautiful weather dashboard that displays current weather conditions, forecasts, and interactive maps using weather APIs.',
      tech: ['React', 'API Integration', 'Chart.js'],
      image: '🌤️',
    },
    {
      title: 'Social Media Analytics',
      description: 'Analytics dashboard for social media metrics with data visualization, reporting, and insights for multiple platforms.',
      tech: ['React', 'Python', 'D3.js', 'PostgreSQL'],
      image: '📊',
    },
  ];

  return (
    <section
      id="projects"
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-primary-600 mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-primary-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2"
            >
              <div className="text-6xl mb-4">{project.image}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{project.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <button className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                View Project →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

