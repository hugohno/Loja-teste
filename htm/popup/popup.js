function PopUp(){ 
  // Função que posiciona o elemento sempre no centro
  jQuery(window).resize(function(){
  
  jQuery('#popup').css({
  position:'absolute',
  left: (jQuery(window).width() - jQuery('#popup').outerWidth())/2,
  top: (jQuery(window).height() - jQuery('#popup').outerHeight())/2
  });
  
  });
  // Para iniciar a função:
  jQuery(window).resize();
  
  /* PopNews */
  var cookie=jQuery.cookie('popup');
  
  if(FC$.Page=="Home" && cookie!="true"){
  
  jQuery(document).ready(function(){
  jQuery('#popup, #FullBackground').css('display', 'block');
  
  jQuery.cookie("popup", "true",{
  days:1, // Define o tempo em dias para a exibição do popup
  hours:0, // Define o tempo em horas para a exibição do popup
  minutes:0 // Define o tempo em minutos para a exibição do popup
  });
  });
  
  var background = jQuery("#FullBackground")
  if(background){
  jQuery('body,html').css('overflow','hidden');
  }
  
  jQuery('.btnClose').click(function(){
  jQuery('#popup, #FullBackground').fadeOut(300);
  
  setTimeout(function(){
  jQuery('body,html').css('overflow','auto');
  },300);
  });
  }else{jQuery('body,html').css('overflow','auto');}
  /* PopNews */
}