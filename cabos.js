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
    // é carregada depois do Fetch ou também pelas funcoes atualizarRolo() e atualizarConD()
    // PARAMETROS

    // recebe o id (conE, conD ou rolo)
    // preenche a lista com todos os nomes resgatados dos documentos .txt
    // parâmetro null pois será montado a seguir ou através do roloPermitidos
    // string vazia para depois ser indicada a adição da classe no "if" ou a string "opcao-bloqueada"

    const select = document.getElementById(idSelect);
    select.innerHTML = '';
    // seleciona o Id (conE, conD ou rolo) coloca na variável select e é limpo do conteúdo

    listaOriginal.forEach(nome => {
    // para cada linha da lista é feito o procedimento abaixo.
        const nomeLimpo = nome.replace(".png", "");
        const opt = document.createElement("option");
        opt.value = nome;                               // nome real com a extensao .png
        opt.textContent = nomeLimpo.replace("_", "/");  // nome que aparece na tela
    // cria uma "option" no "select" do HTML, com os nomes de cada linha

        const permitido = !listaPermitida || listaPermitida.includes(nomeLimpo);
    // primeiro valor = negação do Array da lista de compatibilidade
    // segundo valor = vê se o nome está na lista permitida, usando o .includes
    // É permitido se a lista de permitidos não existe OU se o item está incluído na lista
        if (!permitido) {
            opt.disabled = true;                        // se não for permitido, desativa o opt (a opção)
            if (classeBloqueada) {                      // se classeBloqueada for true 
                opt.classList.add(classeBloqueada);     // add a class no elemento
            }
        }
        select.appendChild(opt); // adiciona a opção (permitida ou bloqueada) ao <select>
    });
}

let dados = {};

async function carregarDadosCSV() {
    const urlCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQe60v0tkbVjOl1WbIcqfc8AdS4cjfgKTiXdRLT5O-48TsFtfHgwFQOa2Q9orYZNGyTVI1IWb6Bg-DI/pub?gid=0&single=true&output=csv";

    const resposta = await fetch(urlCSV);
    const textoCSV = await resposta.text();

    const linhas = textoCSV.split("\n").map(l => l.trim());
    const cabecalhos = linhas[0].split(",");

    for (let i = 1; i < linhas.length; i++) {
        const linha = linhas[i].split(",");
        if (linha.length < 3) continue;

        const registro = {};

        for (let j = 1; j < cabecalhos.length; j++) {
            let valor = linha[j] || "";

            if (cabecalhos[j].toLowerCase() === "custo") {
                valor = parseFloat(
                    valor.replace(/€/g, "").replace(",", ".").replace(/"/g, "").trim()
                );
            }

            registro[cabecalhos[j]] = valor;
        }

        const chave = linha[0];
        dados[chave] = registro;
    }

    console.log("Dicionário de dados:", dados);
}

async function atualizarDescricaoECusto() {
    if (Object.keys(dados).length === 0) {
        await carregarDadosCSV();
    }

    const arquivoE = document.getElementById("conE").value;
    const arquivoC = document.getElementById("rolo").value;
    const arquivoD = document.getElementById("conD").value;
    const comprimento = parseFloat(document.getElementById("comprimento").value);

    const descricaoE = dados[arquivoE]?.DESCRICAO || arquivoE;
    const descricaoC = dados[arquivoC]?.DESCRICAO || arquivoC;
    const descricaoD = dados[arquivoD]?.DESCRICAO || arquivoD;

    const nomeGerado = document.getElementById("nomeGerado");
    const custoE = dados[arquivoE]?.CUSTO || 0;
    const custoC = dados[arquivoC]?.CUSTO || 0;
    const custoD = dados[arquivoD]?.CUSTO || 0;

    const custo = document.getElementById("custo");

    if (!comprimento || comprimento <= 0) {
        nomeGerado.textContent = `Patchcord ${descricaoC} 2.0mm ${descricaoE} ${descricaoD}`;
        custo.textContent = "Este comprimento não é válido";
        return;
    }

    const custoTotal = custoE + custoD + (comprimento * custoC);
    nomeGerado.textContent = `Patchcord ${descricaoC} 2.0mm ${descricaoE} ${descricaoD} ${comprimento}m`;
    custo.textContent = `${custoTotal.toFixed(2)} €`;
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
    "LC_PC": ["SX SM G652D", "SX SM G657A2"],
    "LC_APC": ["SX SM G652D", "SX SM G657A2"],
    "LC_PC Duplex": ["DX SM G652D", "DX SM G657A2"],
    "LC_APC Duplex": ["DX SM G652D", "DX SM G657A2"],
    "SC_PC": ["SX SM G652D", "SX SM G657A2"],
    "SC_APC": ["SX SM G652D", "SX SM G657A2"],
    "SC_PC Duplex": ["DX SM G652D", "DX SM G657A2"],
    "SC_APC Duplex": ["DX SM G652D", "DX SM G657A2"],
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
enviar.addEventListener("click", async function()
{
    const arquivoE = document.getElementById("conE").value
    const arquivoC = document.getElementById("rolo").value
    const arquivoD = document.getElementById("conD").value
    const comprimento = parseFloat(document.getElementById("comprimento").value);

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

    const desenharSetas = () => {
        if (comprimento && comprimento > 0) {
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
        }
    }
    //fim da linha e setas
    // carregamento das imagens

    let carregadas = 0;

    function verificarImagens() {
        carregadas++;
        if (carregadas === 3) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(imgE, 0, 20);
            ctx.drawImage(imgC, 127, 20);
            ctx.drawImage(imgD, 511, 20);
            desenharSetas();

            const imgFinal = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = imgFinal;
            link.download = "cabo-final.png";
            link.click();
        }
    }

    imgE.onload = verificarImagens;
    imgC.onload = verificarImagens;
    imgD.onload = verificarImagens;
}
)

document.getElementById("comprimento").addEventListener("input", atualizarDescricaoECusto);
document.getElementById("conE").addEventListener("change", atualizarDescricaoECusto);
document.getElementById("rolo").addEventListener("change", atualizarDescricaoECusto);
document.getElementById("conD").addEventListener("change", atualizarDescricaoECusto);


