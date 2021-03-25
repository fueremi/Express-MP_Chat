document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
  
      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
  
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
  
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
  
        });
      });
    }
  
  });

  const chatForm = document.getElementById('chat-form');
  const socket = io();
  const chatMessages = document.querySelector('.is-scrollable');
  const roomName = document.getElementById('room-name');
  const userList = document.getElementById('user');

  // Get username and room from
  const {username, chatRoom} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
  });

  // Join chatroom
  socket.emit('joinRoom', { username, chatRoom });

  // Message from server
  socket.on('message', message => {
    outputMessage(message);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
  })

  // Message submit
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get message text
    const msg = e.target.elements.msg.value;

    // Emit message to server
    socket.emit('chatMessage', msg);

     // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
  })

  // Output message to DOM
  function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('box');
    div.classList.add('is-primary');
    div.innerHTML = `<article class="media">
    <div class="media-content">
      <div class="content   ">
          <strong></strong>
          <small>@${message.username}</small>
          <small>${message.time}</small>
          <br />
          ${message.text}
        </p>
      </div>
    </div>
  </article>`;
  document.querySelector('.is-scrollable').appendChild(div);
  }

  // Get room and users
  socket.on('roomUsers', ({ chatRoom, users }) => {
    outputRoomName(chatRoom);
    outputUsers(users);
  })

  // Add room name to DOM
  function outputRoomName(chatRoom){
    roomName.innerText = chatRoom;
  }

  function outputUsers(users){
    userList.innerHTML = `
      ${users.map(user => `<li><a class="is-capitalized">${user.username}</a</li>`).join('')}
    `;
  }