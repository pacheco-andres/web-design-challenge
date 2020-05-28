document.getElementsByClassName('mobile-menu')[0].style.display = "none"

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
  var shotenLinkSection = document.getElementsByClassName('shorten-link-section')[0];
  var link = shotenLinkSection.getElementsByClassName('input')[0];
  
  request.onreadystatechange = function() {
    if (this.status == 201) {
      var response = JSON.parse(this.response)
      var shortenLink = "https://rel.ink/".concat(response.hashid)
      link.value = shortenLink
    }
  };

  request.open("POST", "https://rel.ink/api/links/", true);
  request.setRequestHeader("Content-type", "application/json;charset=UTF-8");
  request.send(JSON.stringify({ "url": link.value}));
}
