import { useState, useEffect } from 'react';
import { Menu, X, Download, Github, Linkedin, Mail, ExternalLink, ChevronDown, Palette } from 'lucide-react';
import { tools } from './data/tools';
import { projects } from './data/projects';
import { themes } from './data/themes';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentTheme, setCurrentTheme] = useState(themes[2]); // Default to Sage Natural
  const [showThemePicker, setShowThemePicker] = useState(false);

  // Prevenir scroll quando o menu mobile estiver aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      // Hide theme picker when menu is open
      setShowThemePicker(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);

      const sections = ['home', 'about', 'tools', 'projects'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--scrollbar-color',
      `linear-gradient(to bottom, ${currentTheme.colors.from}, ${currentTheme.colors.via}, ${currentTheme.colors.to})`
    );
  }, [currentTheme]);

  const gradientClasses = `${currentTheme.from} ${currentTheme.via} ${currentTheme.to}`;

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/+5581996489406', '_blank');
  };

  return (
    <div className="bg-black text-[#D9D9D9] min-h-screen relative">
      {/* Theme Picker - Hidden when mobile menu is open */}
      {!isMenuOpen && (
        <div className="fixed top-24 right-4 z-50">
          <button
            onClick={() => setShowThemePicker(!showThemePicker)}
            className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
          >
            <Palette size={20} />
          </button>
          {showThemePicker && (
            <div className="absolute right-0 mt-2 p-4 bg-zinc-900/95 backdrop-blur-sm rounded-3xl border border-zinc-800 shadow-xl">
              <div className="space-y-3">
                {themes.map((theme) => (
                  <button
                    key={theme.name}
                    onClick={() => {
                      setCurrentTheme(theme);
                      setShowThemePicker(false);
                    }}
                    className="w-full p-3 rounded-2xl hover:bg-zinc-800/50 transition-all duration-300 text-left flex items-center gap-3 group"
                  >
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${theme.from} ${theme.via} ${theme.to} ring-2 ring-black/20 shadow-lg group-hover:scale-105 transition-transform duration-300`} />
                    <span className="font-medium text-zinc-300 group-hover:text-white transition-colors">{theme.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-zinc-900 z-50">
        <div 
          className={`h-full transition-all duration-300 ease-out`}
          style={{ 
            width: `${scrollProgress}%`,
            background: `linear-gradient(to right, ${currentTheme.colors.from}, ${currentTheme.colors.via}, ${currentTheme.colors.to})`
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed w-full bg-black/95 backdrop-blur-sm z-40 px-4 py-4 border-b border-zinc-800">
        <div className="container mx-auto flex justify-between items-center">
          <a 
            href="#home" 
            className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${gradientClasses} text-transparent bg-clip-text`}
          >
            QAFOLIO
          </a>
          
          <button 
            className="md:hidden relative z-50 p-2 hover:bg-zinc-800/50 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex gap-8">
            <NavLinks 
              activeSection={activeSection} 
              gradientClasses={gradientClasses}
            />
          </div>
        </div>

        {/* Mobile Menu - Now covers entire viewport */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black z-40">
            <div className="h-screen flex flex-col bg-black">
              {/* Header do menu mobile */}
              <div className="border-b border-zinc-800">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                  <a 
                    href="#home" 
                    className={`text-xl font-bold bg-gradient-to-r ${gradientClasses} text-transparent bg-clip-text`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    QAFOLIO
                  </a>
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                    aria-label="Fechar menu"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
              
              {/* Links do menu - Centered vertically */}
              <div className="flex-1 flex items-center justify-center bg-black">
                <div className="flex flex-col items-center justify-center gap-12">
                  <NavLinks 
                    activeSection={activeSection} 
                    onClick={() => setIsMenuOpen(false)}
                    gradientClasses={gradientClasses}
                    isMobile={true}
                  />
                </div>
              </div>

              {/* Footer do menu mobile */}
              <div className="border-t border-zinc-800">
                <div className="container mx-auto px-4 py-6">
                  <div className="flex justify-center gap-8">
                    <a 
                      href="https://www.linkedin.com/in/gabrielucasantos/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-white transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Linkedin size={24} />
                    </a>
                    <a 
                      href="https://github.com/gabrielucasantos" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-white transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Github size={24} />
                    </a>
                    <a 
                      href="mailto:gabrielucasdosantos@gmail.com"
                      className="text-zinc-400 hover:text-white transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Mail size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-b ${currentTheme.from}/10 ${currentTheme.via}/10 to-transparent pointer-events-none`} />
          <div className="container mx-auto flex flex-col md:flex-row items-center gap-12 relative">
            <div className="flex-1 text-center md:text-left">
              <div className="space-y-6">
                <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-6 leading-tight">
                  Olá, eu sou{' '}
                  <span className={`bg-gradient-to-r ${gradientClasses} text-transparent bg-clip-text`}>
                    <br/>Gabriel Andrade
                  </span>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-zinc-400">Analista de Teste de Software</p>
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 w-full sm:w-auto">
                <a 
                    href="/caminho/para/seu-curriculo.pdf" 
                    className={`group bg-gradient-to-r ${gradientClasses} p-[1px] rounded-full w-full sm:w-auto min-w-[200px]`}
                    download
                  >
                    <div className="bg-black rounded-full px-6 sm:px-8 py-3 hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2">
                      <Download size={20} />
                      <span className="whitespace-nowrap">Baixar Currículo</span>
                    </div>
                  </a>
                  <button 
                    onClick={handleWhatsAppClick}
                    className="bg-zinc-800 text-white px-6 sm:px-8 py-3 rounded-full hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto min-w-[200px]"
                  >
                    <span className="whitespace-nowrap">Entrar em Contato</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative w-64 sm:w-80 h-64 sm:h-80 mx-auto">
                <div className={`absolute inset-0 w-[120%] h-[120%] -left-[10%] -top-[10%] bg-gradient-to-r ${gradientClasses} rounded-full blur-2xl opacity-20 animate-pulse`} />
                <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-white/10">
                  <img 
                    src="../src/img/profile-removebg.png" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Seta de rolagem apenas para desktop */}
          <a 
            href="#about" 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-zinc-500 hover:text-white transition-colors animate-bounce hidden md:block"
          >
            <ChevronDown size={32} />
          </a>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 bg-gradient-to-b from-black to-zinc-900 relative">
          <div className="container mx-auto px-4">
            <h2 className={`text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r ${gradientClasses} text-transparent bg-clip-text`}>
              Sobre Mim
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-invert prose-lg mx-auto mb-16">
                <p className="text-xl text-zinc-300 leading-relaxed ">
                Olá, me chamo Gabriel e sou Analista de Teste de Software. Com experiência na área de qualidade, tenho me dedicado a garantir a excelência nas aplicações com as quais trabalho. Sou apaixonado por criar soluções eficientes de automação e por estabelecer processos que realmente fazem a diferença. Acredito na importância da colaboração e no aprendizado constante, buscando sempre aplicar um olhar analítico e inovador para resolver desafios e entregar resultados de alto impacto.
                </p>
              </div>
              <div className="grid grid-cols- md:grid-cols-2 gap-6">
              {["Proativo", "Analítico", "Colaborativo", "Inovador", "Atenção aos Detalhes", "Pensamento Crítico", "Resolução de Problemas", "Empatia", "Comunicação Clara", "Adaptabilidade", "Organização", "Resiliência"].map((skill) => (
                  <div 
                    key={skill} 
                    className="group relative bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800 hover:bg-zinc-800/50 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${gradientClasses} opacity-0 group-hover:opacity-5 transition-opacity rounded-xl`} />
                    <p className="font-medium text-center relative z-10">{skill}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section id="tools" className="py-32 relative">
          <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${currentTheme.from}/2 via-transparent to-transparent`} />
          <div className="container mx-auto px-4 relative">
            <h2 className={`text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r ${gradientClasses} text-transparent bg-clip-text`}>
              <span className="block sm:inline">Ferramentas</span>
              <span className="block sm:inline sm:ml-2">e Tecnologias</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {tools.map((tool, index) => (
                <div 
                  key={tool.name}
                  className="group relative bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800 hover:bg-zinc-800/50 transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${gradientClasses} opacity-0 group-hover:opacity-5 transition-opacity rounded-xl`} />
                  <img 
                    src={tool.icon} 
                    alt={tool.name} 
                    className="w-16 h-16 mx-auto mb-4 transition-transform group-hover:scale-105 duration-300" 
                  />
                  <p className="font-medium text-center relative z-10">{tool.name}</p>
                  <p className="text-sm text-zinc-500 text-center relative z-10">{tool.category}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 bg-gradient-to-b from-zinc-900 to-black relative">
        <div className="container mx-auto px-4">
          <h2 className={`text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r ${gradientClasses} text-transparent bg-clip-text`}>
            Projetos
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={project.name}
                className="group relative bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800 hover:bg-zinc-800/50 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden flex flex-col h-full"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${gradientClasses} opacity-0 group-hover:opacity-5 transition-opacity`} />
                
                {/* Imagem com proporção 16:9 */}
                <div className="relative w-full pt-[56.25%] overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
                </div>

                {/* Conteúdo */}
                <div className="flex-1 p-6 flex flex-col">
                  <h3 className="text-2xl font-bold mb-3 text-white">{project.name}</h3>
                  <p className="mb-6 text-zinc-400 flex-grow">{project.description}</p>
                  
                  {/* Tecnologias */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className={`px-3 py-1 rounded-full text-sm border border-zinc-700 bg-zinc-800/50 backdrop-blur-sm
                          ${tech.toLowerCase().includes('cypress') ? 'text-green-400 border-green-400/20' : 
                          tech.toLowerCase().includes('python') ? 'text-blue-400 border-blue-400/20' :
                          tech.toLowerCase().includes('javascript') ? 'text-yellow-400 border-yellow-400/20' :
                            'text-zinc-300'}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 flex-wrap mt-auto">
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 
                        transition-all duration-300 text-zinc-300 hover:text-white group/link cursor-pointer z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={20} className="transition-transform duration-300 group-hover/link:scale-110" />
                      <span>GitHub</span>
                    </a>
                    
                    {project.demo && (
                      <a 
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg
                          bg-gradient-to-r ${gradientClasses} text-white
                          hover:opacity-90 transition-all duration-300 group/link cursor-pointer z-10`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={20} className="transition-transform duration-300 group-hover/link:scale-110" />
                        <span>Demo</span>
                      </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-8 mb-6">
            <a 
              href="https://www.linkedin.com/in/gabrielucasantos/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors transform hover:scale-105"
            >
              <Linkedin size={28} />
            </a>
            <a 
              href="https://github.com/gabrielucasantos" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors transform hover:scale-105"
            >
              <Github size={28} />
            </a>
            <a 
              href="mailto:gabrielucasdosantos@gmail.com"
              className="text-zinc-400 hover:text-white transition-colors transform hover:scale-105"
            >
              <Mail size={28} />
            </a>
          </div>
          <div className="text-center text-zinc-500">
            Copyright 2025. Todos os direitos reservados por Gabriel Andrade
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLinks({ 
  activeSection, 
  onClick,
  gradientClasses,
  isMobile = false
}: { 
  activeSection: string; 
  onClick?: () => void;
  gradientClasses: string;
  isMobile?: boolean;
}) {
  const links = [
    { href: '#home', label: 'Início' },
    { href: '#about', label: 'Sobre' },
    { href: '#tools', label: 'Ferramentas' },
    { href: '#projects', label: 'Projetos' }
  ];

  return (
    <>
      {links.map(({ href, label }, index) => (
        <a
          key={href}
          href={href}
          onClick={onClick}
          className={`relative group ${
            activeSection === href.slice(1) ? 'text-white' : 'text-zinc-400'
          } hover:text-white transition-colors ${
            isMobile ? 'text-4xl font-bold' : ''
          } py-2`}
          style={{
            animationDelay: isMobile ? `${index * 100}ms` : '0ms'
          }}
        >
          {label}
          <span 
            className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r ${gradientClasses} transform origin-left transition-transform duration-300 ${
              activeSection === href.slice(1) ? 'scale-x-100' : 'scale-x-0'
            } group-hover:scale-x-100`}
          />
        </a>
      ))}
    </>
  );
}

export default App;