require('dotenv').config()


 function playJavascript(){
    let loginHtml = document.getElementById("name")
    
    let senhaHtml = document.getElementById("senha")
    
    alert(`o Valor da login é ${login.value}, e da senha ${senha.value}`)
    
    }




const puppeteer = require('puppeteer')
const bet365 = "https://livecasino.bet365.com/home/br"

const Roletas = "https://livecasino.bet365.com/all-games/Roulette"


//main#all-games-page-component__content div.live-casino-static-games-grid-game-pod.live-casino-static-games-grid-game-pod--open.live-casino-static-games-grid-game-pod--active-pod > div.live-casino-static-games-grid-game-pod__image-container > div.live-casino-static-games-grid-game-pod__image.b-loaded





async function browser() {
    try{
    
    const browser = await puppeteer.launch({headless: false});
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
    
    await delay(7000)

    await page.click('div.header__nav-container > nav > a:nth-child(2)')
    await page.goto(Roletas, {waitUntil: 'networkidle2'});
    await delay(3000)
    
    await page.waitForSelector('body > div.site-container > div.cookie-consent-modal > div > div.cookie-consent-modal__buttons-container > button.cookie-consent-modal__accept-button')
    await page.click('body > div.site-container > div.cookie-consent-modal > div > div.cookie-consent-modal__buttons-container > button.cookie-consent-modal__accept-button')
    await delay(3000)
    await page.waitForSelector('main#all-games-page-component__content div.live-casino-static-games-grid-game-pod.live-casino-static-games-grid-game-pod--open.live-casino-static-games-grid-game-pod--active-pod > div.live-casino-static-games-grid-game-pod__image-container > div.live-casino-static-games-grid-game-pod__image.b-loaded')
    await page.click('main#all-games-page-component__content div.live-casino-static-games-grid-game-pod.live-casino-static-games-grid-game-pod--open.live-casino-static-games-grid-game-pod--active-pod > div.live-casino-static-games-grid-game-pod__image-container > div.live-casino-static-games-grid-game-pod__image.b-loaded')

    //<button class="default_Button text-button" id="remindLater">Lembrar-me Mais Tarde</button>
    //await page.waitForNavigation('#remindLater');
    //await page.click('#remindLater')

    //await delay(3000)
    //await page.goto(Roletas, {waitUntil: 'networkidle2'})
    //await page.click(`[type="submit"]`)
    //await page.screenshot({path: './print.jpeg', fullPage: true});

    //await browser.close;
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




