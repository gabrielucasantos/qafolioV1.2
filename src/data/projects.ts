interface Project {
  name: string;
  description: string;
  technologies: string[];
  github: string;
  demo: string | null;
  image: string;
}

export const projects: Project[] = [
  {
    name: 'OrangeHRM Automation Suite',
    description: 'Desenvolvi este projeto de automação de testes para o OrangeHRM, utilizando o padrão Page Object Model (POM) para facilitar a organização e manutenção. O objetivo é validar as principais funcionalidades do sistema e expandir facilmente com novos cenários.',
    technologies: ['Cypress', 'JavaScript'],
    github: 'https://github.com/gabrielucasantos/orangeHRM_Automation_Suite',
    demo: null,
    image: 'https://github.com/user-attachments/assets/bd96e1b1-14f6-402f-bca4-051b29683708'
  },
];