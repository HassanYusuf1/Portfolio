export default function AboutSection() {
    return (
      <section id="about" className="section bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-slideIn">
            <h2 className="section-title">About Me</h2>
            <div className="section-divider"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="relative animate-slideIn">
              <div className="w-64 h-64 mx-auto rounded-full overflow-hidden relative bg-primary-100 flex items-center justify-center">
                <div className="text-primary-500 font-bold">Hassan Yusuf</div>
              </div>
              <div className="absolute inset-0 border-4 border-primary-500 rounded-full border-dashed animate-spin-slow opacity-30"></div>
            </div>
            
            {/* About Text */}
            <div className="animate-slideIn" style={{ animationDelay: '200ms' }}>
              <h3 className="text-2xl font-bold mb-2">Hassan Yusuf</h3>
              <h4 className="text-primary-500 text-lg mb-4">Software Engineer & Professional Athlete</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Software engineer with broad technical expertise and experience
                from competitive sports. Passionate about finding elegant solutions
                to complex problems and building strong teams that deliver results.
              </p>
              
              <div className="flex space-x-4 mt-6">
                <a href="#projects" className="btn btn-primary">View My Projects</a>
                <a href="#contact" className="btn btn-outline dark:text-white">Contact Me</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }