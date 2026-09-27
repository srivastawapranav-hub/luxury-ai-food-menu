import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize GoogleGenAI client server-side
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// AI Dining Concierge endpoint
app.post('/api/concierge', async (req, res) => {
  try {
    const { query, currentCart, dietary, menuSummary } = req.body;

    const systemInstruction = `You are "Monsieur Vance", the Head Sommelier and Executive Dining Concierge at The Imperial Table, a legendary 3-Michelin-star restaurant and 5-star grand luxury resort dining salon.
Your tone is sophisticated, welcoming, warm, impeccably knowledgeable, and poised—like the head maître d' of an ultra-luxury palace hotel in Paris or London.

CRITICAL RULES:
1. ONLY recommend dishes that actually exist in the provided restaurant menu data below.
2. Never invent non-existent ingredients, allergens, dishes, or prices.
3. If the guest has dietary restrictions (e.g. Vegetarian, Gluten-free, Nut allergy), strictly adhere to them.
4. Provide structured, evocative pairing advice (e.g. which wine, tea, or side dish elevates the main).
5. Keep your spoken advice concise yet poetic (2 to 4 sentences).
6. Return a JSON object with:
   - "message": Your bespoke advice to the guest.
   - "suggestedDishIds": Array of dish IDs from the menu that you recommend (maximum 3 IDs).
   - "pairingNote": A short pairing tip (optional).

MENU DATABASE:
${menuSummary || 'See standard Imperial Table menu'}
`;

    if (aiClient) {
      try {
        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: `Guest question: "${query}". Guest dietary preferences: ${JSON.stringify(dietary || [])}. Current selection in cart: ${JSON.stringify(currentCart || [])}.`,
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
            temperature: 0.6,
          },
        });

        const text = response.text;
        if (text) {
          const parsed = JSON.parse(text);
          return res.json(parsed);
        }
      } catch (err: any) {
        console.warn('Gemini API call failed, falling back to local concierge knowledge engine:', err.message);
      }
    }

    // Graceful intelligent culinary concierge fallback
    const qLower = (query || '').toLowerCase();
    let message = "Allow me to recommend an exquisite experience for this evening.";
    let suggestedDishIds: string[] = ['sig-1', 'main-1'];
    let pairingNote = "Recommended pairing: Reserve Grand Cru or Citrus & Mint Infusion.";

    if (qLower.includes('light') || qLower.includes('healthy') || qLower.includes('diet')) {
      message = "For an ethereal yet deeply satisfying plate, our Chilean Sea Bass in Saffron Velouté is sublime. It delivers silken texture and rich omega profiles without any heaviness.";
      suggestedDishIds = ['sea-1', 'start-1'];
      pairingNote = "Complemented wonderfully by our Sparkling San Pellegrino with cold-pressed Sicilian lemon.";
    } else if (qLower.includes('veg') || qLower.includes('plant')) {
      message = "Our Royal Morel & Truffle Risotto features aged Acquerello Carnaroli rice and hand-shaved Norcia winter truffles—luxurious, earthy, and 100% vegetarian.";
      suggestedDishIds = ['sig-1', 'ind-2'];
      pairingNote = "Pair with our artisanal Jasmine Dragon Pearl Reserve tea.";
    } else if (qLower.includes('sweet') || qLower.includes('dessert') || qLower.includes('chocolate')) {
      message = "To conclude on a high note, our 70% Valrhona Guanaja Chocolate Fondant with 24k gold leaf and Tahitian vanilla bean gelato is the epitome of indulgence.";
      suggestedDishIds = ['des-1', 'des-2'];
      pairingNote = "Best savored alongside an espresso or vintage Port.";
    } else if (qLower.includes('spicy') || qLower.includes('spice') || qLower.includes('indian')) {
      message = "Our Imperial Awadhi Murgh Tikka and Slow-Cooked Dal Bukhara simmered for 24 hours offer authentic warmth with refined aristocratic aromatics.";
      suggestedDishIds = ['ind-1', 'ind-2', 'bread-1'];
      pairingNote = "Harmonizes seamlessly with our Royal Saffron Lassi.";
    } else if (qLower.includes('romantic') || qLower.includes('celebration') || qLower.includes('best')) {
      message = "For a momentous celebration, begin with the Ossetra Royal Caviar, followed by the Grade A5 Miyazaki Wagyu Tenderloin with shaved black Périgord truffle.";
      suggestedDishIds = ['start-1', 'sig-2', 'des-1'];
      pairingNote = "Exquisite when paired with vintage Champagne.";
    }

    return res.json({
      message,
      suggestedDishIds,
      pairingNote,
    });
  } catch (error: any) {
    console.error('Concierge endpoint error:', error);
    res.status(500).json({
      message: "Our concierge team is at your immediate service. Please enjoy our curated Chef's Selection.",
      suggestedDishIds: ['sig-1', 'sig-2'],
    });
  }
});

// Setup Vite middleware in dev or static serve in prod
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Imperial Table luxury dining server running on http://localhost:${port}`);
  });
}

startServer();
