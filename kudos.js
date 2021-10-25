// Conversão de kudos para pontos
const KUDOS_TO_POINTS = [
  { name: 'OK', value: 5 },
  { name: 'NICE', value: 10 },
  { name: 'GOOD', value: 20 },
  { name: 'GREAT', value: 50 },
  { name: 'SUPER', value: 100 },
];

// Conversão de kudos para reais
const KUDOS_TO_REAL = [
  { name: 'OK', value: 2 },
  { name: 'NICE', value: 5 },
  { name: 'GOOD', value: 8 },
  { name: 'GREAT', value: 15 },
  { name: 'SUPER', value: 25 },
];

/* 
  Recebe: um int representando o número de pontos do usuário
  Retorna: um array contendo os kudos. Ex.: ['OK', 'GOOD'] 
*/
function getKudosForUser(points) {
  var kudosList = [];
  /* Já que os são sempre divisíveis pelos valores da tabela de conversão,
     a solução gulosa (greedy) pode ser abordada, trazendo maior eficiência.
  */
  while(points - 100 >= 0) {
    points -= 100;
    kudosList.push('SUPER');
  }
  while(points - 50 >= 0) {
    points -= 50;
    kudosList.push('GREAT');
  }
  while(points - 20 >= 0) {
    points -= 20;
    kudosList.push('GOOD');
  }
  while(points - 10 >= 0) {
    points -= 10;
    kudosList.push('NICE');
  }
  while(points > 0) {
    points -= 5;
    kudosList.push('OK');
  }
  
  return kudosList;
}

/*
  Recebe: A string que representa o valor entre 0 e 999 e
  uma lista que irá conter o valor por extenso.
  A função não retorna nada, mas modifica a lista passada.
*/
function num2txt(str, lst) {
  // Preparando os valores possíveis por extenso
  var unities = ['um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
  var dozens1 = ['onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 
  'dezoito', 'dezenove'];
  var dozens2 = ['vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 
  'noventa'];
  var hundreds = ['cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 
  'setecentos', 'oitocentos', 'novecentos'];

  // Fazendo as comparações com base no tamanho da string do valor
  if(str.length == 3) {
      if(str[0] == '1' && str[1] == '0' && str[2] == '0') 
        lst.push('cem');
      else {
        lst.push(hundreds[parseInt(str[0])-1])
        if(str[1] == '1') {
          if(str[2] == '0')
            lst.push('dez');
          else
            lst.push(dozens1[parseInt(str[2])-1]);
        }else {
          lst.push(dozens2[parseInt(str[1])-2]);
          if(str[2] != '0')
            lst.push(unities[parseInt(str[2])-1]);
        }
      }
  }else if(str.length == 2) {
    if(str[0] == '1') {
      if(str[1] == '0')
        lst.push('dez');
      else
        lst.push(dozens1[parseInt(str[1])-1]);
    }else {
      lst.push(dozens2[parseInt(str[0])-2]);
      if(str[1] != '0')
        lst.push(unities[parseInt(str[1])-1]);
    }  
  }else {
    // Aqui foi necessário imprimir por extenso mesmo que seja o valor 1, para
    // que esta função seja usada de forma generalista
      lst.push(unities[parseInt(str[0])-1]);
  }
}

/* 
  Recebe: Recebe um array contendo os nomes dos kudos de um usuário. Ex.: ['OK', 'GOOD']
  Retorna: a mensagem padrão com o valor em reais dos kudos por extenso. Ex.: Parabéns, você ganhou vinte e cinco reais
*/
function getKudosValueMessageForUser(kudos) {
  // Somando o montante dos valores gerados pela conversão dos kudos
  var money = 0;
  kudos.forEach(element => {
    if(element === 'SUPER')
      money += 25;
    else if(element === 'GREAT')
      money += 15;
    else if(element === 'GOOD')
      money += 8;
    else if(element === 'NICE')
      money += 5;
    else
      money += 2;
  });

  // Convertendo o valor em reais para extenso
  var unabbreviated = ""; // Variável que conterá o texto por extenso
  var moneyPart1 = Math.floor(money / 1000); // Pegando os três primeiros dígitos da esquerda para a direita
  var moneyPart2 = money % 1000; // Pegando os três últimos dígitos
  // Cada parte pode ser processada separadamente.
  // Apenas deve-se ter o cuidado para adicionar a palavra 'mil', caso o dinheiro corresponda
  var lst = [];
  if(moneyPart1 > 0) {
    var s1 = moneyPart1.toString();
    num2txt(s1, lst);
    unabbreviated = lst.join(' e ');
    unabbreviated += ' mil ';
  }
  lst = [];
  if(moneyPart2 > 0) {
    var s2 = moneyPart2.toString();
    num2txt(s2, lst);
    unabbreviated += lst.join(' e ');
  }
  
  var message = `Você recebeu ${unabbreviated} reais em retorno aos kudos ${kudos.join(", ")}!`;
  return message;
}

module.exports = {
  getKudosForUser,
  getKudosValueMessageForUser,
};

// Função de teste apenas para auxiliar a depuração do código
/*var test = (function(){
  var k = getKudosForUser(40);
  var message = getKudosValueMessageForUser(k);
  console.log(message);
})();
*/
