let numeroCartas=Number(prompt("quantas cartas?"));

while(numeroCartas%2!=0 || numeroCartas<3 || numeroCartas>14 ){
   numeroCartas=Number(prompt("quantas cartas?"));
}


let todasCartas=[ 'assets/bobrossparrot.gif',
   'assets/explodyparrot.gif',
   'assets/fiestaparrot.gif',
   'assets/metalparrot.gif',
   'assets/revertitparrot.gif',
   'assets/tripletsparrot.gif',
   'assets/nicornparrot.gif'
];
todasCartas.sort(comparador);
let CartasIniciais=[];
let contador=0;
let acertos=0;
let totalJogadas=0;

while(contador<(numeroCartas/2)){
   CartasIniciais.push(todasCartas[contador]);
   CartasIniciais.push(todasCartas[contador]);
contador++;
}
CartasIniciais.sort(comparador); 
function comparador() { 
	return Math.random() - 0.5; 
}

console.log(CartasIniciais);

for(let contador=0; contador<numeroCartas;contador++){
   const carta=document.querySelector('.todasCartas');
   carta.innerHTML+= `<div onclick="girar(this)" class="carta">
                <img class="primeira" src="assets/back.png" alt="">
                <img class="segunda aberta" src="${CartasIniciais[contador]}" alt="">
                  </div>
            `
}
function girar(elemento){
   elemento.classList.add('verso');
   setTimeout(() => mostrarCarta(elemento), 500);
   verificarJogada(elemento);
   
}


function mostrarCarta(elemento){
         let imagemFechada = elemento.querySelector('.primeira');
         let imagemAberta=elemento.querySelector('.segunda');
         imagemFechada.classList.add('aberta');
         imagemAberta.classList.remove('aberta');
         totalJogadas++;
}

let verifica = [];
let cartaSelecionada = null;
let bloqueiaClique = false;

function verificarJogada(elemento) {
    if (!elemento.classList.contains('virada')) {
    elemento.classList.add('virada');
    const imagemFechada = elemento.querySelector('.primeira');
    const imagemAberta = elemento.querySelector('.segunda');
    imagemFechada.classList.add('aberta');
    imagemAberta.classList.remove('aberta');

    verifica.push(elemento);

    if (verifica.length === 2) {
        bloqueiaClique = true; 
        const [primeiraCarta, segundaCarta] = verifica;
        const imagemSrc1 = primeiraCarta.querySelector('.segunda').src;
        const imagemSrc2 = segundaCarta.querySelector('.segunda').src;

        if (imagemSrc1 === imagemSrc2) {
            verifica = [];
            acertos++;
            bloqueiaClique = false;
         contaAcertos(); 
           
        } else {
            setTimeout(() => {
                const imagemFechada1 = primeiraCarta.querySelector('.primeira');
                const imagemAberta1 = primeiraCarta.querySelector('.segunda');
                const imagemFechada2 = segundaCarta.querySelector('.primeira');
                const imagemAberta2 = segundaCarta.querySelector('.segunda');
           
                imagemFechada1.classList.remove('aberta');
                imagemAberta1.classList.add('aberta');
                imagemFechada2.classList.remove('aberta');
                imagemAberta2.classList.add('aberta');
                
                primeiraCarta.classList.remove('virada');
                segundaCarta.classList.remove('virada');
               primeiraCarta.classList.remove('verso');
               segundaCarta.classList.remove('verso');
                verifica = [];
            }, 1500);
        }
    }
}}
function contaAcertos(){
   if(acertos===(numeroCartas/2)){
      setTimeout(() => {
         alert(`Você ganhou com ${totalJogadas} jogadas!`);
     }, 500);
   }
}

