//carregamento das listas atraves dos arq .txt
//foi criado arrays de cada lista para poder modificar mais adiante, mediante selecoes feitas

let dadosEsquerdo = []
let dadosCentro = []
let dadosDireito = []

fetch('esquerdo.txt')
.then(res => res.text())
.then(texto => 
{
    dadosEsquerdo = texto.split('\n').map(linha => linha.trim())
    // console.log(dadosEsquerdo)
    preencherSelect('conE', dadosEsquerdo)
});

fetch('centro.txt')
.then(res => res.text())
.then(texto => 
{
    dadosCentro = texto.split('\n').map(linha => linha.trim())
    // console.log(dadosCentro)
    preencherSelect('rolo', dadosCentro)
});

fetch('direito.txt')
.then(res => res.text())
.then(texto => 
{
    dadosDireito = texto.split('\n').map(linha => linha.trim())
    // console.log(dadosDireito)
    preencherSelect('conD', dadosDireito)
});

function preencherSelect(idSelect, listaOriginal, listaPermitida = null, classeBloqueada = "") {
    const select = document.getElementById(idSelect);
    select.innerHTML = '';

    listaOriginal.forEach(nome => {
        const nomeLimpo = nome.replace(".png", "");
        const opt = document.createElement("option");
        opt.value = nome;
        opt.textContent = nomeLimpo.replace("_", "/");

        const permitido = !listaPermitida || listaPermitida.includes(nomeLimpo);
        if (!permitido) {
            opt.disabled = true;
            if (classeBloqueada) {
                opt.classList.add(classeBloqueada);
            }
        }

        select.appendChild(opt);
    });
}

function atualizarRolo(){
    let conE = document.getElementById("conE").value.replace(".png","")
    let roloPermitidos = compatibilidadeConE[conE]
    preencherSelect("rolo", dadosCentro, roloPermitidos, "opcao-bloqueada")
}

function atualizarConD(){
    let conE = document.getElementById("conE").value.replace(".png","")
    let conEPermitidos = compatibilidadeConD[conE]
    preencherSelect("conD", dadosDireito, conEPermitidos, "opcao-bloqueada")
}


//lista de compatibilidades

const compatibilidadeConE = {
    "LC_PC": ["SX SM"],
    "LC_APC": ["SX SM"],
    "LC_PC Duplex": ["DX SM"],
    "LC_APC Duplex": ["DX SM"],
    "SC_PC": ["SX SM"],
    "SC_APC": ["SX SM"],
    "SC_PC Duplex": ["DX SM"],
    "SC_APC Duplex": ["DX SM"],
    "SC_MM Duplex": ["DX MM OM2","DX MM OM3"],     
}
  
const compatibilidadeConD = {
    "LC_PC": ["LC_APC","LC_PC","SC_PC","SC_APC"],
    "LC_APC": ["LC_APC","LC_PC","SC_PC","SC_APC"],
    "LC_PC Duplex": ["LC_APC Duplex","LC_PC Duplex","SC_PC Duplex","SC_APC Duplex"],
    "LC_APC Duplex": ["LC_APC Duplex","LC_PC Duplex","SC_PC Duplex","SC_APC Duplex"],
    "SC_PC": ["LC_APC","LC_PC","SC_PC","SC_APC"],
    "SC_APC": ["LC_APC","LC_PC","SC_PC","SC_APC"],
    "SC_PC Duplex": ["LC_APC Duplex","LC_PC Duplex","SC_PC Duplex","SC_APC Duplex"],
    "SC_APC Duplex": ["LC_APC Duplex","LC_PC Duplex","SC_PC Duplex","SC_APC Duplex"],
    "SC_MM Duplex": ["SC_MM Duplex"],    
}
   
// gatilhos ao clicar nas opcoes

document.getElementById("conE").addEventListener("click", () => {
    atualizarRolo()
    atualizarConD()
    updateCanvas()
})
document.getElementById("rolo").addEventListener("click", updateCanvas)
document.getElementById("conD").addEventListener("click", updateCanvas)

// atualiza a pre visualizacao

function updateCanvas(){
    const conE = document.getElementById("conE").value.replace(".png", "")
    const rolo = document.getElementById("rolo").value.replace(".png", "")
    const conD = document.getElementById("conD").value.replace(".png", "")

    console.log("Valor conE selecionado:", conE);
    console.log("Opções compatíveis:", compatibilidadeConE[conE]);
    console.log("Valor conE selecionado:", conD);
    console.log("Opções compatíveis:", compatibilidadeConD[conD]);

    const selectE = document.getElementById("conE")
    const arquivoE = selectE.value
    const selectC = document.getElementById("rolo")
    const arquivoC = selectC.value
    const selectD = document.getElementById("conD")
    const arquivoD = selectD.value

    const canvas = document.getElementById("meuCanvas")
    const ctx = canvas.getContext("2d")
    
    canvas.width = 638;
    canvas.height = 420;

    const imgE = new Image()
    const imgC = new Image()
    const imgD = new Image()
    
    let carregadas = 0

    function preCarregar(){
        carregadas ++
        if(carregadas === 3){
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(imgE, 0, 20)
            ctx.drawImage(imgC, 127, 20)
            ctx.drawImage(imgD, 511, 20)
        }
    }

    imgE.onload = preCarregar
    imgC.onload = preCarregar
    imgD.onload = preCarregar

    imgE.src = `images/Conectores - Esquerdo/${arquivoE}`
    imgC.src = `images/Cabo Central/${arquivoC}`
    imgD.src = `images/Conectores - Direito/${arquivoD}`
}

//procedimentos do canvas para gerar as imagens a partir do click

const enviar = document.getElementById("btnGerar")
enviar.addEventListener("click", function()
{
    const selectE = document.getElementById("conE")
    const arquivoE = selectE.value
    const selectC = document.getElementById("rolo")
    const arquivoC = selectC.value
    const selectD = document.getElementById("conD")
    const arquivoD = selectD.value

    let carregadoE = false
    let carregadoC = false
    let carregadoD = false

    const canvas = document.getElementById("meuCanvas")
    const ctx = canvas.getContext("2d")
    
    canvas.width = 638;
    canvas.height = 420;

    const imgE = new Image()
    const imgC = new Image()
    const imgD = new Image()
    
    imgE.src = `images/Conectores - Esquerdo/${arquivoE}`
    imgC.src = `images/Cabo Central/${arquivoC}`
    imgD.src = `images/Conectores - Direito/${arquivoD}`

    //desenha a linha e setas

    const comprimento = document.getElementById("comprimento").value
    ctx.font = "30px Verdana"
    ctx.fillStyle = "black"
    ctx.textAlign = "center"
    ctx.fillText(`${comprimento} m`, canvas.width / 2, 45) // (texto, posicao x, posicao y)

    ctx.strokeStyle = "black"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(30, 60)
    ctx.lineTo(608, 60)
    ctx.stroke()
    
    //setas
    
    ctx.beginPath()
    ctx.moveTo(30, 60)
    ctx.lineTo(40, 55)
    ctx.lineTo(40, 65)
    ctx.closePath()
    ctx.fill()
    
    ctx.beginPath()
    ctx.moveTo(608, 60)
    ctx.lineTo(598, 55)
    ctx.lineTo(598, 65)
    ctx.closePath()
    ctx.fill()

    //fim da linha e setas

    imgE.onload = function(){
        ctx.drawImage(imgE, 0, 20)
        carregadoE = true
        todosCarregados();
    }
    imgC.onload = function(){
        ctx.drawImage(imgC, 127, 20)
        carregadoC = true
        todosCarregados();
    }
    imgD.onload = function(){
        ctx.drawImage(imgD, 511, 20)
        carregadoD = true
        todosCarregados();
    }

    function todosCarregados(){
        if (carregadoE && carregadoC && carregadoD){
            const imgFinal = canvas.toDataURL("image/png")
    const link = document.createElement('a')
    link.href = imgFinal
    link.download = "cabo-final.png"
    link.click()
        }

    }
}
)