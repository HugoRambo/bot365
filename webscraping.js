require('dotenv').config()


 function playJavascript(){
    let loginHtml = document.getElementById("name")
    
    let senhaHtml = document.getElementById("senha")
    
    alert(`o Valor da login é ${login.value}, e da senha ${senha.value}`)
    
    }




const puppeteer = require('puppeteer')
const bet365 = "https://livecasino.bet365.com/home/br"

const Roletas = "https://livecasino.bet365.com/all-games/Roulette"

let fichaPreparada = 0
//main#all-games-page-component__content div.live-casino-static-games-grid-game-pod.live-casino-static-games-grid-game-pod--open.live-casino-static-games-grid-game-pod--active-pod > div.live-casino-static-games-grid-game-pod__image-container > div.live-casino-static-games-grid-game-pod__image.b-loaded





async function browser() {
    try{
    
    const browser = await puppeteer.launch(
        {headless: false, 
        defaultViewport: null});
    const page= await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36");
    //Aguardar a pagina
    await page.goto(bet365, {waitUntil: 'networkidle2'});
    
    await delay(5000)

    await page.click('#header__logged-out-log-in-link')
    
    await page.waitForSelector('#txtUsername')
    await page.type('#txtUsername', process.env.LOGIN)
    await delay(5000)
    await page.waitForSelector('#txtPassword')
    await page.type('#txtPassword', process.env.SENHA)
    

    await delay(3000)
    
    await page.click(`[type="submit"]`)
    
    await delay(4000)

    await page.click('div.header__nav-container > nav > a:nth-child(2)')
    await page.goto(Roletas, {waitUntil: 'networkidle2'});
    await delay(3000)
    
    await page.waitForSelector('body > div.site-container > div.cookie-consent-modal > div > div.cookie-consent-modal__buttons-container > button.cookie-consent-modal__accept-button')
    await page.click('body > div.site-container > div.cookie-consent-modal > div > div.cookie-consent-modal__buttons-container > button.cookie-consent-modal__accept-button')
    await delay(3000)
    await page.waitForSelector('main#all-games-page-component__content div:nth-child(1) > div:nth-child(1) > div.live-casino-static-games-grid-game-pod__image-container > div.live-casino-static-games-grid-game-pod__image.b-loaded')
    await page.click('main#all-games-page-component__content div:nth-child(1) > div:nth-child(1) > div.live-casino-static-games-grid-game-pod__image-container > div.live-casino-static-games-grid-game-pod__image.b-loaded')
    
    await delay(5000)
    await page.waitForSelector('div#root div.roulette-bet-creator-button.roulette-bet-creator-button_active > div > div')
    await page.click('div#root div.roulette-bet-creator-button.roulette-bet-creator-button_active > div > div')       
        let prepararFicha = async function() {
        // se tutorial estiver aberto
         if (document.getElementsByClassName('close-button game-tutorial__close-buttonvoI4pu9XqNQ2VHkfTWq7').length == 1) {
            document.getElementsByClassName('close-button game-tutorial__close-buttonvoI4pu9XqNQ2VHkfTWq7')[0].click()
        }
        //se ficha ainda n foi preparada
        if (fichaPreparada == 0 && document.getElementsByClassName('chip arrow-slider__element').length > 0) {
            document.getElementsByClassName('chip arrow-slider__element')[ficha].insertAdjacentHTML("afterbegin", "<div id='ficha'></div>")
            document.getElementById('ficha').click()
            fichaPreparada = 1
        }
        //abrir popup de aposta
        if (document.getElementsByClassName('roulette-statistics-info__row roulette-statistics-info__row_dozens-columns').length == 0) {
            document.getElementsByClassName('sidebar-buttons__item')[3].click()
        }
        prepararFicha()
    
    }
    



}catch(e){
    console.log("erro encontrando ", e)
}
}

browser()


function delay(time){
    return new Promise(function(resolve){
        setTimeout(resolve, time);
    });
}




