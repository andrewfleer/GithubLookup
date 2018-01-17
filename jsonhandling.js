var returnJson;
var followerJson;

document.getElementById("submit").addEventListener("click", function() {
  var input = document.getElementById("input");
  fetch('https://api.github.com/users/' + input.value)
  .then(function(r) {
    return r.json();
  }).then(function(j) {
    returnJson = j;
    populateInfo();
    getFollowers(j.followers_url);
  })
});

function populateInfo() {
  document.getElementById('username').innerText = returnJson.login;
  document.getElementById('avatar').src = returnJson.avatar_url;
  if (returnJson.name != null) {
    document.getElementById('realname').innerText = returnJson.name;
  }
  if (returnJson.location != null) {
    document.getElementById('location').innerText = returnJson.location;
  }
  if (returnJson.bio != null) {
    document.getElementById('bio').innerText = returnJson.bio;
  }
  document.getElementById('numberOfFollowers').innerText = "Followers: " + returnJson.followers;
}

function populateFollowers() {
  console.log(followerJson);
  followerJson.forEach(function(f) {
    var li = document.createElement("li");
    var img = document.createElement("img");
    img.src = f.avatar_url;

    li.appendChild(img);
    document.getElementById("followers").appendChild(li);
  });
}

function getFollowers(followerUrl) {
  console.log(followerUrl);
  fetch(followerUrl)
  .then(function(r) {
    return r.json();
  })
  .then(function(j) {
    followerJson = j;
    populateFollowers();
  })
}

   /* fetch('https://api.github.com/users/andrewfleer/followers')
    .then(function(r) {
      return r.json();
    })
    .then(function(jj) {
      console.log(jj);
      var ul = document.getElementById("followers");
      for (var i = 0; i < jj.length; i++) {
        var obj = jj[i];
        var subUl = document.createElement("ul");
        var imgLi = document.createElement("li");
        var nameLi = document.createElement("li");
        var li = document.createElement("li");
        var domImg = document.createElement("img");
        domImg.src = obj.avatar_url;
        domImg.alt = obj.login;
        imgLi.appendChild(domImg);
        nameLi.appendChild(document.createTextNode(obj.login));
        subUl.appendChild(nameLi);
        subUl.appendChild(imgLi);
        li.appendChild(subUl);
        ul.appendChild(li);
      }
    })
    
  })*/
