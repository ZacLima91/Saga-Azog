const prompt = require("prompt-sync")();

//funções criadas para delay de rodadas
function msleep(n) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}
function sleep(n) {
  msleep(n * 1000);
}

//simula dados jogados
function jogarDado() {
  const dadoJogado = parseInt(Math.floor(Math.random() * 6 + 1));
  return dadoJogado;
}

//variaveis de status dos personagens
let saude = 10;
let moedas = 50;
let numerosCasasAndouJogador = 0;
let numerosCasasAndouAzog = 0;
let saudeAzog = 10;

//sortea cartas para interação com rodadas
function pegaCarta() {
  const lista = [
    {
      carta: "Uma orda de orcs está na nossa rota o que faremos?",
      op1: "OP1 => Esconder-se e esperar a orda passar.(Volte duas casa.)",
      op2: "OP2 => Enfrentar os orcs.(Se derrota-los perderá 2 de saude, mas ganharas 5 moedas",
      id: 0,
    },
    {
      carta: "Encontramos com um velho amigo Radagast, o Castanho. ",
      op1: "OP1 => Ele te dará um buff de saude de 4.",
      op2: "OP2 => Adianta 2 casas.",
      id: 1,
    },
    {
      carta:
        "Temos aliados nessa jornada, o Legolas Verdefolha está a nos ajudar",
      op1: "OP1 => Golpear o Azog, tirando-le 3 de vida",
      op2: "OP2 => Ele nos escouta pelas arvores. Jogar dado mais uma vez.",
      id: 2,
    },
    {
      carta:
        "O Azog mandou o seu filho Bolg para nos atrasar. Correr ou ficar? ",
      op1: "OP1 => Azog adianta ou volta até casa onde estás, tirando-te 2 de saúde.",
      op2: "OP2 => Procurar outro caminho, voltando duas casas.",
      id: 3,
    },
    {
      carta:
        "Thorin, Escudo de Carvalho , esta a nos ajudar. Ele mandou um presente.",
      op1: "OP1 => Uma bota forjada na Montanha da Perdição, adiante 3 casas",
      op2: "OP2 => 5 Moedas de ouro",
      id: 4,
    },
  ];
  let op = 0;
  const num = Math.floor(Math.random() * 5);

  const cartaEscolhida = lista[num];
  return cartaEscolhida;
}

function criarListaCasasInterativa() {
  const listaCasasInterartivas = [];
  let n = 0;
  for (let i = 0; i < 50; i++) {
    n = parseInt(Math.floor(Math.random() * 100 + 1));
    if (listaCasasInterartivas.includes(n) == false) {
      listaCasasInterartivas.push(n);
    } else {
      i--;
    }
  }
  return listaCasasInterartivas;
}
const casasInterativas = criarListaCasasInterativa().sort(function (a, b) {
  return a - b;
});

//pergunta ao usuário seu nome e se realmente quer jogar
let condicao = true;
let resposta = "";

while (condicao) {
  const nome = prompt(
    "Olá jovem aventureiro, sou o mago Gandalf, o Cinzento. Como devo le chamar? "
  );
  console.log();
  while (resposta != "S" && resposta != "N") {
    console.log(
      `Muito bem Sir ${nome}. Está preparado para essa grande jornada em busca do tesouro de Smaug?`
    );
    resposta = prompt(
      "(Se escolher [S] o jogo continua, caso escolha [N] o jogo para) [S/N]:"
    ).toUpperCase();
    if (resposta != "S" && resposta != "N") {
      console.log("Erro! Digite uma opção válida.");
      console.log();
    }
  }
  console.log(resposta);
  console.log();

  console.log(resposta);
  switch (resposta) {
    case "S":
      let cont = 0;

      console.log(
        "Que bom, fique atento porque alem dos desafios que terás durante o caminho, o orc Azog tambem estará nessa jornada. Não se preocupe eu te protegerei contra ele, seu único dever é chegar antes dele no objetivo. Boa sorte!"
      );

      while (
        saude > 0 &&
        numerosCasasAndouAzog < 100 &&
        numerosCasasAndouJogador < 100 &&
        saudeAzog > 0
      ) {
        cont++;

        numerosCasasAndouAzog += jogarDado();
        numerosCasasAndouJogador += jogarDado();
        console.log("#### STATUS ####");
        console.log(`Saúde: ${saude}`);
        console.log(`Moedas: ${moedas}`);
        console.log(`Saude Azog: ${saudeAzog}`);
        console.log();
        console.log(`## ${cont}º RODADA ##`);
        console.log(`Azog está na casa: ${numerosCasasAndouAzog}`);
        console.log(`Voce está na casa: ${numerosCasasAndouJogador}`);
        console.log();
        sleep(2);
        if (casasInterativas.includes(numerosCasasAndouJogador)) {
          let escolhidaCarta = pegaCarta();
          for (let i in escolhidaCarta) {
            if (i != "id") {
              console.log(escolhidaCarta[i]);
            }
            let op = 0;

            if (i == "op2") {
              while (op != 1 && op != 2) {
                op = +prompt("Opção: [1|2]");
              }
              switch (escolhidaCarta.id) {
                case 0:
                  switch (op) {
                    case 1:
                      numerosCasasAndouJogador -= 2;
                      break;
                    case 2:
                      saude -= 2;
                      moedas += 5;
                      break;
                  }
                  break;
                case 1:
                  switch (op) {
                    case 1:
                      saude += 4;
                      break;
                    case 2:
                      numerosCasasAndouJogador += 2;
                      break;
                  }
                  break;
                case 2:
                  switch (op) {
                    case 1:
                      saudeAzog -= 3;
                      break;
                    case 2:
                      let d = jogarDado();
                      numerosCasasAndouJogador += d;
                      break;
                  }
                  break;
                case 3:
                  switch (op) {
                    case 1:
                      numerosCasasAndouAzog = numerosCasasAndouJogador;
                      saude -= 2;
                      break;
                    case 2:
                      numerosCasasAndouJogador -= 2;
                      break;
                  }

                  break;
                case 4:
                  switch (op) {
                    case 1:
                      numerosCasasAndouJogador += 3;
                      break;
                    case 2:
                      moedas += 5;
                      break;
                  }
                  break;
              }
            }
          }
        }
      }
    case "N":
      console.log("Que pena! Volte quando estiver preparado.");
      condicao = false;
  }
}
