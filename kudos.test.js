const kudos = require('./kudos');

test('test getKudosForUser', () => {
  expect(kudos.getKudosForUser(30)).toEqual(['GOOD', 'NICE']);
  expect(kudos.getKudosForUser(40)).toEqual(['GOOD', 'GOOD']);
  expect(kudos.getKudosForUser(100)).toEqual(['SUPER']);
  expect(kudos.getKudosForUser(135)).toEqual(['SUPER', 'GOOD', 'NICE', 'OK']);
  expect(kudos.getKudosForUser(200)).toEqual(['SUPER', 'SUPER']);
  expect(kudos.getKudosForUser(300)).toEqual(['SUPER', 'SUPER', 'SUPER']);
  expect(kudos.getKudosForUser(80)).toEqual(['GREAT', 'GOOD', 'NICE']);
  expect(kudos.getKudosForUser(185)).toEqual(['SUPER', 'GREAT', 'GOOD', 'NICE', 'OK']);
});

test('test getKudosValueMessageForUser', () => {
  expect(kudos.getKudosValueMessageForUser(kudos.getKudosForUser(30)))
    .toEqual('Você recebeu treze reais em retorno aos kudos GOOD, NICE!');
  expect(kudos.getKudosValueMessageForUser(kudos.getKudosForUser(40)))
    .toEqual('Você recebeu dezesseis reais em retorno aos kudos GOOD, GOOD!');
  expect(kudos.getKudosValueMessageForUser(kudos.getKudosForUser(100)))
    .toEqual('Você recebeu vinte e cinco reais em retorno aos kudos SUPER!');
  expect(kudos.getKudosValueMessageForUser(kudos.getKudosForUser(135)))
    .toEqual('Você recebeu quarenta reais em retorno aos kudos SUPER, GOOD, NICE, OK!');
  expect(kudos.getKudosValueMessageForUser(kudos.getKudosForUser(200)))
    .toEqual('Você recebeu cinquenta reais em retorno aos kudos SUPER, SUPER!');
  expect(kudos.getKudosValueMessageForUser(kudos.getKudosForUser(300)))
    .toEqual('Você recebeu setenta e cinco reais em retorno aos kudos SUPER, SUPER, SUPER!');
  expect(kudos.getKudosValueMessageForUser(kudos.getKudosForUser(80)))
    .toEqual('Você recebeu vinte e oito reais em retorno aos kudos GREAT, GOOD, NICE!');
  expect(kudos.getKudosValueMessageForUser(kudos.getKudosForUser(185)))
    .toEqual('Você recebeu cinquenta e cinco reais em retorno aos kudos SUPER, GREAT, GOOD, NICE, OK!');
});
