const codigoDigitando = document.querySelector("#codigo-digitando");
const botaoMenu = document.querySelector(".menu-toggle");
const cabecalho = document.querySelector(".cabecalho");

const codigo = `const desenvolvedor = {
  nome: "Luiz Henrique",
  area: ["Front-End", "Back-End"],
  foco: "Código limpo",
  objetivo: "Primeiro estágio",
  estudando: "Ciência da Computação"
};

function apresentar(dev) {
  return \`Olá, eu sou \${dev.nome} e busco evoluir como dev.\`;
}

console.log(apresentar(desenvolvedor));`;

let letraAtual = 0;

function escreverCodigo() {
    if (!codigoDigitando) {
        return;
    }

    codigoDigitando.textContent = codigo.slice(0, letraAtual);
    letraAtual++;

    if (letraAtual <= codigo.length) {
        setTimeout(escreverCodigo, 45);
        return;
    }

    setTimeout(() => {
        letraAtual = 0;
        escreverCodigo();
    }, 2500);
}

escreverCodigo();

if (botaoMenu && cabecalho) {
    botaoMenu.addEventListener("click", () => {
        const menuAberto = cabecalho.classList.toggle("menu-aberto");

        botaoMenu.setAttribute("aria-expanded", String(menuAberto));
        botaoMenu.setAttribute("aria-label", menuAberto ? "Fechar menu" : "Abrir menu");
    });

    cabecalho.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            cabecalho.classList.remove("menu-aberto");
            botaoMenu.setAttribute("aria-expanded", "false");
            botaoMenu.setAttribute("aria-label", "Abrir menu");
        });
    });
}

const techCards = document.querySelectorAll(".tech-card");

function animarPorcentagem(elemento, valorFinal) {
    let valorAtual = 0;
    const incremento = Math.max(1, Math.ceil(valorFinal / 40));

    const contador = setInterval(() => {
        valorAtual += incremento;

        if (valorAtual >= valorFinal) {
            valorAtual = valorFinal;
            clearInterval(contador);
        }

        elemento.textContent = `${valorAtual}%`;
    }, 22);
}

function animarCardTech(card, index) {
    const barra = card.querySelector(".tech-barra span");
    const porcentagem = card.querySelector(".tech-avaliacao strong");
    const nivel = Number(card.dataset.nivel);

    setTimeout(() => {
        card.classList.add("ativo");

        if (barra) {
            barra.style.width = `${nivel}%`;
        }

        if (porcentagem) {
            animarPorcentagem(porcentagem, nivel);
        }
    }, 160 * index);
}

const observerTech = new IntersectionObserver((entradas, observer) => {
    entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) {
            return;
        }

        techCards.forEach(animarCardTech);
        observer.disconnect();
    });
}, {
    threshold: 0.25
});

if (techCards.length) {
    observerTech.observe(techCards[0].parentElement);
}

techCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
        const area = card.getBoundingClientRect();
        const x = event.clientX - area.left;
        const y = event.clientY - area.top;
        const centroX = area.width / 2;
        const centroY = area.height / 2;
        const rotacaoX = ((y - centroY) / centroY) * -5;
        const rotacaoY = ((x - centroX) / centroX) * 5;

        card.style.transform = `translateY(-5px) rotateX(${rotacaoX}deg) rotateY(${rotacaoY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
    });
});
