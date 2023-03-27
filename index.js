const display = document.querySelector('.display');
const botoes = document.querySelectorAll('button');
let operadorAtual = '0';
let operadorAnterior = '';
let operador = undefined;

function limpar() {
	operadorAtual = '0';
	operadorAnterior = '';
	operador = undefined;
}
function adicionarAoDisplay(number) {
	if (operadorAtual === '0') {
		operadorAtual = number;
	} else {
		operadorAtual = operadorAtual.toString() + number.toString();
	}
}
function escolherOperando(operacaoEscolhida) {
	if (operadorAtual === '') return;
	if (operadorAnterior !== '') {
		calcular();
	}
	operador = operacaoEscolhida;
	operadorAnterior = operadorAtual;
	operadorAtual = '';
}

function calcular() {
	let resultado;
	const previo = parseFloat(operadorAnterior);
	const corrente = parseFloat(operadorAtual);
	if (isNaN(previo) || isNaN(corrente)) return;
	switch (operador) {
		case '+':
			resultado = previo + corrente;
			break;
		case '-':
			resultado = previo - corrente;
			break;
		case 'x':
			resultado = previo * corrente;
			break;
		case '÷':
			resultado = previo / corrente;
			break;
		default:
			return;
	}
	operadorAtual = resultado.toString();
	operador = undefined;
	operadorAnterior = '';
}

function updateDisplay() {
	display.textContent = operadorAtual;
}

botoes.forEach((botao) => {
	botao.addEventListener('click', () => {
		if (botao.classList.contains('limpar')) {
			limpar();
			updateDisplay();
		} else if (botao.classList.contains('sinal')) {
			operadorAtual =
				parseFloat(operadorAtual) === 0
					? '0'
					: parseFloat(operadorAtual) > 0
						? `-${operadorAtual}`
						: Math.abs(operadorAtual).toString();
			updateDisplay();
		} else if (botao.classList.contains('porcentagem')) {
			operadorAtual = parseFloat(operadorAtual) / 100;
			updateDisplay();
		} else if (botao.classList.contains('lateral')) {
			escolherOperando(botao.textContent);
		} else if (botao.classList.contains('igual')) {
			calcular();
			updateDisplay();
		} else if (botao.id === 'zero' && operadorAtual !== '0') {
			adicionarAoDisplay(botao.textContent);
			updateDisplay();
		} else if (botao.textContent === ',') {
			if (!operadorAtual.includes('.')) {
				operadorAtual = operadorAtual.toString() + '.';
			}
			updateDisplay();
		} else {
			adicionarAoDisplay(botao.textContent);
			updateDisplay();
		}
	});
});
