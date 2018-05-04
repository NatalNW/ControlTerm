/*ATEN��O, VOC� N�O ENTENDERA NADA DO QUE EST� AQUI, POIS AT� EU QUE CRIEI N�O SEI O PQ DE FUNCIONAR :C*/
var temperatura_atual = 0, nova_temperatura = 0; // cria as variaveis que faram as "anima��es" com os numeros da temperatura
var temperatura_minima = 0;
var temperatura_maxima = 0;


var vetorTemperaturas = new Array();

var vetorGambi = new Array(4);
vetorGambi[0] = 0;
vetorGambi[1] = 0;
vetorGambi[2] = 0;
vetorGambi[3] = 0;

var myChart = null;

//* parametros => de forma bem simplificade �: tudo oq tem dentro dos '()' ao se declarar uma funcao
// ex: function MinhaFuncao(numero) o parametro no caso � o 'numero', em 'MinhaFuncaio'
//voce pasara um 'numero' que ser� responsavel por fazer algo no codgio


function atualiza_numeros(antes, agora, minima, maxima) {// declara uma fun��o com o nome de 'atualiza_numeros' COM parametros* com a temperatura que est� 
    temperatura_atual = antes;           // marcando agora na p�gina representada pelo parametro(variavel) 'antes',
    nova_temperatura = agora;            // e a nova temperatura representado pelo 'agora'

    temperatura_minima = minima;
    temperatura_maxima = maxima;

    atualiza_termometro();


    document.getElementById("textos").innerHTML = "<canvas id='chart'></canvas>";

    var ctx = document.getElementById("chart").getContext("2d");
    ctx.canvas.width = 1000;
    ctx.canvas.height = 600;

    vetorTemperaturas.push(agora + "")



    for (var i = 3, j = vetorTemperaturas.length - 1; i >= 0; i-- , j--) {
        if (vetorTemperaturas[j] != undefined) {
            vetorGambi[i] = vetorTemperaturas[j];
        }



        //alert(vetorGambi[i]);
    }

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["", "", "", ""],
            datasets: [{
                label: "Temperatura",
                borderColor: '#ff6384',
                backgroundColor: '#ff6384',
                fill: false,
                data: [vetorGambi[0], vetorGambi[1], vetorGambi[2], vetorGambi[3]]

            }]
        },
        options: {
            layout: {
                padding: {
                    left: 50,
                    right: 50,
                    top: 20,
                    bottom: 20
                }
            },
            title: {
                display: true,
                text: '�ltimas Temperaturas',
                fontSize: 13,
                padding: 20
            },
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 15
                },
            },

            scales: {
                yAxes: [{
                    gridLines: {
                        display: true,
                        color: "#62e0e466"
                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: true,
                        color: "#62e0e466"
                    }
                }],
            }
        }
    });







    // executa a fun��o responsavel por fazer a anima��o da temperatura
}// fim fun��o que chama outras fun��es para atualizar a temperatura

function atualiza_termometro() { // declara uma fun��o com o nome de 'atualiza_termometro' SEM parametros
    if (temperatura_atual != nova_temperatura) { // if para saber quando a temperatura que est� marcada no site, ser� igual a nova temperatura registrada

        setTimeout(atualiza_termometro, 100); // setTimeuot � uma fun��o que da um delay na execu��o do codigo, nele � preciso passar dois parametros, 1� => a fun��o que voce quer q tenha delay, e o tempo de delay em MS
        atualiza_fundo_termometro(temperatura_atual); // executa a fun��p para alterar a cor da div do fundo do termometro
        alerta(temperatura_atual); // executa a fun��o que gera o alerta com som

        // infos_temperatura(temperatura_atual); // executa a fun��o que mostra na tela os textos sobre a temperatura    

    }
    //document = html, getElementById = pegar o elemento HTML que possua o id, "txt_temperatura" -> nome da ID, innerHTML -> escrever no html, temperatura_atual + "�c" -> escreve a temperatura em atualiza��o
    document.getElementById("txt_temperatura").innerHTML = temperatura_atual + "�c"; //Aqui estamos escrevendo dentro do html onde est� marcando a temperatura (dash.html)

    if (temperatura_atual < nova_temperatura) { // se a temperatura_atual for menor que a nova_temperatura
        temperatura_atual++; // a temperatura_atual � incrementa de 1 em 1, mesma coisa de temperatura_atual = temperatura_atual + 1; so que com '++' � simplificado isso

    }//fim if
    else if (temperatura_atual > nova_temperatura) { // se a temperatura_atual for maior que a nova_temperatura
        temperatura_atual--;// a temperatura_atual � subtraida de 1 em 1 ate chegar na nova temperatura
    }// fim else if

}// fim fun��o para fazer anima��o de numeros

function atualiza_fundo_termometro(grau) {// fun��o COM parametro para atualizar o fundo da div de temperatura 
    if (grau <= 3) { // se grau for menor q 11

        // * as classes s�o usadas para que o css consiga aplicar os efeitos

        //busca o elemento que tem "area_termometro"

        document.getElementById("area_termometro").className = "gelado";
        document.getElementById("ult_att").innerHTML = "Gelado";
        // adiciona uma CLASSE* nesse ID referenciado
    }
    else if (grau <= 10) { // etc
        document.getElementById("area_termometro").className = "frio";
        document.getElementById("ult_att").innerHTML = "Frio"; // adiciona uma nova classe
    } else if (grau <= 18) {
        document.getElementById("area_termometro").className = "fresco";
        document.getElementById("ult_att").innerHTML = "Fresco";
    } else if (grau <= 24) {
        document.getElementById("area_termometro").className = "ameno";
        document.getElementById("ult_att").innerHTML = "Ameno";
    } else if (grau <= 30) {
        document.getElementById("area_termometro").className = "calor_moderado";
        document.getElementById("ult_att").innerHTML = "Calor Moderado";
    } else if (grau <= 40) {
        document.getElementById("area_termometro").className = "calor_forte";
        document.getElementById("ult_att").innerHTML = "Calor Forte";
    } else if (grau > 40) {
        document.getElementById("area_termometro").className = "escaldante";
        document.getElementById("ult_att").innerHTML = "Escaldante";
    }

}

function alerta(grau) { // fun��o com parametro para gerar um alerta sonoro
    if (grau <= temperatura_minima || grau >= temperatura_maxima) { // faz a compara��o para saber se a temperatura est� em na faixa
        document.getElementById("alerta").play();// busca o tag <audio> no html que possua um id "alerta" -> <audio id="alerta"> e da um play nele
        document.getElementById("ar").className = "area armado";
    } else { // se nao estiver nesse periodo
        document.getElementById("alerta").pause(); // busca a tag <audio> que possua o id "alerta" e da um pause
        document.getElementById("ar").className = "area";
    }
}

function remove_infos() { // fun��o para remover os textos sobre as temperaturas -> presente em dash.html 
    var div = document.getElementById("textos");// declara uma variavel que guardara a DIV q possua o id "textos"
    var pt = document.getElementById("desc_temp");// declara uma variavel que guardara <DIV> q possua o id "desc_temp"
    var p = div.getElementsByTagName("p");// // declara uma variavel que guardara <p>. TagName = nome da temp (:p)

    try {//tente executar o c�digo
        pt.parentNode.removeChild(p[0]);//pega a div que guarda os <p>, e remove todos o <p> dentro, ele retorna um vetor de <p> e nos pegamos o primeiro, ai fica p[0]
    } catch (err) { } // se nao der nao fa�a nada




}//fim fu���o remove

function getSizeP() {// fun��o gambiarra que faz a mesma coisa da fun��o remove_info, so q ao inves de excluir, ele retorna a qnt de <p> que existe

    var div = document.getElementById("textos"); // acho q tu ja entendeu oq faz aqui
    var p = textos.getElementsByTagName("p");

    return p.length * 5;// retorna a quantidade de <p> existentes dentro da div#textos e multiplica por 5, pq? GAMBIARRA. o numero 5 foi o numero mais baixo q fez com q funcionasse D:
}//fim gamibarra


function getRandom(max) {// fun��o que nao existira mais tarde, ele retorna numeros aleatorios
    Math.floor(Math.random() * max)
}


function getViewConfiguracoes() {// fun��o para abrir a tela de configura��o, acho q voce ja entendeu como funciona isso, se voce viu os exemplos acima, mas vamos l�
    var div_fundo = document.getElementById("fundo_modal");// adiciona a uma variavel, a referencia que busca a div que possui o ID "fundo modal"
    div_fundo.className = "";// tira todas as classes da div que referenciamos acima
    div_fundo.className = "fundo_modal_on"; //adiciona uma classe para que o css aplique o efeito, no caso para mostrar a tela
}

function removerViewConfiguracoes() {// fun��o para remover a tela de configura��es
    var div_fundo = document.getElementById("fundo_modal");// msm coisa
    div_fundo.className = "";//remove as classe
    div_fundo.className = "fundo_modal_off"; //adiciona a classe para esconder a tela, classe adicionada para o css aplicar o efeito
}


function getViewAddArduino() { // mesma coisa da getViewConfiguracoes
    var div_fundo = document.getElementById("fundo_addArduino");
    div_fundo.className = "";
    div_fundo.className = "fundo_addArduino_on";
}

function removerViewAddArduino() {// mesma coisa da removerViewConfiguracoes
    var div_fundo = document.getElementById("fundo_addArduino");
    div_fundo.className = "";
    div_fundo.className = "fundo_addArduino_off";
}