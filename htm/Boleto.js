(function(){
  "use strict";
  var aTD=document.getElementsByTagName("td");
  	 for(var i=0;i<aTD.length;i++)if(aTD[i].innerHTML.indexOf("Este boleto refere-se � compra de produto(s) pela Internet.")>=0)aTD[i].innerHTML=aTD[i].innerHTML.replace("Este boleto refere-se � compra de produto(s) pela Internet.","CAIXA: n�o receber ap�s o vencimento. <br> Este boleto refere-se � compra de produto(s) pela Internet.");
	for(var g=0;g<aTD.length;g++)if(aTD[g].innerHTML.indexOf("CPF 330.379.028-09")>=0)aTD[g].innerHTML=aTD[g].innerHTML.replace("CPF 330.379.028-09","ONE LENS COM. E DIST. DE ARTIGOS DE OPTICA LTDA    CNPJ 14.483.170/0001-89 <br><br> AVENIDA DAS NA��ES UNIDAS, 18801 CONJ 826 ANDAR 8, Vila Almeida, 04795100 ");
})();