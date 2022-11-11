// display lobby existe
let displayLobbyExists = false
// display roleta existe
let displayRoletaExists = false
//variaveis de configuração

//Vai vir de forma dinamica
let altosBaixosRep = 0
let ficha = 0
let stopGain = 0
let stopLoss = 0
let gale = 0
//contagem de acertos e erros, apresentar no vistor de login
let contagemAcertos = 0
let contagemErros = 0


//altos e baixos da roleta
let numerosBaixos = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18']
let numerosAltos = ['19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36']

//variavel que indica inicio de aposta
let apostouAltosBaixos = false

//variavel de apostas automaticas
var ciclo = 0
var fichaPreparada = 0
var apostaFeita = 0
var sequenciaAtual = []
var cicloGale = 1




function listarRoletasLobby(qtd) {
    roletasLobby = []
    // preencher a lista de roletas 
    for (let i = 0; i < qtd; i++) {
        if (document.getElementsByClassName('lobby-tables__item')[i].getElementsByClassName('lobby-table__name-container').length == 1) {
            nomeRoleta = document.getElementsByClassName('lobby-tables__item')[i].getElementsByClassName('lobby-table__name-container')[0].outerText
        } else {
            nomeRoleta = ''
        }
        if (document.getElementsByClassName('lobby-tables__item')[i].getElementsByClassName('roulette-historyfOmuwAaXbwHRa3HTIjFP').length == 1) {
            sequenciaRoleta = document.getElementsByClassName('lobby-tables__item')[i].getElementsByClassName('roulette-historyfOmuwAaXbwHRa3HTIjFP')[0].outerText
        } else {
            sequenciaRoleta = []
        }

        if (sequenciaRoleta.length != 0) {
            //transformar texto em lista
            var listaSequenciaOld = sequenciaRoleta.split("\n")
            //tamanho da lista
            var sizesequencia = listaSequenciaOld.length
            //nova lista para receber a sequencia sem multiplicadores
            var listaSequenciaNew = []
            //retirar multiplicadores
            for (let i = 0; i < sizesequencia; i++) {
                if (listaSequenciaOld[i].charAt(0) != "x") {
                    listaSequenciaNew.push(listaSequenciaOld[i])
                }
            }

            roletasLobby.push({ nome: nomeRoleta, sequencia: listaSequenciaNew })
        } else {
            roletasLobby.push({ nome: nomeRoleta, sequencia: sequenciaRoleta })
        }

    }

    return roletasLobby

}

function prepararFicha() {
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

}

function carregarRoleta() {
    roleta = []
    // preencher a roleta 
    nomeRoleta = document.getElementsByClassName('table-info__nameWp_dByC6ZNXpXrcSPbRB')[0].outerText
    sequenciaRoleta = document.getElementsByClassName('roulette-historyfOmuwAaXbwHRa3HTIjFP')[0].outerText
    //transformar texto em lista
    var listaSequenciaOld = sequenciaRoleta.split("\n")
    //tamanho da lista
    var sizesequencia = listaSequenciaOld.length
    //nova lista para receber a sequencia sem multiplicadores
    var listaSequenciaNew = []
    //retirar multiplicadores
    for (let i = 0; i < sizesequencia; i++) {
        if (listaSequenciaOld[i].charAt(0) != "x") {
            listaSequenciaNew.push(listaSequenciaOld[i])
        }
    }

    roleta.push({ nome: nomeRoleta, sequencia: listaSequenciaNew })

    //retornar roleta
    return roleta

}



// Ciclo do bot, momento de parar depende quantidade de acerto ou erro. 
setInterval(() => {
    try {
        ciclo++
        if (stopGain == contagemAcertos || stopLoss == contagemErros) {
            //botão de erro de sessão
            if (document.getElementsByClassName('modal-footer-btn modal-footer-btn_resolve modal-footer-btn_full').length == 1) {
                document.getElementsByClassName('modal-footer-btn modal-footer-btn_resolve modal-footer-btn_full')[0].click()
            }
            if (document.getElementsByClassName('lobby-tables__item').length > 1) {
                if (!displayLobbyExists) {
                    if (document.querySelector('.lobby-header__filterqDmLZJ0RC7XlyyjENEqe')) {
                        painelLobby = document.querySelector('.lobby-header__filterqDmLZJ0RC7XlyyjENEqe')
                    } else if (document.querySelector('.lobby__filter')) {
                        painelLobby = document.querySelector('.lobby__filter')
                    }
                    painelLobby.insertAdjacentHTML('afterbegin', '<h1 id = "displaybotlobby" style="width: 90%;background-color: #56ef00;color: black;text-align: center; font-size: xx-large;font-weight: bolder;align-self: center;"></h1>')
                    displayRoletaExists = false
                    displayLobbyExists = true
                }
                inserirTextoDisplay(`Bot Auto- ${contagemAcertos} ACERTOS - ${contagemErros} ERROS`, 1)
            }
            if (ciclo > 200 && document.getElementsByClassName('lobby-tables__item').length > 1) {
                document.getElementsByClassName('lobby-table__game-logo')[14].click()
            }
            if (ciclo > 200 && document.getElementsByClassName('lobby-tables__item').length == 0) {
                document.getElementsByClassName('close-button header__close-button')[0].click()
                ciclo = 0
            }
        } else {
            //botão de erro de sessão
            if (document.getElementsByClassName('modal-footer-btn modal-footer-btn_resolve modal-footer-btn_full').length == 1) {
                document.getElementsByClassName('modal-footer-btn modal-footer-btn_resolve modal-footer-btn_full')[0].click()
            }

            if (ciclo > 200 && document.getElementsByClassName('lobby-tables__item').length > 1) {
                document.getElementsByClassName('lobby-table__game-logo')[14].click()
                ciclo = 0
            }
            //analisar estrategias
            analisandoEstrategias()
        }

    } catch (err) {
        console.log(err)
    }

}, 5000)
