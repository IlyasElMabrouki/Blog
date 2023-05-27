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

$(document).ready(function () {
  const token = localStorage.getItem('token');
  if (!token){
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

function getUsers(take = 10, skip = 0) {
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

function getUser(id) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: '/users/' + id,
        method: 'GET',
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

function patchUser(user) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: '/users/',
        method: 'PATCH',
        data: JSON.stringify(user),
        contentType: 'application/json',
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

function deleteUser(id) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: '/users/' + id,
        method: 'DELETE',
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

function getCategorie(id) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: '/categories/' + id,
        method: 'GET',
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

function postCategorie(categorie) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: '/categories/',
        method: 'POST',
        data: JSON.stringify(categorie),
        contentType: 'application/json',
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

function patchCategorie(categorie) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: '/categories/',
        method: 'PATCH',
        data: JSON.stringify(categorie),
        contentType: 'application/json',
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

function deleteCategorie(id) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: '/categories/' + id,
        method: 'DELETE',
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


function getArticle(id) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: '/articles/' + id,
        method: 'GET',
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

function postArticle(article) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: '/articles/',
      method: 'POST',
      data: JSON.stringify(article),
      contentType: 'application/json',
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

function patchArticle(article) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: '/articles/',
      method: 'PATCH',
      data: JSON.stringify(article),
      contentType: 'application/json',
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

function deleteArticle(id) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: '/articles/' + id,
      method: 'DELETE',
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
function getCommentaires(take = 10, skip = 0) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: '/commentaires/',
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

function getCommenataire(id) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: '/commentaires/' + id,
      method: 'GET',
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

function postCommentaire(commentaire) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: '/commentaires/',
      method: 'POST',
      data: JSON.stringify(commentaire),
      contentType: 'application/json',
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

function patchCategorie(commentaire) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: '/commentaires/',
      method: 'PATCH',
      data: JSON.stringify(commentaire),
      contentType: 'application/json',
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

function deleteCommentaire(id) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: '/commentaires/' + id,
      method: 'DELETE',
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
