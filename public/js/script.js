const formDOM = document.querySelector('.form')
const emailInputDOM = document.querySelector('.email-input')
const passwordInputDOM = document.querySelector('.password-input')
const nameInputDOM = document.querySelector('.name-input')
const radioButtons = document.querySelectorAll('input[name="role"]');

const formDOM2 = document.querySelector('.form2')
const emailInputDOM2 = document.querySelector('.email-input2')
const passwordInputDOM2 = document.querySelector('.password-input2')

const wrapper = document.querySelector('.main-content')
const main = document.querySelector('.site-wrapper')

/*const formAlertDOM = document.querySelector('.form-alert')
const resultDOM = document.querySelector('.result')
const btnDOM = document.querySelector('#data')
const tokenDOM = document.querySelector('.token')*/

$(document).ready(function () {
  if (!localStorage.getItem('token')){
    $(main).hide();
    $(wrapper).hide();
    $('footer').hide();
    $(formDOM2).hide();
  }
  else {
    $(formDOM).hide();
    $(formDOM2).hide();
  }
});

$(formDOM).submit(function (e) { 
  e.preventDefault();
  console.log("SIGN UP");
  const email = emailInputDOM.value
  const password = passwordInputDOM.value
  const name = nameInputDOM.value
  let role;
  radioButtons.forEach((radio) => {
    if (radio.checked) {
      role = radio.value;
    }
  });
  var user = {
    nom: name,
    email : email,
    password: password,
    role: role,
    articles:[],
    commentaires: []
  };

postUser(user)
  .then(function(response) {
    $(formDOM).hide();
    $(formDOM2).show();
  })
  .catch(function(error) {
    console.log(error);
  });
})

$('#toForm2').click(function (e) { 
  e.preventDefault();
  $(formDOM).hide();
  $(formDOM2).show();
});

  $(formDOM2).submit(function (e) { 
    e.preventDefault();
    console.log("LOG IN");
    const email2 = emailInputDOM2.value
    const password2 = passwordInputDOM2.value

    var userlogin = {
      email: email2,
      password: password2
    }
    
    login(userlogin)
    .then(function(response) {
      localStorage.setItem('token', response.token)
      console.log(response);
      $(formDOM2).hide();
      $(main).show();
      $(wrapper).show();
      $('footer').show();
      getCategories()
  .then(function(response) {
    const categorieList = $('.list');
    response.forEach(function(categorie) {
      categorieList.append($('<li>').append($('<a>').text(categorie.nom)).append($('<span>').text(categorie._count.articles)));
    });
  })
  .catch(function(error) {
    console.log(error);
  });

  getArticles()
  .then(function(response) {
    const posts = $('#posts');
    response.forEach(function(article) {
      const divImage = $('<div>').addClass('thumb rounded').append($('<a>').append($('<div>').addClass('inner').append($('<img>').attr('src',article.image))));
      const ul = $('<ul>').addClass('meta list-inline mb-3');
      ul.append($('<li>').addClass('list-inline-item').append($('<a>').text(article.user.nom)));
      ul.append($('<li>').addClass('list-inline-item').append($('<a>').text(article.categories[0].nom)));
      ul.append($('<li>').addClass('list-inline-item').text(article.updatedAt));
      const divDetails = $('<div>').addClass('details');
      divDetails.append(ul);
      divDetails.append($('<h5>').addClass('post-tile').append($('<a>').text(article.titre)));
      divDetails.append($('<p>').addClass('excerpt mb-0').text(article.contenu));
      const div2 = $('<div>').addClass('post post-list clearfix').append(divImage,divDetails);
      const div1 = $('<div>').addClass('col-md-12 col-sm-6').append(div2);
      posts.append(div1);
    });
  })
  .catch(function(error) {
    console.log(error);
  });
    })
    .catch(function(error) {
      console.log(error);
    });
  });

  $('.logout').click(function (e) { 
    e.preventDefault();
    localStorage.removeItem('token');
    $(main).hide();
    $(wrapper).hide();
    $('footer').hide();
    $(formDOM).show();
  });

/*btnDOM.addEventListener('click', async () => {
  const token = localStorage.getItem('token')
  try {
    const { data } = await axios.get('/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    resultDOM.innerHTML = `<p>${user.nom}</p>`

  } catch (error) {
    localStorage.removeItem('token')
    resultDOM.innerHTML = `<p>${error.response.data.msg}</p>`
  }
})*/

/*const checkToken = () => {
  tokenDOM.classList.remove('text-success')

  const token = localStorage.getItem('token')
  if (token) {
    tokenDOM.textContent = 'token present'
    tokenDOM.classList.add('text-success')
  }
}
checkToken()*/

/*function getUsers(take = 10, skip = 0) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: '/users/',
        method: 'GET',
        //query string
        data: {
          take: take,
          skip: skip
        },
        dataType : 'json',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJDaHJpc3RvcC5GcmFuZWNraUBnbWFpbC5jb20iLCJpYXQiOjE2ODQ0MjYxOTMsImV4cCI6MTY4NzAxODE5M30.7RoHNRrGGdT-Urbt7sJIbTamhSGcr0t9K8Rq9OggjpE'
        },
        success: function(response) {
          resolve(response);
        },
        error: function(xhr, status, error) {
          reject(xhr + ' ' + status + ' ' + error);
        }
      });
    });
}

getUsers()
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
*/
/*
function getUser(id) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: '/users/' + id,
        method: 'GET',
        dataType : 'json',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJDaHJpc3RvcC5GcmFuZWNraUBnbWFpbC5jb20iLCJpYXQiOjE2ODQ0MjYxOTMsImV4cCI6MTY4NzAxODE5M30.7RoHNRrGGdT-Urbt7sJIbTamhSGcr0t9K8Rq9OggjpE'
        },
        success: function(response) {
          resolve(response);
        },
        error: function(xhr, status, error) {
          reject(xhr + ' ' + status + ' ' + error);
        }
      });
    });
}
*/

function postUser(user) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: '/users/',
        method: 'POST',
        data: JSON.stringify(user),
        contentType: 'application/json',
        success: function(response) {
          resolve(response);
        },
        error: function(xhr, status, error) {
          reject(xhr + ' ' + status + ' ' + error);
        }
      });
    });
}

/*function patchUser(user) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: '/users/',
        method: 'PATCH',
        data: JSON.stringify(user),
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJDaHJpc3RvcC5GcmFuZWNraUBnbWFpbC5jb20iLCJpYXQiOjE2ODQ0MjYxOTMsImV4cCI6MTY4NzAxODE5M30.7RoHNRrGGdT-Urbt7sJIbTamhSGcr0t9K8Rq9OggjpE'
        },
        success: function(response) {
          resolve(response);
        },
        error: function(xhr, status, error) {
          reject(xhr + ' ' + status + ' ' + error);
        }
      });
    });
}

var user = {
    id: 13,
    nom: "Leo Messi",
    email : "messi@gmail.com",
    password: "1010",
    role: "AUTHOR",
    articles:[],
    commentaires: []
};

patchUser(user)
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
*/

/*function deleteUser(id) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: '/users/' + id,
        method: 'DELETE',
        dataType : 'json',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJDaHJpc3RvcC5GcmFuZWNraUBnbWFpbC5jb20iLCJpYXQiOjE2ODQ0MjYxOTMsImV4cCI6MTY4NzAxODE5M30.7RoHNRrGGdT-Urbt7sJIbTamhSGcr0t9K8Rq9OggjpE'
        },
        success: function(response) {
          resolve(response);
        },
        error: function(xhr, status, error) {
          reject(xhr + ' ' + status + ' ' + error);
        }
      });
    });
}

deleteUser(13)
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
*/

function getCategories(take = 10, skip = 0) {
    const token = localStorage.getItem('token');
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: '/categories/',
        method: 'GET',
        //query string
        data: {
          take: take,
          skip: skip
        },
        dataType : 'json',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        success: function(response) {
          resolve(response);
        },
        error: function(xhr, status, error) {
          reject(xhr + ' ' + status + ' ' + error);
        }
      });
    });
}


/*function getCategorie(id) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: '/categories/' + id,
        method: 'GET',
        dataType : 'json',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJDaHJpc3RvcC5GcmFuZWNraUBnbWFpbC5jb20iLCJpYXQiOjE2ODQ0MjYxOTMsImV4cCI6MTY4NzAxODE5M30.7RoHNRrGGdT-Urbt7sJIbTamhSGcr0t9K8Rq9OggjpE'
        },
        success: function(response) {
          resolve(response);
        },
        error: function(xhr, status, error) {
          reject(xhr + ' ' + status + ' ' + error);
        }
      });
    });
}

getCategorie(1)
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
*/

/*function postCategorie(categorie) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: '/categories/',
        method: 'POST',
        data: JSON.stringify(categorie),
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJDaHJpc3RvcC5GcmFuZWNraUBnbWFpbC5jb20iLCJpYXQiOjE2ODQ0MjYxOTMsImV4cCI6MTY4NzAxODE5M30.7RoHNRrGGdT-Urbt7sJIbTamhSGcr0t9K8Rq9OggjpE'
        },
        success: function(response) {
          resolve(response);
        },
        error: function(xhr, status, error) {
          reject(xhr + ' ' + status + ' ' + error);
        }
      });
    });
}

var categorie = {
  nom: "Books",
  articles:[]
}

postCategorie(categorie)
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
*/

/*function patchCategorie(categorie) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: '/categories/',
        method: 'PATCH',
        data: JSON.stringify(categorie),
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJDaHJpc3RvcC5GcmFuZWNraUBnbWFpbC5jb20iLCJpYXQiOjE2ODQ0MjYxOTMsImV4cCI6MTY4NzAxODE5M30.7RoHNRrGGdT-Urbt7sJIbTamhSGcr0t9K8Rq9OggjpE'
        },
        success: function(response) {
          resolve(response);
        },
        error: function(xhr, status, error) {
          reject(xhr + ' ' + status + ' ' + error);
        }
      });
    });
}

var categorie = {
    id: 12,
    nom: "Book",
    articles:[]
}

patchCategorie(categorie)
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
*/

/*
function deleteCategorie(id) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: '/categories/' + id,
        method: 'DELETE',
        dataType : 'json',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJDaHJpc3RvcC5GcmFuZWNraUBnbWFpbC5jb20iLCJpYXQiOjE2ODQ0MjYxOTMsImV4cCI6MTY4NzAxODE5M30.7RoHNRrGGdT-Urbt7sJIbTamhSGcr0t9K8Rq9OggjpE'
        },
        success: function(response) {
          resolve(response);
        },
        error: function(xhr, status, error) {
          reject(xhr + ' ' + status + ' ' + error);
        }
      });
    });
}

deleteCategorie(13)
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
*/

function getArticles(take = 10, skip = 0) {
    const token = localStorage.getItem('token');
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: '/articles/',
        method: 'GET',
        //query string
        data: {
          take: take,
          skip: skip
        },
        dataType : 'json',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        success: function(response) {
          resolve(response);
        },
        error: function(xhr, status, error) {
          reject(xhr + ' ' + status + ' ' + error);
        }
      });
    });
}

/*
function getArticle(id) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: '/articles/' + id,
        method: 'GET',
        dataType : 'json',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJDaHJpc3RvcC5GcmFuZWNraUBnbWFpbC5jb20iLCJpYXQiOjE2ODQ0MjYxOTMsImV4cCI6MTY4NzAxODE5M30.7RoHNRrGGdT-Urbt7sJIbTamhSGcr0t9K8Rq9OggjpE'
        },
        success: function(response) {
          resolve(response);
        },
        error: function(xhr, status, error) {
          reject(xhr + ' ' + status + ' ' + error);
        }
      });
    });
}

getArticle(1)
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
*/

/*
function postArticle(article) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: '/articles/',
        method: 'POST',
        data: JSON.stringify(article),
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJDaHJpc3RvcC5GcmFuZWNraUBnbWFpbC5jb20iLCJpYXQiOjE2ODQ0MjYxOTMsImV4cCI6MTY4NzAxODE5M30.7RoHNRrGGdT-Urbt7sJIbTamhSGcr0t9K8Rq9OggjpE'
        },
        success: function(response) {
          resolve(response);
        },
        error: function(xhr, status, error) {
          reject(xhr.responseText);
        }
      });
    });
}

var article = {
    titre: "My First Article",
    contenu: "This is the content of my first article.",
    image: "https://example.com/image.jpg",
    utilisateurId: 5,
};

postArticle(article)
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
*/

function login(user) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: '/login/',
      method: 'POST',
      data: JSON.stringify(user),
      contentType: 'application/json',
      success: function(response) {
        resolve(response);
      },
      error: function(xhr, status, error) {
        reject(xhr + ' ' + status + ' ' + error);
      }
    });
  });
}
