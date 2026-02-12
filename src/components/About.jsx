const About = () => {
  return (
    <section
      id="about"
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">About</span> Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-primary-600 mx-auto"></div>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-gray-50 to-primary-50 rounded-2xl p-8 md:p-12 shadow-lg">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              I'm a passionate developer with a love for creating elegant solutions to complex problems. 
              My journey in web development has been driven by curiosity and a desire to build meaningful 
              digital experiences.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              I specialize in modern web technologies and enjoy working with React, JavaScript, and 
              cutting-edge frameworks. When I'm not coding, you can find me exploring new technologies, 
              contributing to open-source projects, or sharing knowledge with the developer community.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
                <div className="text-sm text-gray-600">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">3+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">100+</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

