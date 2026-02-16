const About = () => {
  return (
    <section
      id="about"
      className="py-20 bg-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            <span className="text-green-400 terminal-glow">About</span> Me
          </h2>
          <div className="w-24 h-1 bg-green-400 mx-auto"></div>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 md:p-12 shadow-lg">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              I'm a passionate developer with a love for creating elegant solutions to complex problems. 
              My journey in web development has been driven by curiosity and a desire to build meaningful 
              digital experiences.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              I specialize in modern web technologies and enjoy working with React, JavaScript, and 
              cutting-edge frameworks. When I'm not coding, you can find me exploring new technologies, 
              contributing to open-source projects, or sharing knowledge with the developer community.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">50+</div>
                <div className="text-sm text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">3+</div>
                <div className="text-sm text-gray-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">100+</div>
                <div className="text-sm text-gray-400">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
                <div className="text-sm text-gray-400">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

