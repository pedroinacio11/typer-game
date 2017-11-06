$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = $("#usuarios").val();
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.append(linha);
    $(".placar").slideDown(500);
    scrollPlacar();

}

function scrollPlacar(){
    //scroll para a posição do placar.
    var posicaoPlacar = $(".placar").offset().top;
    
    $("body").animate(
    {
        scrollTop: posicaoPlacar+"px"
    }, 1000);
}

function novaLinha(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha() {
    event.preventDefault();
    var linha = $(this).parent().parent();
    linha.fadeOut(1000);
    setTimeout(function(){
        linha.remove();
    }, 1000);

}

function mostraPlacar(){
    $(".placar").stop().slideToggle(600);
}

function sincronizaPlacar() {
    
    var placar = [];
    //selecionando todas as minhas tr's que são filhas diretas de tbody
    var linhas = $("tbody>tr");
    
    linhas.each(function(){
        //quero pegar o primeiro td da primeira linha .. preciso envolver ele no $ para ganhar poderes do jQuery
        var usuario = $(this).find("td:nth-child(1)").text();
        //procura dentro da minha linha o td, qual td? o filho de numero 2  
        var palavras = $(this).find("td:nth-child(2)").text();
        
        var score = {
            usuario: usuario,
            pontos: palavras
        };

        // colocando no meu array o score(objeto)
        placar.push(score);

    });

    //objeto javascript
    var dados = {
        placar: placar
    }
    /*Eu não posso enviar diretamente um array para o meu servidor, 
    por isso criei o 'dados' acima para receber o placar. De costume enviamos uma string ou objeto javascript*/
    $.post("http://localhost:3001/placar", dados , function() {
        console.log("Placar sincronizado com sucesso");
        $(".tooltip").tooltipster("open"); 
    }).fail(function(){
        $(".tooltip").tooltipster("open").tooltipster("content", "Falha ao sincronizar"); 
    }).always(function(){ 
        setTimeout(function() {
        $(".tooltip").tooltipster("close"); 
    }, 1200);
    });
}

function atualizaPlacar(){

    $.get("http://localhost:3001/placar", function(data){
    
    $(data).each(function(){
        var linha = novaLinha(this.usuario, this.pontos);
        linha.find(".botao-remover").click(removeLinha);
        $('tbody').append(linha);
    });
});

}
