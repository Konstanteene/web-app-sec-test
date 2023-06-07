// Відправлення даних форми на сервер
document.getElementById('form').addEventListener('submit', function(event) {
  event.preventDefault();

  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/register', true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.onload = function() {
    if (xhr.status === 200) {
      // alert('Registration successful');
      displayRegistrationMessage('Registration successful');
      loadUserList();
    } else {
      displayRegistrationMessage('Registration failed');
      // alert('Registration failed');
    }
  };
  xhr.send('name=' + encodeURIComponent(name) + '&email=' + encodeURIComponent(email));
});

// Завантаження зареєстрованних користовачі із серверу
function loadUserList() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/users', true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      var users = JSON.parse(xhr.responseText);
      var userList = document.getElementById('user-list');
      userList.innerHTML = '';

      users.forEach(function(user) {
        var li = document.createElement('li');
        // li.textContent = user.name + ' (' + user.email + ')';
        li.innerHTML = user.name + ' (' + user.email + ')';
        userList.appendChild(li);
      });
    }
  };
  xhr.send();
}

// Відображення повідомлення про реєстрацію
function displayRegistrationMessage(message) {
  var registrationMessage = document.getElementById('registration-message');
  registrationMessage.textContent = message;
}

// Завантаження списку користувачів при завантажені сторінки
window.onload = loadUserList;
