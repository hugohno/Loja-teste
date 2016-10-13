//conflito com MagicSlideShow
var FCGrid$ = function () {
  'use strict';
  var product = {}, myOptions = {}, aProductList, aProductOnlyOne;

  //optionsigurações internas da funcão
  var settings = {
    descriptorsActive: null, //define os descritores existentes nos produtos [array de produtos, quantidade de descritores]
    descriptorsPrevious: [] //armazena os descritores dos produtos clicados
  };

  //Configurações
  var options = {
    autoSelect : true,
    cartOnPage : true,
    shippingUpdate : true,
    incMultGrid : true,
    idElementGrid : '#idMainGridFC',
    separadorRGBCor : '|',
    qtyDescriptors : 2, 
    htmlFlagChecked : '<i class="FCCheckedGrid"></i>', 
    imageProduct : 'cor',
    colorImg : false, 
    colorImgFormat : '.gif',
    textGrid : 'Selecione as opções abaixo',
    order : ['cor', 'adicional1', 'adicional2', 'adicional3', 'adicionalD1', 'adicionalD2', 'adicionalD3'],
    nameDescriptor : { 
      cor : 'Cor',
      adicional1 : 'Adicional 1',
      adicional2 : 'Adicional 2',
      adicional3 : 'Adicional 3',
      adicionalD1 : 'Adicional 4',
      adicionalD2 : 'Adicional 5',
      adicionalD3 : 'Adicional 6'
    },
    textDescriptor : {
      cor : 'Selecione',
      adicional1 : 'Selecione',
      adicional2 : 'Selecione',
      adicional3 : 'Selecione',
      adicionalD1 : 'Selecione',
      adicionalD2 : 'Selecione',
      adicionalD3 : 'Selecione'
    }
  };

  //Fn auxiliares Grid_FC:begin
  var fn = {
  
    eliminateDuplicates: function(arr){
      var i, len=arr.length, out=[], obj={}; for(i=0;i<len;i++){obj[arr[i]]=0;} for(i in obj){out.push(i);} return out;
    },
    
    //Seleciona as opções ex. tamanho: P, M, G etc.
    selecionarItens: function(obj, value){
      var results=[];
      for(var i=0; i< obj.length; i++){ var prd = JSON.parse(obj[i]); results.push(prd[value]) ;}
      return results;
    },
    
    removeClass: function(obj, sClass){  
      for(var i=0; i< obj.length; i++){
        var sClassObj=obj[i].className;
        var aClass=sClassObj.split(" ");        
        var newClass="";
        for(var j=0; j<aClass.length; j++){
          if(aClass[j] !== sClass)newClass+=aClass[j]+" ";
        }
        obj[i].className=newClass.trim();        
      }
    },
    
    addClass: function(obj, sClass){
      var sClassObj=obj.className;
      obj.className=sClass + " " +sClassObj.trim();
    },
    
    getColor: function(a){    
      var name = a.slice(0,a.indexOf( options.separadorRGBCor )), rgb = a.slice(a.indexOf( options.separadorRGBCor )+1, a.length);
      return{
        name:name,
        rgb:rgb
      };
    },
    
    //verifica se o descritor está disponível
    itemDisponivel: function(oProd, iNivelAtual){
      var sHtmlDisp="", sClass="";
      var bNivelAtualDisp = parseInt(iNivelAtual)+1 == (settings.descriptorsActive.length-1)? true : false; //pega o último nível
            
      if(oProd.length==1 || bNivelAtualDisp){
        oProd = JSON.parse(oProd);
        var fPriceDisp = parseFloat(oProd.priceNum), iEstoqueDisp = parseInt(oProd.estoque), sContentText="";
        if(iEstoqueDisp===0){ sContentText="x"; }else{ if(iEstoqueDisp>0 && parseFloat(fPriceDisp)===0){ sContentText="!";}}        
        if(sContentText!==""){
          sHtmlDisp="<b class=\"FCFlagEsgotadoGrid\">"+ sContentText +"</b>";
          sClass="FCSoldOutLabel";
        }
      }
      else{
        console.log('subproduto com descritores repetidos com apenas um nivel'); /**/
      }
      return {'htmlLabel': sHtmlDisp, 'classLabel' : sClass};
    },
    
    getImageProd: function(aProductList, aItens, NivelAtual){
      for(var i=0; i< aProductList.length; i++){
        var oProd = JSON.parse(aProductList[i]);
        if(oProd[settings.descriptorsActive[NivelAtual]] == aItens){
          return {'imgDet': oProd.imgDet , 'imgAmp': oProd.imgAmp};          
        }
      }
    },
    
    //Define descritores existentes
    defineDescritores: function(obj, qtyDescriptors){
      var results = [], idProdutoSemDescritor="";  
      for(var i=0; i< qtyDescriptors; i++){
        var iCont=obj.length;
        for(var j=0; j < obj.length;j++){
          var oProd = JSON.parse(obj[j]), sDescritor=oProd[options.order[i]];
          if(sDescritor===undefined || sDescritor===""){iCont=iCont-1; idProdutoSemDescritor=oProd.IDProduto;} //tratar erro quando faltar um descritor no produto
        }
        if(iCont==obj.length){results.push(options.order[i]);}
        else if(iCont!==obj.length && iCont>0){
          console.log("produto com descritor ausente: descritor=" + options.order[i] + " ("+ options.nameDescriptor[options.order[i]] +"), IDProduto "+ idProdutoSemDescritor );
          document.querySelector( options.idElementGrid ).innerHTML="Existe um ou mais produtos com descritores ausentes!";
          return false;
        }
      }
      if(results.length===0)console.log("FC_LOG_Grid_1: subprodutos sem descritores cadastrados até o descritor "+ options.qtyDescriptors);
      return results;
    },
    
    setAttrProduct: function(arr){
      if(typeof arr === "object" && arr !== null){
        product.IDProduto=arr.IDProduto;
        product.cor=arr.cor;
        product.codProd=arr.codProd;
        product.estoque=arr.estoque;
        product.peso=arr.peso;
        product.priceOri=arr.priceOri;
        product.priceNum=arr.priceNum;
        product.adicional1=arr.adicional1;
        product.adicional2=arr.adicional2;
        product.adicional3=arr.adicional3;
        product.adicionalD1=arr.adicionalD1;
        product.adicionalD2=arr.adicionalD2;
        product.adicionalD3=arr.adicionalD3;
        product.imgDet=arr.imgDet;
        product.imgAmp=arr.imgAmp;
      }else{console.log("Error: json do subproduto inválido");}
    },
    
    magicZoomFC: function(id, novoArray, novoArrayAmp, FC_MaxImages, refreshZoom){
      var imgDetMini="", imgAmpMini="", sHtmlZoom="";
      for (var i=0;i<=FC_MaxImages;i++)
      {
        if(i===0)
        {
          imgDetMini=novoArray[i];
          imgAmpMini=novoArrayAmp[i];
          sHtmlZoom+="<a href="+imgAmpMini+" title=\""+ fn.getNameProduct() +"\" class=MagicZoomPlus id=zoom2 rel='selectors-class:active; zoom-width:350px; zoom-height:350px; selectors-change:mouseover;'><img src="+ imgDetMini +"></a><br>";
          sHtmlZoom+='<p><a class=\"FCGridBtnZoom\" onclick="MagicZoomPlus.expand(zoom2); return false;" href="#">Ampliar imagem</a></p>';
          sHtmlZoom+="<a href="+imgAmpMini+"  rel='zoom-id:zoom2;' rev="+ imgDetMini +"><img src="+ imgDetMini +" width=65 height=65 class=ZoomIMG2></a>";
        }
        else{
          imgDetMini=FC$.PathPrd+novoArray[i];
          imgAmpMini=FC$.PathPrd+novoArrayAmp[i];
          sHtmlZoom+="<a href="+imgAmpMini+" rel='zoom-id:zoom2;' rev="+ imgDetMini +"><img src="+ imgDetMini +" width=65 height=65 class=ZoomIMG2></a>";
        }
      }
      document.querySelector(id).innerHTML=sHtmlZoom;
      if(refreshZoom){return MagicZoomPlus.refresh();}
    },
    
    imgView: function(srcImgDet, srcImgAmp, refreshZoom){
      var imgDetAll = srcImgDet;
      var imgAmpAll = srcImgAmp;
      var novoArray = imgDetAll.split(',');
      var novoArrayAmp = imgAmpAll.split(',');
      var CountImgDet=novoArray.length;
      var CountImgAmp=novoArrayAmp.length;

      if (imgDetAll==="" || imgAmpAll===""){
        return "";
      }
      else{
        if(CountImgDet==CountImgAmp){var FC_MaxImages=CountImgDet-1;}else{var FC_MaxImages=0;}
        return this.magicZoomFC('#idDivGridImg', novoArray, novoArrayAmp, FC_MaxImages, refreshZoom);
      }
    },
    
    isUnico: function(){
      if(settings.descriptorsActive.length==1){return true;}else{return false;}
    },

    Marge: function(obj1,obj2){
      var result={}; for(name in obj1) result[name]=obj1[name]; for(name in obj2) result[name]=obj2[name]; return result;         
    },
    
    esgotadoSubProd: function(params){
      return new MostraDispCaptcha(FC$.IDLoja, product.IDProduto); //Função para popup de aviso de disponibilidade
    },
    
    qtyIncDisabled: function(isDisabled, isValueField){
      if(isDisabled){ document.getElementById("idQTIncMultGrid").disabled=true; }else{ document.getElementById("idQTIncMultGrid").disabled=false;}
      if(isValueField){
        if(document.getElementById("idQTIncMultGrid").value===0) document.getElementById("idQTIncMultGrid").value=1;
        var oQtdZip = document.querySelector("[id^='idQtdZip']");
        if(oQtdZip && oQtdZip==0)oQtdZip.value=1;
      }
    },
    
    consultenosSubProd: function(){
      var IDSubProd=product.IDProduto;
      var aNomeRGB=product.cor.split(options.separadorRGBCor);
      var sNomeCor=aNomeRGB[0];
      var sCodeRef=product.codProd;
      if(sCodeRef!=="")sCodeRef="Cod%2E%20refer%EAncia%20"+sCodeRef;
      
      var sURLConsultenos='FaleConosco.asp?IDLoja='+ FC$.IDLoja +'&Assunto=Consulta%20sobre%20o%20produto%20'+ fn.getNameProduct() +'%20(ID%20'+ IDSubProd +')%20'+sCodeRef+'%20%2C';
      if(sNomeCor!=='')sURLConsultenos+=' '+ options.nameDescriptor['cor'] +' '+ sNomeCor.replace(/\+/g,'%2B') +'%2C';
      if(product.adicional1!=='')sURLConsultenos+=' '+ options.nameDescriptor['adicional1'] +' '+ fn.encodeURI( fn.charCode(product.adicional1) ) +'%2C';
      if(product.adicional2!=='')sURLConsultenos+=' '+ options.nameDescriptor['adicional2'] +' '+ fn.encodeURI( fn.charCode(product.adicional2) ) +'%2C';
      if(product.adicional3!=='')sURLConsultenos+=' '+ options.nameDescriptor['adicional3'] +' '+ fn.encodeURI( fn.charCode(product.adicional3) ) +'%2C';
      if(product.adicionalD1!=='')sURLConsultenos+=' '+ options.nameDescriptor['adicionalD1'] +' '+ fn.encodeURI( fn.charCode(product.adicionalD1) ) +'%2C';
      if(product.adicionalD2!=='')sURLConsultenos+=' '+ options.nameDescriptor['adicionalD2'] +' '+ fn.encodeURI( fn.charCode(product.adicionalD2) ) +'%2C';
      if(product.adicionalD3!=='')sURLConsultenos+=' '+ options.nameDescriptor['adicionalD3'] +' '+ fn.encodeURI( fn.charCode(product.adicionalD3) ) +'%2C';
      top.location.href=sURLConsultenos;
    },
    
    priceProduct: function(product){
      var oPositionPrice=document.getElementById("idPriceGridFC"); 
      if(parseFloat(product.priceNum) > 0 && oPositionPrice){
        var ParcelamentoJS=MostraMaxParcelaJS(product.priceNum,0);
        if(product.priceNum!=product.priceOri){
           return oPositionPrice.innerHTML="de <strike>"+FCLib$.FormatPreco(FormatPrecoReais(product.priceOri))+"</strike> por <b>"+FCLib$.FormatPreco(FormatPrecoReais(product.priceNum))+"</b>" + ParcelamentoJS;
         }
         else{
           return oPositionPrice.innerHTML="<b>"+FCLib$.FormatPreco(FormatPrecoReais(product.priceNum))+"</b>" + ParcelamentoJS;
         }   
      }else{return oPositionPrice.innerHTML="Preço sob consulta";}
    },
    
    codeProduct: function(){
      var oPositionCode=document.getElementById("idCodProdGrid");
      if(oPositionCode && product.codProd !== "") oPositionCode.innerHTML=product.codProd;
    },
    
    fnAvailableProduct: function(product, sParamsGrid){
      var oBtnComprar=document.createElement("div");
      if(!product){
        oBtnComprar.setAttribute("class", "FCBtnGrid FCBtnSelectedOption FCBtnSelecioneGrid");
        oBtnComprar.innerHTML="<img src=\""+ FC$.PathImg +"\BotSelecioneGrid.svg\" />"
                             +"<span class=\"FCTooltipGrid\" id=\"idTooltipGridFC\" style=\"display:none\">Selecione primeiros as opções do produto</span>"; 
        oBtnComprar.onclick=function(a){
          var oTooltip=document.getElementById("idTooltipGridFC").style.display;
          if(oTooltip=="none"){ document.getElementById("idTooltipGridFC").style.display="block"; }else{ document.getElementById("idTooltipGridFC").style.display="none"; }
        };
      }
      else{
        if(parseInt(product.estoque)===0){
          oBtnComprar.setAttribute("class", "FCBtnGrid FCBtnEsgotadoGrid");
          oBtnComprar.innerHTML="<img src=\""+ FC$.PathImg +"\BotEsgotadoGrid.svg\" />" + "<br><span>Avise-me quando estiver disponível!</span>";
          oBtnComprar.onclick=function(a){fn.esgotadoSubProd(sParamsGrid);};
          if(options.incMultGrid)fn.qtyIncDisabled(true, false);
        }
        else if(parseInt(product.estoque)>0 && parseFloat(product.priceNum ) === 0){
          oBtnComprar.setAttribute("class", "FCBtnGrid FCBtnConsultenos");
          oBtnComprar.innerHTML="<img src=\""+ FC$.PathImg +"\BotConsulteGrid.svg\" />" ; 
          oBtnComprar.onclick=function(a){fn.consultenosSubProd(sParamsGrid);};
          if(options.incMultGrid)fn.qtyIncDisabled(true, false);
        }
        else{
          oBtnComprar.setAttribute("class", "FCBtnGrid FCBtnComprarGrid");
          oBtnComprar.innerHTML="<img src=\""+ FC$.PathImg +"\BotComprarGrid.svg\" />" ;
          oBtnComprar.onclick=function(a){fnBuyProdutct(this);};
          if(options.incMultGrid)fn.qtyIncDisabled(false, true);          
        }
      }  
      return oBtnComprar;
    },
    
    srcProduct: function(nivelAtual,aItens,aProductList){
      var iNivelAtual=parseInt(nivelAtual);
      var aDataImagem=fn.getImageProd(aProductList, aItens, iNivelAtual);
      return " data-img-det="+aDataImagem.imgDet+" data-img-amp="+aDataImagem.imgAmp;
    },
    
    detailProduct: function(){
      var sHtmlDetail = "";
      for(var i=0; i< settings.descriptorsActive.length; i++){ 
        var str = settings.descriptorsActive[i];
        if(str.toUpperCase() == 'COR'){
          var aNomeRGB=product[settings.descriptorsActive[i]];
          var sNomeCor=aNomeRGB.split(options.separadorRGBCor);
          var sNomeAdic= sNomeCor[0];
        }
        else{
          var sNomeAdic = product[settings.descriptorsActive[i]];
        }
        sHtmlDetail+= "<div class=\"FCGridAdicContent FCGridAdicProductList\"><span class=\"AdicNome\">"+ options.nameDescriptor[settings.descriptorsActive[i]] +"</span><span class=\"AdicItem\">"+ sNomeAdic +"</span></div>";
      }
      return sHtmlDetail;
    },
    
    classDescriptor: function(obj){
      return "FC"+ obj.charAt(0).toUpperCase() + obj.slice(1)+"Grid"; //formata a classe para cada descritor
    },
    
    charCode: function(obj){
      //& < >
      return obj.replace(/&amp;/g, '&#38;')
                .replace(/&lt;/g, '&#60;') 
                .replace(/&gt;/g, '&#62;')
                .replace(/&#(\d+);/g, function (m, n) { return String.fromCharCode(n); });
    },
    
    sendPost: function(url, oParams){      
      var oForm=document.createElement("form");
      oForm.action=url;
      oForm.method="Post";
      oForm.name="FormMult"; 

      for(var i=0; i< oParams.length; i++) {
        var oInput=document.createElement("input");
        oInput.type="hidden";
        oInput.name=oParams[i][0];
        oInput.setAttribute("value", oParams[i][1]);
        oForm.appendChild(oInput);            
      }
      document.body.appendChild(oForm);
      oForm.submit();
    },
    
    getNameProduct: function(){
      var sNameProd="", oNameProd=document.getElementById('idNameProductGridFC');
      if(oNameProd)sNameProd=oNameProd.innerHTML;
      return sNameProd;
    },
    
    getShippingView: function(isView){
      if(options.shippingUpdate){
        var oButtonShipping = document.getElementById("idCEPButton");
        var oZipField = document.querySelector("[id^='idZip']");
        var oQtdZipField = document.querySelector("[id^='idQtdZip']");
        var oShippingValues = document.querySelector("[id^='idShippingValues']");
        
        if(oZipField && oShippingValues){   
          if(isView){
            oZipField.disabled=false;
            oQtdZipField.disabled=false;
            var iPesoProdSub=product.peso;
            iPesoProdSub=parseFloat(iPesoProdSub.replace(",","."));
            //se o subproduto tem peso 0 é usado o peso do produto pai para a simulação de frete
            if(product.estoque !== "" && iPesoProdSub >0 || product.estoque !== undefined && iPesoProdSub>0){
              oZipField.id = "idZip"+ product.IDProduto;
              oQtdZipField.id = "idQtdZip"+ product.IDProduto;
              oShippingValues.id = "idShippingValues"+ product.IDProduto;
              oButtonShipping.onclick = function(){ fnGetShippingValuesProd(product.IDProduto); console.log('Simulação de frete para o produto de ID '+product.IDProduto);};
            }else{
              var oProdPai=JSON.parse(aProductOnlyOne);
              oZipField.id = "idZip"+ oProdPai.IDProduto;
              oQtdZipField.id = "idQtdZip"+ oProdPai.IDProduto;
              oShippingValues.id = "idShippingValues"+ oProdPai.IDProduto;
              oButtonShipping.onclick = function(){ fnGetShippingValuesProd(oProdPai.IDProduto); console.log('Simulação de frete para o produto de ID '+oProdPai.IDProduto);};
            }
          }else{
            oButtonShipping.onclick = function(){alert("Selecione o produto primeiro");};
            oZipField.disabled=true;
            oQtdZipField.disabled=true;
          }
        }  
      }
    },
    
    creatInputIncMultQty: function(){
      var oInputIncMult=document.createElement("INPUT");
          oInputIncMult.setAttribute("type", "text");
          oInputIncMult.setAttribute("value", "1");
          oInputIncMult.setAttribute("size", "1");
          oInputIncMult.setAttribute("maxlength", "3");
          oInputIncMult.setAttribute("class", "QTIncMultGrid");
          oInputIncMult.setAttribute("id", "idQTIncMultGrid");
          oInputIncMult.setAttribute("name", "QTIncMultGrid");
          oInputIncMult.disabled=true;
          oInputIncMult.onkeyup=function(a){fn.validQuantityIncMult(this);};
      return oInputIncMult; 
    },
    
    validQuantityIncMult: function(objHTML){
      var sNumber = objHTML.value.replace(/[^0-9]/g, ""); //remove tudo que é diferente de 0-9
      sNumber = sNumber.replace(/^(0+)(\d)/g, "$2"); //remove zeros a esquerda
      var oQtdZipFieldIncMult = document.querySelector("[id^='idQtdZip']");
      if(sNumber > 0){        
        objHTML.value= sNumber.substring(0,3);
        if(oQtdZipFieldIncMult)oQtdZipFieldIncMult.value=sNumber.substring(0,3);
      }else{
        objHTML.value=0;
        if(oQtdZipFieldIncMult)oQtdZipFieldIncMult.value=0;
      }
    },
    
    convertCharAT: function(aProductsAT){
      var results=[];
      var aDescriptorsList = ["cor", "adicional1", "adicional2", "adicional3", "adicionalD1", "adicionalD2", "adicionalD3" ];      
      for(var i=0; i< aProductsAT.length; i++ ){
         var oProdAT = JSON.parse(aProductsAT[i]);         
         for(var j=0; j < aDescriptorsList.length; j++){
           var sDescriptorAT = oProdAT[aDescriptorsList[j]];
           if( sDescriptorAT !== "") oProdAT[aDescriptorsList[j]] = fn.charCode(sDescriptorAT);         
         }         
      results.push(JSON.stringify(oProdAT));    
      }
      return results;   
    },
    
    encodeURI: function(obj){
      //#$&+-_'.=?@"
      var objReplace = obj.replace(/\&quot;/g, "\"");
      return escape(objReplace).replace(/\"/g, "%22")
                               .replace(/\#/g,"%23")
                               .replace(/\$/g,"%24")                       
                               .replace(/\&/g,"%26")
                               .replace(/\'/g,"%27")
                               .replace(/\+/g,"%2B")
                               .replace(/\-/g,"%2D")                       
                               .replace(/\./g,"%2E")
                               .replace(/\=/g,"%3D")
                               .replace(/\?/g,"%3F")
                               .replace(/\@/g,"%40")
                               .replace(/\_/g,"%5F");
    }
    
  };
  //Fn auxiliares Grid_FC:end

  function fnSelectsProducts(aProductList, sDescritorAtual, iNivelAtual){
    var results=[];    
    var getProd = function (prd){                
      if(settings.descriptorsPrevious[-2] !== undefined){
        for(var k=0; k < settings.descriptorsPrevious.length; k++){
          for(var l=0; l< options.order.length ;l++){
            if( prd[options.order[l]] === settings.descriptorsPrevious[k-1]){
              return true;
            }
          }
        }
        return false;
      }else{  
        return true;             
      }
    };
              
    for(var i=0; i< aProductList.length; i++){ 
      var prd = JSON.parse(aProductList[i]);
            
      if(settings.descriptorsPrevious[iNivelAtual-1] !== undefined){
        var iCont=0;        
        var sDescriptorsActiveCharAT=fn.charCode( prd[settings.descriptorsActive[iNivelAtual]] );
        
        if( sDescriptorsActiveCharAT == sDescritorAtual){
          for(var j=0; j< settings.descriptorsPrevious.length;j++){                    
            var sDescriptorsActivePreviousCharAT = prd[settings.descriptorsActive[parseInt(iNivelAtual)-(1+j)]];
            if( sDescriptorsActivePreviousCharAT == settings.descriptorsPrevious[iNivelAtual-(1+j)] ){           
              if(getProd(prd))iCont=iCont+1; /*iCont=iCont+1;*/              
            }else{
              iCont=0; break;
            }
          }
          if(iCont>0) results.push(JSON.stringify(prd));
        }      
      }else{
        if(prd[settings.descriptorsActive[iNivelAtual]] == sDescritorAtual)results.push(JSON.stringify(prd));
      }
    }    
    return results;
  } 

  function fnBuyProdutct(posBtnComprar){
    var iQtyIncMult=1;
    //incMult
    if(options.incMultGrid){
      var iQtyEstoque=product.estoque;
      iQtyIncMult=document.getElementById("idQTIncMultGrid").value;
      if(iQtyIncMult>iQtyEstoque){
        alert("Estoque solicitado maior que o diponível. \n"+ "Estoque disponível no momento ("+ iQtyEstoque +").");
        return document.getElementById("idQTIncMultGrid").focus();
      }
      if(iQtyIncMult===0){
        alert("A quantidade solicitada deve ser igual ou maior que 1.");
        return document.getElementById("idQTIncMultGrid").focus();
      }
    }
    //todos os parâmetros do produto
    var aNomeRGB=product.cor.split(options.separadorRGBCor), sNomeCor=aNomeRGB[0];   
    if(options.cartOnPage){
      var IDSubProd=product.IDProduto, sParamsProd='&QTIncMult_'+IDSubProd+'='+iQtyIncMult;
      if(sNomeCor!=='')sParamsProd+='&Cor_'+ IDSubProd +'='+ EncodeParamFC(sNomeCor).replace(/\+/g,'%2B');
      if(product.adicional1!=='')sParamsProd+='&Adicional1_'+ IDSubProd +'='+ EncodeParamFC(fn.charCode(product.adicional1));
      if(product.adicional2!=='')sParamsProd+='&Adicional2_'+ IDSubProd +'='+ EncodeParamFC(fn.charCode(product.adicional2));
      if(product.adicional3!=='')sParamsProd+='&Adicional3_'+ IDSubProd +'='+ EncodeParamFC(fn.charCode(product.adicional3));
      if(product.adicionalD1!=='')sParamsProd+='&AdicionalD1_'+ IDSubProd +'='+ EncodeParamFC(fn.charCode(product.adicionalD1));
      if(product.adicionalD2!=='')sParamsProd+='&AdicionalD2_'+ IDSubProd +'='+ EncodeParamFC(fn.charCode(product.adicionalD2));
      if(product.adicionalD3!=='')sParamsProd+='&AdicionalD3_'+ IDSubProd +'='+ EncodeParamFC(fn.charCode(product.adicionalD3));     
      
      AjaxExecFC("/addmult.asp","IDLoja="+ FC$.IDLoja +"&xml=1"+sParamsProd,true,processXMLAddMult,FC$.IDLoja,posBtnComprar,sParamsProd); 
    }else{
    
      if(options.incMultGrid){
        var IDSubProd=product.IDProduto, oParams=[];
        oParams.push(['IDProduto', IDSubProd]);
        oParams.push(['QTIncMult_'+IDSubProd, iQtyIncMult]);     
        oParams.push(['IDLoja', FC$.IDLoja]);
        oParams.push(['PostMult', true]);
   
        if(sNomeCor!=='')oParams.push([ 'Cor_'+ IDSubProd,  sNomeCor]);
        if(product.adicional1!=='')oParams.push(['Adicional1_'+ IDSubProd, fn.charCode(product.adicional1)]);
        if(product.adicional2!=='')oParams.push(['Adicional2_'+ IDSubProd, fn.charCode(product.adicional2)]);
        if(product.adicional3!=='')oParams.push(['Adicional3_'+ IDSubProd, fn.charCode(product.adicional3)]);
        if(product.adicionalD1!=='')oParams.push(['AdicionalD1_'+ IDSubProd, fn.charCode(product.adicionalD1)]);
        if(product.adicionalD2!=='')oParams.push(['AdicionalD2_'+ IDSubProd, fn.charCode(product.adicionalD2)]);
        if(product.adicionalD3!=='')oParams.push(['AdicionalD3_'+ IDSubProd, fn.charCode(product.adicionalD3)]);      
       
        fn.sendPost('/addmult.asp', oParams);
        
      }else{
        var sURLCompra='AddProduto.asp?IDLoja='+ FC$.IDLoja +'&IDProduto='+ product.IDProduto;
        if(sNomeCor!=='')sURLCompra+='&Cor='+ sNomeCor.replace(/\+/g,'%2B');
        if(product.adicional1!=='')sURLCompra+='&Adicional1='+ fn.encodeURI( fn.charCode(product.adicional1) );
        if(product.adicional2!=='')sURLCompra+='&Adicional2='+ fn.encodeURI( fn.charCode(product.adicional2) ) ;
        if(product.adicional3!=='')sURLCompra+='&Adicional3='+ fn.encodeURI( fn.charCode(product.adicional3) );
        if(product.adicionalD1!=='')sURLCompra+='&AdicionalD1='+ fn.encodeURI( fn.charCode(product.adicionalD1) );
        if(product.adicionalD2!=='')sURLCompra+='&AdicionalD2='+ fn.encodeURI( fn.charCode(product.adicionalD2) );
        if(product.adicionalD3!=='')sURLCompra+='&AdicionalD3='+ fn.encodeURI( fn.charCode(product.adicionalD3) );
        //console.log(sURLCompra);
        top.location.href=sURLCompra;
      }
    }
  }

  function fnExistsProduct(IDProduto, descritores, descrAnterior, aProductList){
    var sParms="";
    for(var i=0; i< aProductList.length; i++){
      var prd = JSON.parse(aProductList[i]);
      if(parseInt(prd.IDProduto) === parseInt(IDProduto)){
        sParms= "IDProduto="+ prd.IDProduto;
        for(var j=0; j< descritores.length; j++){
          if(descrAnterior[j] == prd[descritores[j]]){
            if((descritores[j]).toUpperCase() == "COR"){ sParms+= "&"+ descritores[j] +"="+ fn.getColor(descrAnterior[j]).name; }else{ sParms+= "&"+ descritores[j] +"="+ descrAnterior[j]; }
          }
        }
        fn.setAttrProduct(prd); //Seleciona o subproduto e Set na var product
      }
    }
 
    var oButton=fn.fnAvailableProduct(product,sParms); //verificar disponibilidade e cria o botão [comprar/ esgotado/ consulte-nos]
    fn.priceProduct(product); //atualiza o valor do produto de acordo com o valor do subproduto
    fn.codeProduct(product); //atualza o código de referencia do produto
    
    var el=document.querySelectorAll('#idBotComprarFC .FCBtnGrid');
    if(el.length>0)for(var i=0; i< el.length;i++){el[i].parentNode.removeChild(el[i]);} //remove os botões já existem no html
    
    var oPositionBtn = document.getElementById('idBotComprarFC');
    oPositionBtn.appendChild(oButton);
    
    //exibe o resumo do produto, descritores e atributos
    var oPositionDetail = document.getElementById('idDetailProduct');
    var oPositionButtonBuy = document.getElementById('idBotComprarFC');
    
    if(!oPositionDetail){
      var oPositionHtml = document.querySelector(options.idElementGrid);
      var oNewElement = document.createElement("Div");
          oNewElement.className='FCBoxGrid FCResumeProduct';
          oNewElement.id = "idDetailProduct";
          oNewElement.innerHTML = fn.detailProduct();
      //if(oPositionHtml)oPositionHtml.appendChild(oNewElement);
      if(oPositionButtonBuy)oPositionButtonBuy.parentNode.insertBefore(oNewElement, oPositionButtonBuy);
    }else{
      oPositionDetail.innerHTML=fn.detailProduct();
    }    
    fn.getShippingView(true); /*simulação de frete*/
    console.log("Log_FC_Grid_1_params : "+sParms.replace(/\&/g,'_')); /*Loga os parâmetros do produto selecionado*/
  }
  
  //fnResetOptions:begin
  function fnResetOptions(objElementParent){
    if(options.incMultGrid)fn.qtyIncDisabled(true, false);
    fn.getShippingView(false); //simulação de frete
    var el=document.querySelectorAll('#idBotComprarFC .FCBtnGrid');
    var elSelect=document.querySelectorAll('#idBotComprarFC .FCBtnSelectedOption');
    if(el.length>0 && elSelect.length===0){
      for(var i=0; i< el.length;i++){el[i].parentNode.removeChild(el[i]);} //remove os botões já existem no html
      if(elSelect.length===0){
        var oButton=fn.fnAvailableProduct(null);        
        var oPositionBtn = document.getElementById('idBotComprarFC');
        if(oPositionBtn)oPositionBtn.appendChild(oButton);
      }
    }

    var obj=objElementParent.getElementsByTagName("span")[0];    
    var iNivelAtual=objElementParent.getAttribute("data-nivel");
    var sDescritorAtual=obj.getAttribute("data-attr");
    var srcImgDet=obj.getAttribute("data-img-det");
    var srcImgAmp=obj.getAttribute("data-img-amp");

    if(srcImgDet!= null && srcImgAmp!= null)fn.imgView(srcImgDet, srcImgAmp, true);
    
    fn.removeClass(document.querySelectorAll('#idNivelGridFC_'+ iNivelAtual+' .FCDescritorContent li'), 'FCSelectedGrid'); // remove classe das as LIs quando uma opção é clicada
    fn.addClass(objElementParent,"FCSelectedGrid"); // adiciona classe ao elemento quando o mesmo é clicada
    settings.descriptorsPrevious[parseInt(iNivelAtual)]=sDescritorAtual; // definir o descritor que foi clicado e adiciona a variável
    
    var aDestinosDescritores = settings.descriptorsActive; //define os descritores existentes nos produtos  
    var oPositionHtml = document.querySelector(options.idElementGrid);
    var iNextNivel = parseInt(iNivelAtual)+1;

    // incluir os valor dos descritores selecionados em cada nível ex. (Cinza+Vermelho)
    if(aDestinosDescritores[iNivelAtual].toUpperCase() == 'COR'){
      document.getElementById('idNivelGridFC_'+ iNivelAtual +'_select').innerHTML= "("+ fn.getColor(sDescritorAtual).name +")";
    }else{
      document.getElementById('idNivelGridFC_'+ iNivelAtual +'_select').innerHTML= "("+ sDescritorAtual +")";
    }
    
    for(var i=iNextNivel; i< aDestinosDescritores.length; i++){
      var sHtmlUL="<ul class=\"FCDescritorContent\">";
      if(i==iNextNivel){var sDisabled="FCDescritorGridActivated", oClickEvent="onClick=FCGrid$.fnResetOptions(this)";}else{var sDisabled = "FCDescritorGridDisabled", oClickEvent="";}
      if(aDestinosDescritores.length > 0){
        var sClassDescritor = fn.classDescriptor(aDestinosDescritores[i]); //define uma classe especifica para cada nível de descritores
        var oSelectProductsList = fnSelectsProducts(aProductList, sDescritorAtual, iNivelAtual); //seleciona os produtos de acordo com o nível selecionado
        
        if(aDestinosDescritores.length>1){
          var aItens = fn.eliminateDuplicates(fn.selecionarItens(oSelectProductsList, aDestinosDescritores[i])); //remove valores duplicados [array de produtos, descritor ex. COR]
        }else{
          var aItens = fn.selecionarItens(aProductList, aDestinosDescritores[i]);
        }

        for(var j=0; j < aItens.length;j++){
          var sFlagEsgotado = {htmlLabel:"", classLabel: ""};
          if(iNivelAtual==(aDestinosDescritores.length-2)){
            var oProductSelect = fnSelectsProducts(aProductList, aItens[j], parseInt(iNivelAtual)+1);
            sFlagEsgotado = fn.itemDisponivel(oProductSelect, iNivelAtual);
          }
          // imagem do produto
          var sDataImagesProd="";
          if((options.imageProduct).toUpperCase() == (aDestinosDescritores[i]).toUpperCase()){
            sDataImagesProd = fn.srcProduct(i,aItens[j],aProductList);
          }
          // cria element LI > SPAN / verifica se o subproduto esta disponivel [x] [!]
          sHtmlUL+="<li class=\""+ sDisabled +" "+ sFlagEsgotado.classLabel +"\" data-nivel=\""+ i +"\" "+ oClickEvent +">"
                 +  options.htmlFlagChecked
                 +  "<span class=\"FCDescritorGrid "+ sClassDescritor +"\" data-attr=\""+ aItens[j] +"\" "+ sDataImagesProd+">"
                 +     aItens[j] + sFlagEsgotado.htmlLabel                
                 +  "</span>"                
                 +"</li>";
        }
        sHtmlUL+="</ul>";
        
        if(options.textDescriptor[ aDestinosDescritores[i] ] == "" || options.textDescriptor[ aDestinosDescritores[i] ]==undefined){
          var sTitDescr="Selecione";
        }else{
          var sTitDescr=options.textDescriptor[ aDestinosDescritores[i] ]
        }
        
        var oElementExists = document.getElementById('idNivelGridFC_'+i);     
        if(!oElementExists){
          var oNewElement = document.createElement("Div");
          oNewElement.className='FCBoxGrid';
          oNewElement.id="idNivelGridFC_"+i;
          oNewElement.innerHTML = "<div class=\"FCStepGrid\"><span class=\"FCStepGridNumber\">"+ parseInt(i+1) +"</span>"
                                +   "<span class=\"FCStepGridTitle\">"+ sTitDescr + "</span>" 
                                + "</div>"+ sHtmlUL ;
          oPositionHtml.appendChild(oNewElement);
        }else{
          oElementExists.innerHTML= "<div class=\"FCStepGrid\">"
                                  +   "<span class=\"FCStepGridNumber\">"+ parseInt(i+1) +"</span>"
                                  +   "<span class=\"FCStepGridTitle\">"+ sTitDescr + "</span>"
                                  +   "<strong class=\"FCOptionSelected\" id='idNivelGridFC_"+parseInt(i)+"_select'></strong>"
                                  + "</div>"+ sHtmlUL;
        }
      }
    }
    //vefica se é o último nível de descritor
    if(iNivelAtual==(aDestinosDescritores.length-1)){
      var oSelectProductsList = fnSelectsProducts(aProductList, sDescritorAtual, iNivelAtual)
      var IDProdutoData=obj.getAttribute("data-id");
      if(IDProdutoData!= null){
        IDProdutoData=IDProdutoData;
      }else{
        var IDProduto = fn.selecionarItens(oSelectProductsList, 'IDProduto');
        IDProdutoData=IDProduto[0];      
      }
      fnExistsProduct(IDProdutoData, settings.descriptorsActive, settings.descriptorsPrevious, aProductList);
    }  
  }
  //fnResetOptions:end
  
  //fnInitProductList:begin 
  function fnInitProductList(aProductList){

    var sDataImagesProd="";
    settings.descriptorsActive=fn.defineDescritores(aProductList, options.qtyDescriptors); //define os descritores existentes [array de produtos, quantidade de descritores]
    var aDestinosDescritores=settings.descriptorsActive;
    
    if(!settings.descriptorsActive || settings.descriptorsActive.length == 0)return false; //se exite subprodutos com erro no cadastro (usencia de descritores)

    var oPositionHtml = document.querySelector( options.idElementGrid );
    
    if(options.textGrid!==""){
      var oNewElement=document.createElement("div");
      oNewElement.setAttribute("id","idTxtGridFC");
      oNewElement.setAttribute("class","FCTxtGrid");
      oNewElement.innerHTML=options.textGrid;
      oPositionHtml.insertBefore(oNewElement, oPositionHtml[0]);
    }

    for(var i=0; i< aDestinosDescritores.length; i++){
      var sBgColor="", sHtmlUL="<ul class=\"FCDescritorContent\">";
      if(i==0){var sDisabled="FCDescritorGridActivated", oClickEvent="onClick=FCGrid$.fnResetOptions(this)"}else{var sDisabled = "FCDescritorGridDisabled", oClickEvent=""}
      
      if(aDestinosDescritores.length>0)
      {      
        var sClassDescritor=fn.classDescriptor(aDestinosDescritores[i]); //define um classe para cada descritor
        
        if(fn.isUnico()){ //Tem apenas um descritor? Apenas um nível de opção          
          for(var j=0; j< aProductList.length;j++){            
            var prd = JSON.parse(aProductList[j]);

            if((options.imageProduct).toUpperCase() == (aDestinosDescritores[i]).toUpperCase()){
              sDataImagesProd=" data-img-det="+ prd['imgDet'] +" data-img-amp="+ prd['imgAmp']; //Obtém a imagem do produto detalhe/ ampliada
            }
            
            var sFlagEsgotado = {htmlLabel:"", classLabel: ""}, results=[];            
            results.push(JSON.stringify(prd));
            sFlagEsgotado=fn.itemDisponivel(results); // verifica se o subproduto esta disponivel [x] [!]
            
            //se for do descritor cor
            if((aDestinosDescritores[i]).toUpperCase() == 'COR'){            
              if(options.colorImg){
                var sBgColor = "url("+ FC$.PathPrd +"cores/"+ fn.getColor(prd['cor']).name.replace("+","_") + options.colorImgFormat +") no-repeat #"+ fn.getColor(prd['cor']).rgb +";";
              }else{
                var sBgColor = "#" + fn.getColor(prd['cor']).rgb;
              }
              var sNameCor="&nbsp;"; //fn.getColor(sDescritor).name
              sHtmlUL+="<li class=\""+ sDisabled +" "+ sFlagEsgotado.classLabel +"\" data-nivel=\""+i+"\" "+ oClickEvent +"\>"
                    +  options.htmlFlagChecked
                    +  "<span style=\"background:"+ sBgColor +"\" class=\"FCDescritorGrid "+ sClassDescritor +"\" data-attr=\""+ prd[aDestinosDescritores[i]] +"\""+ sDataImagesProd +"\ data-id=\""+ prd['IDProduto']+"\">"
                    +     sNameCor + sFlagEsgotado.htmlLabel
                    +  "</span>"                     
                    +"</li>";
            }
            /* não é descritor cor */
            else{
              sHtmlUL+="<li class=\""+ sDisabled +" "+ sFlagEsgotado.classLabel +"\" data-nivel=\""+ i +"\" "+ oClickEvent +">"
                    +  options.htmlFlagChecked
                    +  "<span style=\""+ sBgColor +"\" class=\"FCDescritorGrid "+ sClassDescritor +"\" data-attr=\""+ prd[aDestinosDescritores[i]] +"\""+ sDataImagesProd +" data-id=\""+ prd['IDProduto'] +"\">"
                    +    prd[aDestinosDescritores[i]] + sFlagEsgotado.htmlLabel                    
                    +  "</span>"                    
                    +"</li>";
            }          
          }          
        }               
        else /* Mais de um descritor ex. cor/ tamanho */
        {       
          var aItens = fn.eliminateDuplicates(fn.selecionarItens(aProductList, aDestinosDescritores[i])); //remove valores duplicados [array de produtos, descritor ex. COR]         
          for(var j=0; j < aItens.length;j++){            
            if((options.imageProduct).toUpperCase() == (aDestinosDescritores[i]).toUpperCase()){
              sDataImagesProd=fn.srcProduct(i,aItens[j],aProductList); //imagem do produto para o atributo data-img
            }          
               
            if((aDestinosDescritores[i]).toUpperCase() == 'COR'){ /* se for atributo cor */       
              if(options.colorImg){
                var sBgColor = "url("+ FC$.PathPrd +"cores/"+ fn.getColor(aItens[j]).name.replace("+","_") + options.colorImgFormat +") no-repeat #"+ fn.getColor(aItens[j]).rgb +";";
              }else{
                var sBgColor = "#"+ fn.getColor(aItens[j]).rgb;
              }            
              sHtmlUL+="<li class=\""+ sDisabled +"\" data-nivel=\""+i+"\" "+ oClickEvent +">"
                    +  options.htmlFlagChecked
                    +  "<span style=\"background:"+ sBgColor +"\" class=\"FCDescritorGrid "+ sClassDescritor +"\" data-attr=\""+ aItens[j] +"\" "+ sDataImagesProd +">"
                    +    "&nbsp;"
                    +  "</span>"                    
                    +"</li>";
            }else{
              sHtmlUL+="<li class=\""+ sDisabled +"\" data-nivel=\""+i+"\" "+ oClickEvent +">"
                    +  options.htmlFlagChecked
                    +  "<span style=\""+ sBgColor +"\" class=\"FCDescritorGrid "+ sClassDescritor +"\" data-attr=\""+ aItens[j] +"\" "+ sDataImagesProd +">"
                    +    aItens[j]                    
                    +  "</span>"                    
                    +'</li>';
            } 
          }
        }      
        sHtmlUL+="</ul>"; //fechamento elemento UL
        
        var oNewDiv = document.createElement("Div");
        oNewDiv.className='FCBoxGrid';
        oNewDiv.id="idNivelGridFC_"+i;

        if(options.textDescriptor[ aDestinosDescritores[i] ] == "" || options.textDescriptor[ aDestinosDescritores[i] ]==undefined){
          var sTitDescr="Selecione";
        }else{
          var sTitDescr=options.textDescriptor[ aDestinosDescritores[i] ]
        }
        oNewDiv.innerHTML = "<div class=\"FCStepGrid\">"
                          +   "<span class=\"FCStepGridNumber\">"+ parseInt(i+1) +"</span>"
                          +   "<span class=\"FCStepGridTitle\">"+ sTitDescr + "</span>"
                          +   "<strong class=\"FCOptionSelected\" id='idNivelGridFC_"+i+"_select'></strong>"
                          + "</div>"+ sHtmlUL ;
        oPositionHtml.appendChild(oNewDiv); 
      }
    }
    
    // criar incMult
    if(options.incMultGrid){
      var oNewDiv=document.createElement("Div");
          oNewDiv.setAttribute('class', 'FCBoxGrid FCFCBoxGridIncMult');
      var oLabelIncMult=document.createElement("span");
          oLabelIncMult.setAttribute('class', 'FCStepGridTitle FCTitQtyInc');
          oLabelIncMult.innerHTML="Quantidade&nbsp;";
      var oInputIncMult=fn.creatInputIncMultQty();
      
      var oPassoBuy = document.createElement("span");
          oPassoBuy.setAttribute('class', 'FCStepGridNumber');
          oPassoBuy.innerHTML= settings.descriptorsActive.length+1;
          oNewDiv.appendChild(oPassoBuy);
          oNewDiv.appendChild(oLabelIncMult);
          oNewDiv.appendChild(oInputIncMult);
          oPositionHtml.appendChild(oNewDiv); 
    }

    //botao comprar
    var oPositionBtn = document.getElementById('idBotComprarFC');
    if(!oPositionBtn){
      var oDivButtonBuy = document.createElement("div");
          oDivButtonBuy.setAttribute('id', 'idBotComprarFC');
          oDivButtonBuy.setAttribute('class', 'FCBoxGrid FCBoxGridBuy');
      
      var iStepBuy = options.incMultGrid == true ? 2 : 1;
      var oPassoBuy = document.createElement("span");
          oPassoBuy.setAttribute('class', 'FCStepGridNumber');
          oPassoBuy.innerHTML= settings.descriptorsActive.length + iStepBuy;
      oDivButtonBuy.appendChild(oPassoBuy);
      oPositionHtml.appendChild(oDivButtonBuy);
    }

    // selecione o primeiro subproduto automaticamente
    if(options.autoSelect){
      for(var i=0; i < aDestinosDescritores.length; i++){
        var oProd=document.querySelectorAll('li[data-nivel="'+i+'"]');        
        if(oProd[0] !== null)fnResetOptions(oProd[0]);
      }
      if(fn.isUnico())fn.getShippingView(true) //simulação de frete
    }else{
      var oButton=fn.fnAvailableProduct(null)        
      var oPositionBtn = document.getElementById('idBotComprarFC');
      if(oPositionBtn)oPositionBtn.appendChild(oButton);
      fn.getShippingView(false) // simulação de frete
    }
  }
  //fnInitProductList:end
  
  //fnInitProductOnlyOne:begin
  function fnInitProductOnlyOne(IDProdutoPai,aProductOnlyOne){
    var oPositionHtml = document.querySelector( options.idElementGrid );
    var oProd = JSON.parse(aProductOnlyOne);
    var sParms= "IDProduto="+oProd.IDProduto;
    
    var fnBuildHtmlAdic=function(oProd){
      var sHtmlAdic="";
      for(var i=0; i < options.order.length;i++ ){
        if(oProd[options.order[i]]!==""){
          if(options.order[i].toUpperCase() == "COR"){           
            var sNomeAdic=fn.getColor(oProd.cor).name + "<span class=\"AdicItemCor\" style=\"background:#"+ fn.getColor(oProd.cor).rgb +"\">&nbsp;</span>";
          }else{
            var sNomeAdic=oProd[options.order[i]];
          }
          sHtmlAdic+="<div class=\"FCGridAdicContent\"><span class=\"AdicNome\">"+ options.nameDescriptor[options.order[i]] +"</span><span class=\"AdicItem\">"+ sNomeAdic +"</span></div>";
        }
      }
      return sHtmlAdic;
    }
    
    var oNewDiv = document.createElement("Div");
          oNewDiv.className='FCBoxGrid FCResumeProduct';
          oNewDiv.id="idDetailProduct";
          oNewDiv.innerHTML= fnBuildHtmlAdic(oProd);
          oPositionHtml.appendChild(oNewDiv);
          
    if(options.incMultGrid){
      var oNewDiv=document.createElement("Div");
          oNewDiv.setAttribute('class', 'FCBoxGrid FCFCBoxGridIncMult');
      var oLabelIncMult=document.createElement("span");
          oLabelIncMult.setAttribute('class', 'FCTitQtyInc');
          oLabelIncMult.innerHTML="Quantidade&nbsp;";
      var oInputIncMult=fn.creatInputIncMultQty();
          oNewDiv.appendChild(oLabelIncMult);
          oNewDiv.appendChild(oInputIncMult);
          oPositionHtml.appendChild(oNewDiv);
    }  
    
    fn.setAttrProduct(oProd); //define o produto selecionado e inclui na variável product    
    var oButton = fn.fnAvailableProduct(oProd, sParms); //verificar disponibilidade e cria o botão [comprar/ esgotado/ consulte-nos]
    var el=document.querySelectorAll('#idBotComprarFC .FCBtnGrid');
    if(el.length>0)for(var i=0; i< el.length;i++){el[i].parentNode.removeChild(el[i]);} //remove os botões já existem no html
    
    var oPositionBtn = document.getElementById('idBotComprarFC');
    if(!oPositionBtn){
      var oDivButtonBuy = document.createElement("div");
          oDivButtonBuy.setAttribute('id', 'idBotComprarFC');
          oDivButtonBuy.setAttribute('class', 'FCBoxGrid FCBoxGridBuy');
      oPositionHtml.appendChild(oDivButtonBuy);
    }
    oPositionBtn = document.getElementById('idBotComprarFC');
    oPositionBtn.appendChild(oButton);
  }
  //fnInitProductOnlyOne:end
  
  function fnMultipleZoom(imgDet,imgAmp,refresh){
    if(imgDet!=="" && imgAmp!== "") return fn.imgView(imgDet,imgAmp,refresh);
  }
  
  //inicia a função
  function init(IDProdutoPai, aProductListGrid, aProductOnlyOneGrid){
    if(this.myOptions)options = fn.Marge(options, this.myOptions); //altera as configurações    
    
    aProductOnlyOne= fn.convertCharAT(aProductOnlyOneGrid);
    aProductList= fn.convertCharAT(aProductListGrid);
    
    if(typeof aProductListGrid[aProductListGrid.length-1] !== 'undefined'){      
      fnInitProductList(aProductList); // se for subproduto
    }else{      
      fnInitProductOnlyOne(IDProdutoPai, aProductOnlyOneGrid);
    }    
  }

  function fnExecTabDescritores(){
    if(typeof aProductList[aProductList.length-1] == 'undefined'){ aProductList=aProductOnlyOne; } 
    var sHTMLProd="<table border='1'><tr><td>IDProduto</td><td>codProd</td><td>cor</td><td>estoque</td><td>Peso</td><td>priceOri</td><td>priceNum</td><td>adicional1</td><td>adicional2</td><td>adicional3</td><td>adicionalD1</td><td>adicionalD2</td><td>adicionalD3</td><td>imgDet</td><td>imgAmp</td>";
    for(var i=0; i < aProductList.length;i++){
      var prd = JSON.parse(aProductList[i]);
      sHTMLProd+="<tr><td>"+prd.IDProduto+"</td><td>"+prd.codProd+"</td><td>"+prd.cor+"</td><td>"+prd.estoque+"</td><td>"+prd.peso+"</td><td>"+prd.priceOri+"</td><td>"+prd.priceNum+"</td><td>"+prd.adicional1+"</td><td>"+prd.adicional2+"</td><td>"
      +prd.adicional3+"</td><td>"+ prd.adicionalD1+"</td><td>"+prd.adicionalD2+"</td><td>"+prd.adicionalD3+"</td><td>"+ prd.imgDet +"</td><td>"+prd.imgAmp+"</td></tr>";
    }
    sHTMLProd+="</table>";
    var oNewElement=document.createElement("div");
        oNewElement.setAttribute("id","idTabDescritoresGridFC");
        oNewElement.setAttribute("class","FCTabDescritoresGrid");
        oNewElement.innerHTML="<br>"+sHTMLProd+"<br>";
    document.body.appendChild(oNewElement);
  }
  
  return{
    init:init,
    myOptions:myOptions,
    fnResetOptions:fnResetOptions,
    fnMultipleZoom:fnMultipleZoom,
    fnExecTabDescritores:fnExecTabDescritores
  }
}();