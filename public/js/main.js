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

  // Message from server
  socket.on('message', message => {
    console.log(message);
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
    <figure class="media-left">
      <p class="image is-64x64">
        <img
          src="https://bulma.io/images/placeholders/128x128.png"
        />
      </p>
    </figure>
    <div class="media-content">
      <div class="content   ">
          <strong>John Smith</strong>
          <small>@johnsmith</small>
          <small>31m</small>
          <br />
          ${message}
        </p>
      </div>
    </div>
  </article>`;
  document.querySelector('.is-scrollable').appendChild(div);
  }