const express = require('express');
const cors = require('cors');
require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
app.use(cors());
app.use(express.json());

// Liste fixe des catégories (sans "Non classé")
const categoriesList = [
  { id: "1", name: "Food" },
  { id: "2", name: "Transport" },
  { id: "3", name: "Entertainment" },
  { id: "4", name: "Shopping" },
  { id: "5", name: "Health" },
  { id: "6", name: "Income" }
];

app.post('/api/classer-transactions', async (req, res) => {
  const { transactions } = req.body;
  if (!transactions) return res.status(400).send('Pas de transactions');

  // Construire le prompt en insistant pour ne pas utiliser "Non classé"
  const prompt = `
Voici les catégories possibles (id: nom) :
${categoriesList.map(c => `- ${c.id}: ${c.name}`).join('\n')}

Classe ces transactions en choisissant uniquement une de ces catégories.
Tu ne dois PAS utiliser la catégorie "Non classé" (id: 8).
Chaque transaction doit obligatoirement avoir une catégorie parmi les autres.

Exemple de réponse JSON strict : [{"id": "1", "categorieId": "4"}]

Transactions à classer :
${transactions.map(t => `- id: "${t.id}", description: "${t.description}", montant: ${t.amount}€`).join('\n')}

Réponds STRICTEMENT par un JSON array [{id: string, categorieId: string}].
`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3001',
        'X-Title': 'ClassementTransactions'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
        messages: [
          { role: 'system', content: 'Tu es un assistant qui classe des transactions dans une liste fixe de catégories.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erreur API OpenRouter: ${errorText}`);
    }

    const data = await response.json();
    const message = data.choices[0].message.content;

    console.log("Réponse brute du modèle :", message);

    // Extraction JSON stricte dans la réponse
    const jsonMatch = message.match(/\[.*\]/s);
    if (!jsonMatch) {
      throw new Error("Réponse JSON introuvable dans la réponse du modèle");
    }

    const categories = JSON.parse(jsonMatch[0]);

    // Renvoi direct des id transaction + id catégorie
    res.json(categories);

  } catch (e) {
    console.error("Erreur pendant la classification :", e);
    res.status(500).send('Erreur serveur');
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
