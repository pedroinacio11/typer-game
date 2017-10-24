$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria() {

    //loading .. 1
    $("#spinner").toggle();

    $.get("http://localhost:3000/frases", trocaFraseAleatoria)
    .fail(function() {
        $("#erro").show();
        setTimeout(function funciotioName() {
        $("#erro").hide(); 
        }, 2000);
    })
    //loading .. 2
    .always(function() {  
        $("#spinner").toggle();
    });
}

function trocaFraseAleatoria(data){
    
    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[numeroAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo)

}

function buscaFrase() {

    $("#spinner").toggle();

    var fraseId = $("#frase-id").val();
    var dados = { id: fraseId };

    $.get("http://localhost:3000/frases",dados, trocaFrase)
    .fail(function() {
        $("#erro").show();
        setTimeout(function funciotioName() {
        $("#erro").hide(); 
        }, 2000);
    })
     .always(function() {  
        $("#spinner").toggle();
    });
    
}

function trocaFrase(data) {
    var frase = $(".frase");
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}
