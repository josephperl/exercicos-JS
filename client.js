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


  // ex 5 
  const { ano } = exercicios["ano-bissexto"].entrada;

  // Regras do ano bissexto:
  // - divisível por 400 → bissexto (ex: 2000)
  // - divisível por 100 mas não por 400 → NÃO bissexto (ex: 1900)
  // - divisível por 4 → bissexto (ex: 2024)
  // - resto → não bissexto
  // O operador % dá o resto da divisão: 10 % 3 = 1
  const bissexto = (ano % 400 === 0) || (ano % 4 === 0 && ano % 100 !== 0);

  const bissextoSubmissao = await axios.post(
    "https://servidor-exercicios-js.vercel.app/exercicio/ano-bissexto",
    { resposta: bissexto },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("Resultado ano-bissexto:", bissextoSubmissao.data);

//ex 6
  const { z, a: altura } = exercicios["volume-da-pizza"].entrada;
  // Volume do cilindro = PI * r² * h
  const respostaPizza = Math.round(Math.PI * (z ** 2) * altura);

  const pizzaSubmissao = await axios.post(
    "https://servidor-exercicios-js.vercel.app/exercicio/volume-da-pizza",
    { resposta: respostaPizza },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("Resultado volume-da-pizza:", pizzaSubmissao.data);


  // ex 7
  const { s0, v: velocidade, t } = exercicios.mru.entrada;
  const respostaMru = s0 + velocidade * t;

  const mruSubmissao = await axios.post(
    "https://servidor-exercicios-js.vercel.app/exercicio/mru",
    { resposta: respostaMru },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("Resultado mru:", mruSubmissao.data);


  // ─── EXERCÍCIO 8: Inverte string ─────────────────────────────────────────────
  const { string: stringInvertida } = exercicios["inverte-string"].entrada;
  // Não existe um método direto para inverter string em JS
  // O truque é: dividir em array de letras → inverter o array → juntar de volta
  // "abc".split("")        → ["a", "b", "c"]
  // ["a","b","c"].reverse() → ["c", "b", "a"]
  // ["c","b","a"].join("")  → "cba"
  const respostaInverte = stringInvertida.split("").reverse().join("");

  const inverteSubmissao = await axios.post(
    "https://servidor-exercicios-js.vercel.app/exercicio/inverte-string",
    { resposta: respostaInverte },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("Resultado inverte-string:", inverteSubmissao.data);

  // ─── EXERCÍCIO 9: Soma valores do objeto ─────────────────────────────────────
  //entrada tem a chave "objeto" — precisa acessar .objeto
  const somaValoresObjeto = exercicios["soma-valores"].entrada.objeto;

  // let porque SomaFinal cresce no loop
  let somaFinal = 0;

  for (const chave in somaValoresObjeto) {
    // Para usar o VALOR da variável como chave, use colchetes: objeto[chave]
    somaFinal += somaValoresObjeto[chave];
  }

  const somaValoresSubmissao = await axios.post(
    "https://servidor-exercicios-js.vercel.app/exercicio/soma-valores",
    { resposta: somaFinal },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("Resultado soma-valores:", somaValoresSubmissao.data);


  // ex10
  const { n } = exercicios["n-esimo-primo"].entrada;

  // Função auxiliar que verifica se um número é primo
  // Um número é primo se não for divisível por nenhum número entre 2 e sua raiz quadrada
  function ePrimo(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false; // achou um divisor → não é primo
    }
    return true;
  }

  // Percorre os números naturais contando quantos são primos
  // Para quando o contador chega em n
  let contador = 0; // quantos primos já encontramos
  let candidato = 1; // número que estamos testando

  while (contador < n) {
    candidato++;
    if (ePrimo(candidato)) contador++;
  }
  // quando o while termina, candidato é o n-ésimo primo

  const nEsimoSubmissao = await axios.post(
    "https://servidor-exercicios-js.vercel.app/exercicio/n-esimo-primo",
    { resposta: candidato },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("Resultado n-esimo-primo:", nEsimoSubmissao.data);


}

// Chama a função main para executar tudo acima
main();
