
const puppeteer = require('puppeteer')

const bet365 = "https://livecasino.bet365.com/home/br"


 async function playJavascript(){
    let loginHtml = document.getElementById("name")
    
    let senhaHtml = document.getElementById("senha")
    
    alert(`o Valor da login é ${loginHtml.value}, e da senha ${senhaHtml.value}`)
    //async function browser() {
        try{
        
        const browser = await puppeteer.launch({headless: false});
        const page= await browser.newPage();
        await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36");
        //Aguardar a pagina
        await page.goto(bet365, {waitUntil: 'networkidle2'});
        
        await delay(5000)
    
        await page.click('#header__logged-out-log-in-link')
        
        await page.waitForSelector('#txtUsername')
        await page.type('#txtUsername', loginHtml)
        await delay(5000)
        await page.waitForSelector('#txtPassword')
        await page.type('#txtPassword', senhaHtml)
        
    
        await delay(3000)
        
        await page.click(`[type="submit"]`)
        
        await delay(8000)
        await prompt("Passou.")
        //<button class="default_Button text-button" id="remindLater">Lembrar-me Mais Tarde</button>
        await page.waitForNavigation('#remindLater');
        await page.click('#remindLater')
    
        await delay(3000)
        
        //await page.click(`[type="submit"]`)
        //await page.screenshot({path: './print.jpeg', fullPage: true});
    
        //await browser.close;
    }catch(e){
        console.log("erro encontrando ", e)
    }
    ////}
    
    
    
    
    function delay(time){
        return new Promise(function(resolve){
            setTimeout(resolve, time);
        });
    }
    }
    

   