
//Página de cadastro e login
if(FC$.Page=="Register"){

  //Login e teclado
  try{document.getElementById("Email").style.width='100%';}catch(e){}
  try{document.getElementById("SenhaAtual").style.width='100%';}catch(e){}
  try{document.getElementById("PassosCompra").style.display='none';}catch(e){}
  window.onload(setTimeout("try{document.getElementById('VirtualKeyboard').style.display='none'}catch(e){}",1000));
  window.onload(setTimeout("try{document.getElementById('divTeclado').style.display='none'}catch(e){};",1000));

  //Tabelas
  try{document.getElementById("idTableCPFFC").style.width='100%';}catch(e){}
  try{document.getElementById("idTableCEPFC").style.width='100%';}catch(e){}
  try{document.getElementById("idTablePCEPFC").style.width='100%';}catch(e){}
  try{document.getElementById("idTableCelularFC").style.width='100%';}catch(e){}
  try{document.getElementById("idTableDataNascFC").style.width='100%';}catch(e){}
  try{document.getElementById("idTableSenhaFC").style.width='100%';}catch(e){}
  try{document.getElementById("idTableLembreteFC").style.width='100%';}catch(e){}
  try{document.getElementById("idTableccNomeFC").style.width='100%';}catch(e){}

  //Campos
  try{document.getElementById("P2Nome").style.width='100%';}catch(e){}
  try{document.getElementById("P2CPF").style.width='100%';}catch(e){}
  try{document.getElementById("P2Endereco").style.width='100%';}catch(e){}
  try{document.getElementById("P2Bairro").style.width='100%';}catch(e){}
  try{document.getElementById("P2Cidade").style.width='100%';}catch(e){}
  try{document.getElementById("P2Estado").style.width='100%';}catch(e){}
  try{document.getElementById("P2Pais").style.width='100%';}catch(e){}
  try{document.getElementById("P2CEP").style.width='100%';}catch(e){}
  try{document.getElementById("P2PCEP").style.width='100%';}catch(e){}
  try{document.getElementById("P2Telefone").style.width='100%';}catch(e){}
  try{document.getElementById("P2Celular").style.width='100%';}catch(e){}
  try{document.getElementById("P2Profissao").style.width='100%';}catch(e){}
  try{document.getElementById("P2DataNasc").style.width='100%';}catch(e){}
  try{document.getElementById("P2Email").style.width='100%';}catch(e){}
  try{document.getElementById("P2SenhaCli").style.width='100%';}catch(e){}
  try{document.getElementById("P2SenhaCliConfirma").style.width='100%';}catch(e){}
  try{document.getElementById("P2LembreteSenhaCli").style.width='100%';}catch(e){}
  try{document.getElementById("P2Para").style.width='100%';}catch(e){}
  try{document.getElementById("P2PEmail").style.width='100%';}catch(e){}
  try{document.getElementById("P2PEndereco").style.width='100%';}catch(e){}
  try{document.getElementById("P2PEnderecoNum").style.width='100%';}catch(e){}
  try{document.getElementById("P2PEnderecoCompl").style.width='100%';}catch(e){}
  try{document.getElementById("P2PBairro").style.width='100%';}catch(e){}
  try{document.getElementById("P2PCidade").style.width='100%';}catch(e){}
  try{document.getElementById("P2PEstado").style.width='100%';}catch(e){}
  try{document.getElementById("P2PPais").style.width='100%';}catch(e){}
  try{document.getElementById("P2PTelefone").style.width='100%';}catch(e){}
  try{document.getElementById("P2Mensagem").style.width='100%';}catch(e){}
  try{document.getElementById("P2ccNome").style.width='100%';}catch(e){}
  try{document.getElementById("P2ccNum").style.width='100%';}catch(e){}

  //texto acima do campo de mensagem
  try{document.getElementById("idTxtComentsFC").innerHTML="Instruções adicionais de envio:"}catch(e){}
}

//Página Fale conosco
else if(FC$.Page=="Contact"){
  try{document.getElementById("Nome").style.width='100%';}catch(e){}
  try{document.getElementById("Email").style.width='100%';}catch(e){}
  try{document.getElementById("IDAssunto").style.width='100%';}catch(e){}
  try{document.getElementById("Mensagem").style.width='100%';}catch(e){}
  try{document.getElementById("CodCaptcha").style.width='60px';}catch(e){}
}

//Página Newsletter
else if(FC$.Page=="Newsletter"){
  try{document.getElementById("NomeAssinante").style.width='100%';}catch(e){}
  try{document.getElementById("Email").style.width='100%';}catch(e){}
  try{document.getElementById("CodCaptcha").style.width='60px';}catch(e){} 
}

//Página Noticias
else if(FC$.Page=="News"){
  try{document.getElementById("TextoBuscaNews").style.width='100px';}catch(e){}
}

//Página Indique
 else if(FC$.Page=="Recommend"){
  try{document.getElementById("Nome").style.width='100%';}catch(e){}
  try{document.getElementById("Email").style.width='100%';}catch(e){}
  try{document.getElementById("NomeAmigo").style.width='100%';}catch(e){}
  try{document.getElementById("EmailAmigo").style.width='100%';}catch(e){}
  try{document.getElementById("Comentarios").style.width='100%';}catch(e){}
  try{document.getElementById("CodCaptcha").style.width='60px';}catch(e){}
}

//Página Forma de pagamento
else if(FC$.Page=="Payment"){
  //Ex de como não exibir determinada forma de pagamento
  //try{document.getElementById("idPagto1FC").style.display='none';}catch(e){}
  //Ex de como não exibir determinado parcelamento SELECT
  //try{document.getElementById("Parcelas3.4").style.width='30px';}catch(e){}
  //try{document.getElementById("Parcelas3.4").style.display='none';}catch(e){}
  try{document.getElementById("Parcelas3.1").style.width='60px';}catch(e){}
  try{document.getElementById("Parcelas3.2").style.width='60px';}catch(e){}
  try{document.getElementById("Parcelas3.3").style.width='60px';}catch(e){}
  try{document.getElementById("Parcelas3.4").style.width='60px';}catch(e){}
  try{document.getElementById("Parcelas3.5").style.width='60px';}catch(e){}
  try{document.getElementById("Parcelas3.6").style.width='60px';}catch(e){}
  try{document.getElementById("Parcelas3.7").style.width='60px';}catch(e){}
  try{document.getElementById("TxtFormaPagto").style.display='none';}catch(e){}
  try{document.getElementById("PassosCompra").style.display='none';}catch(e){}
  try{document.getElementById("TabBancos").style.display='none';}catch(e){}
}

//Página cesta de produtos ou de escolha do frete
else if(FC$.Page=="Cart" || FC$.Page=="Freight"){
  try{document.getElementById("PassosCompra").style.display='none';}catch(e){}
}

//Página busca detalhada
else if(FC$.Page=="AdvancedSearch"){
  try{document.getElementById("texto").style.width='100%';}catch(e){}
  try{document.getElementById("IDCategoria").style.width='100%';}catch(e){}
  try{document.getElementById("PrecoDe").style.width='100%';}catch(e){}
  try{document.getElementById("PrecoAte").style.width='100%';}catch(e){}
  try{document.getElementById("order").style.width='100%';}catch(e){}
  try{document.getElementById("Produtos").style.width='100%';}catch(e){}
  try{document.getElementById("idTablePromFC").innerHTML="Promoções"}catch(e){}
  try{document.getElementById("idTableLancFC").innerHTML="Lançamentos"}catch(e){}
}
