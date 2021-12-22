let timerId = null; //var que armazena a chamda da function timeout
var url = window.location.search;
var refBaloes = 90;
var qntdBaloes = 0;

url = url.replace('?','');
function iniciaJogo() {
	

	var segundos = 0;

	if (url == 1) {
		segundos = 120;
	} else if (url == 2) {
		segundos = 60;
	} else if (url == 3) {
		segundos = 30;
	}
	document.getElementById('cronometro').innerHTML = segundos;
	

	//qntd de balões

	

	criaBaloes(refBaloes);

	//imprimir placar
	document.getElementById('baloesInteiros').innerHTML = qntdBaloes;
	document.getElementById('baloesEstourados').innerHTML = 0;

	contagemTempo(segundos + 1);

	

}
function contagemTempo(seg){


	
	seg--;
	if (seg == -1) {
		clearTimeout(timerId);
		gameOver();
		return false;
		
	}
	document.getElementById('cronometro').innerHTML = seg;
	timerId = setTimeout(() => {contagemTempo(seg)}, 1000);

}

function gameOver() {
	removeEstouro();
	alert('Você perdeu! Tente novamente');
	
}

function criaBaloes(refBaloes){



	for (var i = 1; i <= refBaloes; i++) {
		if(Math.random() > 0.4) {
			qntdBaloes++;
			var balao = document.createElement('img');
			balao.src = 'img/balao_azul_pequeno.png';
			balao.style.margin = '10px';
			balao.id = 'b' + qntdBaloes;
			balao.onclick = function(){ estourar(this); };
			document.getElementById('cenario').appendChild(balao);
			
		} else {
			var vazio = document.createElement('img');
			vazio.src = 'img/vazio.png';
			vazio.style.margin = '10px';
			document.getElementById('cenario').appendChild(vazio);
		}
	}
}

function estourar(e){
	var idBalao = e.id;
	document.getElementById(idBalao).setAttribute('onclick', '');
	document.getElementById(idBalao).src = 'img/balao_azul_pequeno_estourado.png';
	score(-1);
}

function score(ponto) {
	var inteiros = document.getElementById('baloesInteiros').innerHTML;
	var estourados = document.getElementById('baloesEstourados').innerHTML;

	inteiros = parseInt(inteiros);
	estourados = parseInt(estourados);

	inteiros = inteiros + ponto;
	estourados = estourados - ponto;

	document.getElementById('baloesInteiros').innerHTML = inteiros;
	document.getElementById('baloesEstourados').innerHTML = estourados;

	ganhou(inteiros);
}

function ganhou(inteiros) {
	if (inteiros == 0) {
		if (url == 1) {
		alert('Parabéns! Você conseguiu! Tente no médio.');
		} else if (url == 2) {
		alert('Parabéns! Você conseguiu! Tente no difícil.');
		} else if (url == 3) {
		alert('Parabéns! Você conseguiu! Vou te dar um presentinho');
		}
	paraJogo();
	}
}

function paraJogo() {
	clearTimeout(timerId);
	
}

function removeEstouro() {
	 var i = 1; //contado para recuperar balões por id
    
    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(i <= qntdBaloes) {
    	//retira o evento onclick do elemnto
        document.getElementById('b'+ i).onclick = null;
        i++; //faz a iteração da variávei i
    }
}