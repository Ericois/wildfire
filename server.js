import express from 'express';
import cors from 'cors'; // Import cors
const app = express();

app.use(cors());
const translations = {
  en: {
    welcome: "Welcome to Wildfire Tracker",
    dashboard: "Dashboard",
    dashboardDetails: {
      activeFires: "Active Fires",
      airQuality: "Air Quality",
      fireArea: "Fire Area",
      structuresDamaged: "Structures Damaged"
    },
    inventoryManager: "Insurance Inventory List Manager",
    forum: "Forum",
    forumDetails: {
      title: "Public Forum",
      placeholder: "Share your wildfire update...",
      postButton: "Post",
      updatesTitle: "Updates"
    },
    header: {
      calFire: "CAL FIRE",
      feedback: "Feedback",
      helpImprove: "Help Improve This"
    }
  },
  es: {
    welcome: "Bienvenido a Brújula de Incendios",
    dashboard: "Tablero",
    dashboardDetails: {
      activeFires: "Incendios Activos",
      airQuality: "Calidad del Aire",
      fireArea: "Área de Incendio",
      structuresDamaged: "Estructuras Dañadas"
    },
    inventoryManager: "Gestor de Lista de Inventario de Seguros",
    forum: "Foro",
    forumDetails: {
      title: "Foro Público",
      placeholder: "Comparte tu actualización sobre incendios...",
      postButton: "Publicar",
      updatesTitle: "Actualizaciones"
    },
    header: {
      calFire: "CAL FIRE",
      feedback: "Retroalimentación",
      helpImprove: "Ayuda a Mejorar Esto"
    }
  },
  ko: {
    welcome: "산불 컴퍼스로 오신 것을 환영합니다",
    dashboard: "대시보드",
    dashboardDetails: {
      activeFires: "활성 화재",
      airQuality: "공기 질",
      fireArea: "화재 면적",
      structuresDamaged: "손상된 구조물"
    },
    inventoryManager: "보험 재고 목록 관리자",
    forum: "공개 포럼",
    forumDetails: {
      title: "공개 포럼",
      placeholder: "산불 업데이트를 공유하세요...",
      postButton: "게시",
      updatesTitle: "업데이트"
    },
    header: {
      calFire: "캘파이어",
      feedback: "피드백",
      helpImprove: "이것을 개선하는 데 도움"
    }
  }
};

let posts = []; // In-memory storage for simplicity

// Fetch posts
app.get('/posts', (req, res) => {
  res.json(posts);
});

// Add a new post
app.post('/posts', (req, res) => {
  const { content } = req.body;

  if (!content || content.trim() === '') {
    return res.status(400).json({ error: 'Content cannot be empty' });
  }

  const newPost = {
    id: posts.length + 1,
    content,
    timestamp: new Date().toISOString()
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});


// Serve translations based on language
app.get('/translations', (req, res) => {
  const lang = req.query.lang || 'en';
  res.json(translations[lang] || translations['en']);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Translation server is running on http://localhost:${PORT}`);
});
