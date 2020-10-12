// Importando bibliotecas
const puppeteer = require('puppeteer');
const readline = require('readline');

// Configurando o readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Interagindo com o usuário
rl.question('DIGITE O CEP:  ', resposta => {
  console.log(`Sua resposta foi: ${resposta}`);
  (async () => {
    // Configurando o puppeteer  
    const browser = await puppeteer.launch({ headless: false});
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0); // Configura o time-out
    await page.goto('https://www.correios.com.br/');
    const links = await page.evaluate((resposta) => {        
        document.querySelector('#acesso-busca').value = resposta;
        document.getElementsByClassName('card show-mais-acessados')[1].submit();
      
      }, resposta); // Passando a variável como parâmetro do evaluate.

  })();
  rl.close();
});