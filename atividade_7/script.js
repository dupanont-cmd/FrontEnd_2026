const cria = document.getElementById("b");
const btn = document.getElementById("btn");
const starsLayer = document.getElementById("starsLayer");
const toggleNoite = document.getElementById("toggleNoite");

const estados = {
    normal:  "b_n.png",
    puto: "b_p.png",
    morto: "b_d.png",
    comendo: "b_c.png",
    alimentado: "b_a.png",
};

// Variáveis de controle de estado do bichinho
let contador = 0; 
let intervalo = null;
let timeoutClique = null;
let timeoutBack = null;
let estaMorto = false; // Flag para impedir que alimente depois de morto

// Variáveis de controle de ciclo Dia/Noite
let horas = 0;
let cicloHoras = null;
let cicloManual = false; // Detecta se o usuário clicou no botão Toggle

// Lógica de Fome e Morte da Criatura
function controlador() {
    if (intervalo) clearInterval(intervalo);
        
    intervalo = setInterval(() => {
        if (estaMorto) return; // Se morreu, para de contar

        contador++;
        console.log("Fome (tempo):", contador);
        
        if (contador === 30) {
            cria.src = estados.puto;
        }

        if (contador === 60) {
            cria.src = estados.morto;
            estaMorto = true; // Desafio: Impedir alimentar após a morte
            console.log("A criatura morreu de fome!");
        }
    }, 1000); // 1 segundo equivale a 1 tempo de fome
}

// Lógica de Alimentação
function alimentar() {
    // Desafio: Impede a alimentação se ele já estiver morto
    if (estaMorto) {
        console.log("Você não pode alimentar uma criatura morta.");
        return; 
    }

    cria.src = estados.comendo;
    contador = 0; // Reseta a fome do bichinho
    console.log("Comendo...");

    // Limpa tempos anteriores para não bugar caso o usuário clique rápido demais
    if (timeoutClique) clearTimeout(timeoutClique);
    if (timeoutBack) clearTimeout(timeoutBack);

    timeoutClique = setTimeout(() => {
        cria.src = estados.alimentado; // Fica feliz e amável

        timeoutBack = setTimeout(() => {
            if (!estaMorto) { // Confere para não voltar ao normal de forma bizarra
                cria.src = estados.normal;
            }
        }, 2000);

    }, 1000);
}

// Lógica para aplicar os efeitos visuais de Dia ou Noite
function aplicarTema(isNoite) {
    if (isNoite) {
        document.body.classList.add('tema-noite');
        starsLayer.classList.add('tema-noite-stars');
        toggleNoite.checked = true;
    } else {
        document.body.classList.remove('tema-noite');
        starsLayer.classList.remove('tema-noite-stars');
        toggleNoite.checked = false;
    }
}

// Controle de ciclo contínuo do Fundo (Transição Dia e Noite)
function atualizarFundo() {
    if (cicloHoras) clearInterval(cicloHoras);

    cicloHoras = setInterval(() => {
        if (cicloManual) return; // Se o usuário acionou manualmente o toggle, pausa a automação.

        horas++;
        
        // Das 12h às 23h é noite
        if (horas >= 12 && horas < 24) {
            aplicarTema(true);
        } else {
            // Das 0h às 11h é dia
            aplicarTema(false);
        }

        if (horas >= 24) horas = 0;

    }, 1000); // 1 segundo equivale a 1 "hora" do ciclo
}

// Event Listener para o Toggle DaisyUI (Botão Switch manual)
toggleNoite.addEventListener('change', (event) => {
    cicloManual = true; // Acionou manualmente
    aplicarTema(event.target.checked);
});

// Inicialização dos sistemas
controlador();
atualizarFundo();