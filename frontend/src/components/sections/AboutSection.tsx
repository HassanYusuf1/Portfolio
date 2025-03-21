// In AboutSection.tsx
import Image from 'next/image';

export default function AboutSection() {
  const skills = [
    { name: "JavaScript", level: 90 },
    { name: "React", level: 85 },
    { name: "C#", level: 80 },
    { name: "ASP.NET Core", level: 75 },
    { name: "Java", level: 70 },
    { name: "Android", level: 65 }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 slide-in">
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <div className="w-16 h-1 bg-primary-500 mx-auto mb-6"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className="relative slide-in">
            <div className="w-64 h-64 mx-auto rounded-full overflow-hidden relative">
              <Image 
                src="/images/profile.jpg" 
                alt="Hassan Yusuf" 
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 border-4 border-primary-500 rounded-full border-dashed animate-spin-slow opacity-30" style={{ animationDuration: '20s' }}></div>
          </div>
          
          {/* About Text */}
          <div className="slide-in delay-200">
            <h3 className="text-2xl font-bold mb-2">Hassan Yusuf</h3>
            <h4 className="text-primary-500 text-lg mb-4">Software Engineer & Professional Athlete</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Software engineer with broad technical expertise and experience
              from competitive sports. Passionate about finding elegant solutions
              to complex problems and building strong teams that deliver results.
            </p>
            
            <h4 className="font-bold mb-3">Technical Skills</h4>
            <div className="space-y-3">
              {skills.map((skill, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-primary-500 h-2.5 rounded-full" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}