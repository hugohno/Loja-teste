var popupLinkConfig = new Array;

popupLinkConfig["classname"] = new Array ( "targetname", "width=550,height=350,scrollbars=yes,resizable=yes,status=yes,toolbar=yes,location=yes,menubar=yes");
popupLinkConfig["popup"]    = new Array ( "", "width=350,height=450,scrollbar=yes,menubar=yes");
popupLinkConfig["glossary"] = new Array ( "help", "width=800,height=350,resizable=yes");

// ==========================================================================
window.onload = initPage;  
// Note: Make sure that no other javscripts assign a fuction to window.onload
// There can be only one function tied to window.onload at a time.

function initPage() {
  initPopupLinks();
// place here any other code you wish to run when the page loads.


// XXXXXXXXXXXX FUNCAO DO MENU PRO IE XXXXXXXXXXXXXXX

if (document.all&&document.getElementById) {
navRoot = document.getElementById("TopoMenuTodos");
for (i=0; i<navRoot.childNodes.length; i++) {
node = navRoot.childNodes[i];
if (node.nodeName=="LI") {
node.onmouseover=function() {
this.className+=" over";

var combo = xGetElementById('combo');
//combo.style.visibility = "hidden";

  }
  node.onmouseout=function() {
  this.className=this.className.replace
	(" over", "");

  var combo = xGetElementById('combo');
//  combo.style.visibility = "visible";
   }
   }
  }
 }
}

function initPopupLinks()
{
  if (!document.getElementsByTagName) return true;
  var pageLinks = document.getElementsByTagName("a");
  for (var i = 0; i < pageLinks.length; i++) 
  {
    if (((pageLinks[i].className != null) && 
         (pageLinks[i].className != "")) ||
        ((pageLinks[i].parentNode.className != null) && 
         (pageLinks[i].parentNode.className != "")))
    {
      var linkClass = " " + pageLinks[i].className + " ";
      if ((linkClass == "  ") && (pageLinks[i].parentNode.className != ""))
      {
        linkClass = " " + pageLinks[i].parentNode.className + " ";
      }
      for (var theKey in popupLinkConfig) 
      {
        if (linkClass.indexOf(" " + theKey + " ") > -1)
        {
          if ((pageLinks[i].target == "") || (pageLinks[i].target == null))
          {
            pageLinks[i].target = (popupLinkConfig[theKey][0] != "") ? popupLinkConfig[theKey][0] : theKey;
          }
          pageLinks[i].settings = popupLinkConfig[theKey][1];
          pageLinks[i].onclick = popUp;
        }
      }
    }
  }
  return true;
}

function popUp()
{
  newWin = window.open(this.href, this.target, this.settings);
  newWin.focus();
  return false;
}

