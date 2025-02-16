document.addEventListener('DOMContentLoaded', () => {
  // Language switching functionality
  const translations = {
    en: {
      title: "Titan AI",
      tagline: "Next Generation Artificial Intelligence",
      models: {
        titanxl: {
          name: "TitanXL",
          badge: "Advanced",
          description: "The most advanced model in the Titan AI lineup. Capable of solving complex analytical tasks and performing deep data analysis with unprecedented accuracy and insight."
        },
        titanm: {
          name: "Titan-M",
          badge: "Balanced",
          description: "The perfect balance between performance and stability. An ideal solution for most AI tasks, offering reliable results while maintaining efficient resource usage."
        },
        titans: {
          name: "Titan-S",
          badge: "Fast",
          description: "A fast and efficient model for everyday tasks. Delivers instant responses and high performance, perfect for applications requiring quick turnaround times."
        },
        titanremix: {
          name: "TitanRemix",
          badge: "Experimental",
          description: "An experimental model leveraging three AI engines for response generation. A unique approach to problem-solving that combines multiple perspectives for enhanced results."
        },
        titanrp: {
          name: "TitanRP",
          badge: "Creative",
          description: "Optimized for natural conversation and role-playing scenarios. The best choice for engaging in meaningful dialogue and creative interactions."
        }
      }
    },
    ru: {
      title: "Титан ИИ",
      tagline: "Искусственный Интеллект Нового Поколения",
      models: {
        titanxl: {
          name: "ТитанXL",
          badge: "Продвинутый",
          description: "Самая продвинутая модель в линейке Titan AI. Способна решать сложные аналитические задачи и выполнять глубокий анализ данных с беспрецедентной точностью."
        },
        titanm: {
          name: "Титан-М",
          badge: "Сбалансированный",
          description: "Идеальный баланс между производительностью и стабильностью. Оптимальное решение для большинства задач ИИ, обеспечивающее надежные результаты."
        },
        titans: {
          name: "Титан-С",
          badge: "Быстрый",
          description: "Быстрая и эффективная модель для повседневных задач. Обеспечивает мгновенные ответы и высокую производительность."
        },
        titanremix: {
          name: "ТитанРемикс",
          badge: "Экспериментальный",
          description: "Экспериментальная модель, использующая три движка ИИ для генерации ответов. Уникальный подход к решению задач."
        },
        titanrp: {
          name: "ТитанРП",
          badge: "Творческий",
          description: "Оптимизирован для естественного общения и ролевых сценариев. Лучший выбор для креативного взаимодействия."
        }
      }
    }
  };

  const animateCharacterChange = (element, newText, duration = 800) => {
    // Create container for layers
    const container = document.createElement('span');
    container.style.position = 'relative';
    container.style.display = 'inline-block';
    
    // Create layers for old and new text
    const original = document.createElement('span');
    original.className = 'text-layer';
    original.textContent = element.textContent;
    
    const newLayer = document.createElement('span');
    newLayer.className = 'text-layer';
    newLayer.textContent = newText;
    
    // Add to DOM
    container.appendChild(original);
    container.appendChild(newLayer);
    element.textContent = '';
    element.appendChild(container);
    
    // Trigger animation
    requestAnimationFrame(() => {
      original.style.opacity = '0';
      original.style.transform = 'translateY(20px)';
      newLayer.style.opacity = '1';
      newLayer.style.transform = 'translateY(0)';
    });
    
    // Cleanup after animation
    setTimeout(() => {
      element.textContent = newText;
    }, duration);
  };

  const switchLanguage = (lang) => {
    const data = translations[lang];
    const content = document.querySelector('.models-content');
    const header = document.querySelector('header');
    
    // Add blur effect to both content and header
    content.classList.add('blurred');
    header.classList.add('blurred');
    
    // Wait a bit before starting the content change
    setTimeout(() => {
      // Update all text content
      document.querySelector('.liquid-metal').textContent = data.title;
      document.querySelector('.tagline').textContent = data.tagline;
      
      Object.keys(data.models).forEach(modelId => {
        const model = data.models[modelId];
        const section = document.getElementById(modelId);
        
        if (section) {
          section.querySelector('h2').textContent = model.name;
          section.querySelector('.model-badge').textContent = model.badge;
          section.querySelector('p').textContent = model.description;
        }
      });
      
      // Remove blur effect after content change
      setTimeout(() => {
        content.classList.remove('blurred');
        header.classList.remove('blurred');
      }, 400);
    }, 400);
  };

  // Language switcher event listeners
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      langButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      switchLanguage(btn.getAttribute('data-lang'));
    });
  });

  // Button navigation
  const setupNavigation = () => {
    const buttons = document.querySelectorAll('.model-button');
    const contents = document.querySelectorAll('.model-content');

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        button.classList.add('active');
        const modelId = button.getAttribute('data-model');
        document.getElementById(modelId).classList.add('active');
      });
    });
  };

  // Floating queries animation
  const setupFloatingQueries = () => {
    const queries = [
      "Design a website mockup",
      "Create a snake game in Python",
      "Write a story about dragons",
      "Explain quantum computing",
      "Generate a logo design",
      "Analyze market trends",
      "Optimize this algorithm",
      "Translate to Spanish",
      "Debug this code",
      "Write a business plan",
      "Compose a melody"
    ];

    const floatingQueries = document.querySelector('.floating-queries');
    let activeQueries = [];
    const maxQueries = 4; // Limit concurrent queries
    
    const createQuery = () => {
      // Don't add new query if we're at the limit
      if (activeQueries.length >= maxQueries) return;
      
      const query = document.createElement('div');
      query.className = 'query';
      query.textContent = queries[Math.floor(Math.random() * queries.length)];
      
      // Calculate vertical position with spacing
      const verticalSpacing = 80; // pixels between queries
      const availableSlots = [20, 30, 40, 50]; // percentage values for vertical positions
      
      // Filter out positions that are too close to active queries
      const usedPositions = activeQueries.map(q => parseFloat(q.style.top));
      const availablePositions = availableSlots.filter(pos => 
        !usedPositions.some(used => Math.abs(used - pos) < 15)
      );
      
      if (availablePositions.length === 0) return; // Skip if no good position available
      
      const startY = availablePositions[Math.floor(Math.random() * availablePositions.length)];
      const duration = 6 + Math.random() * 3;
      
      query.style.top = `${startY}%`;
      
      // Alternate starting sides
      if (activeQueries.length % 2 === 0) {
        query.style.left = '10%';
        query.style.animation = `floatQuery ${duration}s linear`;
      } else {
        query.style.right = '10%';
        query.style.animation = `floatQuery ${duration}s linear reverse`;
      }
      
      activeQueries.push(query);
      floatingQueries.appendChild(query);
      
      query.addEventListener('animationend', () => {
        query.remove();
        activeQueries = activeQueries.filter(q => q !== query);
      });
    };

    // Create initial queries with delay
    for (let i = 0; i < 4; i++) {
      setTimeout(createQuery, i * 1500);
    }

    // Continue creating new queries
    setInterval(createQuery, 2000);
  };

  // Enhanced console animations
  const setupConsoleAnimations = () => {
    const consoleOutputs = document.querySelectorAll('.console-output');
  
    consoleOutputs.forEach(console => {
      const elements = console.querySelectorAll('.console-prompt, .console-thinking, .console-response, .console-file');
      
      elements.forEach((element, index) => {
        setTimeout(() => {
          element.style.transition = 'all 0.5s ease';
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, (index + 1) * 1000); // Stagger the animations
      });
    });
  };

  // Initialize all components
  setupNavigation();
  setupFloatingQueries();
  setupConsoleAnimations();
});