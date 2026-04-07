// "require" é como o "import" do Python
// Aqui estamos importando o axios, que serve para fazer requisições HTTP (GET, POST, etc.)
const axios = require("axios");

// "async function" significa que essa função vai esperar respostas da internet
// sem o "async", o código não esperaria e continuaria antes de receber a resposta
async function main() {

  // ─── PASSO 1: Pedir o token de acesso ────────────────────────────────────────
  const response = await axios.post(
    "https://servidor-exercicios-js.vercel.app/token",
    { username: "josephp" },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  const token = response.data.accessToken;
  console.log("Token recebido:", token);


  // ─── PASSO 2: Buscar a lista de exercícios ────────────────────────────────────
  const exerciciosResponse = await axios.get(
    "https://servidor-exercicios-js.vercel.app/exercicio",
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const exercicios = exerciciosResponse.data; // atalho para não repetir exerciciosResponse.data


  //ex1
  // pega a e b do objeto entrada usando desestruturação
  const { a, b } = exercicios.soma.entrada;
  const respostaSoma = a + b;

  const somaSubmissao = await axios.post(
    "https://servidor-exercicios-js.vercel.app/exercicio/soma",
    { resposta: respostaSoma },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("Resultado soma:", somaSubmissao.data);


  //ex2 
  // Para chaves com hífen, use colchetes: exercicios["tamanho-string"]
  const entrada = exercicios["tamanho-string"].entrada; 

  const respostaTamanho = entrada.string.length;
  const tamanhoSubmissao = await axios.post(
    "https://servidor-exercicios-js.vercel.app/exercicio/tamanho-string",
    { resposta: respostaTamanho },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("Resultado tamanho-string:", tamanhoSubmissao.data);


  //ex 3
  const entradaEmail = exercicios["nome-do-usuario"].entrada;
  const email = entradaEmail.email.split("@");                
  const nomeresposta = email[0];                            
  const nomeSubmissao = await axios.post(
    "https://servidor-exercicios-js.vercel.app/exercicio/nome-do-usuario",
    { resposta: nomeresposta },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("Resultado nome-do-usuario:", nomeSubmissao.data);


  //ex 4 - jaca-wars
  const { v, theta } = exercicios["jaca-wars"].entrada;

  // Math.sin espera radianos, mas theta veio em graus
  // Fórmula de conversão: graus * (PI / 180)
  const thetaRad = theta * (Math.PI / 180);

  // Fórmula do alcance do projétil: v² * sen(2θ) / g
  const distancia = (v ** 2) * Math.sin(2 * thetaRad) / 9.8;

  // Alvo está a 100m, jaca se espalha 2m → acerta entre 98 e 102
  let respostaJaca; //let é como const, mas o valor pode ser alterado depois
  if (distancia < 98) {
    respostaJaca = -1; // não chegou
  } else if (distancia > 102) {
    respostaJaca = 1;  // passou
  } else {
    respostaJaca = 0;  // acertou
  }

  const jacaSubmissao = await axios.post(
    "https://servidor-exercicios-js.vercel.app/exercicio/jaca-wars",
    { resposta: respostaJaca },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("Resultado jaca-wars:", jacaSubmissao.data);



}

// Chama a função main para executar tudo acima
main();
