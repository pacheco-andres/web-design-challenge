document.getElementsByClassName('mobile-menu')[0].style.display = "none"
showShortenLinks();

function activateMobileMenu() {
  var menu = document.getElementsByClassName('mobile-menu')[0];
  if (menu.style.display == "none") {
    menu.style.display = "flex";
  } else {
    menu.style.display = "none";
  }
}

function createShortenLink() {
  var request = new XMLHttpRequest();
  var shortenLinkSection = document.getElementsByClassName('shorten-link-section')[0];
  var link = shortenLinkSection.getElementsByClassName('input')[0];
  var localStorage = window.localStorage;

  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 201) {
      var response = JSON.parse(this.response)
      localStorage.setItem(response.hashid, this.response)
      showShortenLinks();
      link.value = "";
    } else if (this.readyState == 4 && this.status != 201){
      var section = document.getElementsByClassName('shorten-link-section')[0];
      section.getElementsByClassName('input')[0].classList.add("error");
      section.getElementsByClassName('input')[0].value = "";
      section.getElementsByClassName('error-message')[0].style.display = "block";
    }
  };

  request.open("POST", "https://rel.ink/api/links/", true);
  request.setRequestHeader("Content-type", "application/json;charset=UTF-8");
  request.send(JSON.stringify({ "url": link.value}));
}

function showShortenLinks() {
  document.querySelectorAll(".link-shorten").forEach(function(a){
    a.remove()
  })

  for (var a in localStorage) {
    if (a != "csm-hit" && a != "csm-bf" && a != "csm:adb") {
      var response = JSON.parse(localStorage.getItem(a));
      var shortenLink = "https://rel.ink/".concat(response.hashid);

      document.getElementsByClassName('empty')[0].insertAdjacentHTML('afterend',`<div class='link-shorten'> \
                                                                                   <p class='original-link'>${response.url}</p> \
                                                                                   <div class='copy-section'> \
                                                                                     <p class='link'>${shortenLink}</p> \
                                                                                     <button class='button-copy pointer' onclick='copy()'>copy</button> \ 
                                                                                   </div> \
                                                                                 </div>`);
                                                                                
    }
  }
}

function clearError() {
  var shortenLinkSection = document.getElementsByClassName('shorten-link-section')[0];
  shortenLinkSection.getElementsByClassName('error-message')[0].style.display = "none";
  shortenLinkSection.getElementsByClassName('input')[0].classList.remove("error");
}

function copy(){
  var text = event.target.previousElementSibling;
  var range = document.createRange();
  range.selectNode(text);
  window.getSelection().removeAllRanges(); // clear current selection
  window.getSelection().addRange(range); // to select text
  document.execCommand("copy");
  alert("Copied the text: " + copyText.textContent);
   /* Copy the text inside the text field 
   var copyText = event.target.previousElementSibling.textContent;*/
}
