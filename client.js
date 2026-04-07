// "require" é como o "import" do Python
// Aqui estamos importando o axios, que serve para fazer requisições HTTP (GET, POST, etc.)
const axios = require("axios");

// "async function" significa que essa função vai esperar respostas da internet
// sem o "async", o código não esperaria e continuaria antes de receber a resposta
async function main() {

  // ─── PASSO 1: Pedir o token de acesso ────────────────────────────────────────
  // O servidor precisa saber quem você é antes de responder qualquer coisa
  // Para isso, fazemos um POST enviando o nosso username
  // O servidor responde com um "accessToken" que usaremos nas próximas requisições

  // "await" significa: espere a resposta chegar antes de continuar
  const response = await axios.post(
    "https://servidor-exercicios-js.vercel.app/token", // para onde estamos enviando
    { username: "josephp" },                           // o que estamos enviando (nosso usuário)
    {
      headers: {
        "Content-Type": "application/json", // avisa o servidor que estamos enviando JSON
        Accept: "application/json",         // avisa o servidor que queremos receber JSON
      },
    }
  );

  // "response.data" é o JSON que o servidor retornou
  // Ele tem a forma: { accessToken: "um texto longo aqui..." }
  // Salvamos o token numa variável para usar depois
  const token = response.data.accessToken;
  console.log("Token recebido:", token);


  // ─── PASSO 2: Buscar a lista de exercícios ────────────────────────────────────
  // Agora que temos o token, podemos pedir os exercícios
  // Usamos GET porque estamos apenas buscando dados (sem enviar nada no corpo)
  // O token vai no header "Authorization" para o servidor saber quem está pedindo

  const exerciciosResponse = await axios.get(
    "https://servidor-exercicios-js.vercel.app/exercicio", // de onde estamos buscando
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Template string: as crases `` permitem colocar variáveis dentro do texto com ${}
        // Resultado final fica algo como: "Bearer eyJhbGci..."
        Authorization: `Bearer ${token}`,
      },
    }
  );

  // JSON.stringify transforma o objeto JavaScript em texto formatado
  // O "null, 2" serve para indentar com 2 espaços e ficar legível no terminal
  console.log("Exercícios:", JSON.stringify(exerciciosResponse.data, null, 2));
}

// Chama a função main para executar tudo acima
main();
