//carregamento das listas atraves dos arq .txt

fetch('esquerdo.txt')
.then(res => res.text())
.then(texto => 
{
    const nomesE = texto.split('\n').map(linha => linha.trim())
    console.log(nomesE)
    const selectE = document.getElementById('conE')

    nomesE.forEach(nome => {
        const optE = document.createElement('option')
        optE.value = nome;
        optE.textContent = nome.slice(0,-4)
        selectE.appendChild(optE)
        console.log(optE)
    });
});

fetch('centro.txt')
.then(res => res.text())
.then(texto => 
{
    const nomesC = texto.split('\n').map(linha => linha.trim())
    console.log(nomesC)
    const selectC = document.getElementById('rolo')

    nomesC.forEach(nome => {
        const optC = document.createElement('option')
        optC.value = nome
        optC.textContent = nome.slice(0,-4)
        selectC.appendChild(optC)
        console.log(optC)
    });
});

fetch('direito.txt')
.then(res => res.text())
.then(texto => 
{
    const nomesD = texto.split('\n').map(linha => linha.trim())
    console.log(nomesD)
    const selectD = document.getElementById('conD')

    nomesD.forEach(nome => {
        const optD = document.createElement('option')
        optD.value = nome;
        optD.textContent = nome.slice(0,-4)
        selectD.appendChild(optD)
        console.log(optD)
    });
});

// atualiza a pre visualizacao

document.getElementById("conE").addEventListener("change", updateCanvas)
document.getElementById("rolo").addEventListener("change", updateCanvas)
document.getElementById("conD").addEventListener("change", updateCanvas)

function updateCanvas(){
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
    ctx.fillText(comprimento, canvas.width / 2, 45) // (texto, posicao x, posicao y)

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