
const chatWeb = {

  chatPage(chat) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Chat</title>
        <link rel="stylesheet" href="styles.css"> 
      </head>
      <body>
        <div id="chat-app">
          <ul class="users">
            ${this.getUserList(chat)}
          </ul>
          <ol class="messages">
            ${this.getMessageList(chat)}
          </ol>
          <div class="outgoing">
            ${this.getOutgoingSection()}
          </div>
        </div>
      </body>
      </html>
    `;
  },

 
  getUserList(chat) {
    return chat.users.map(user => `
      <li>
        <div class="user ${user.online ? 'online' : 'offline'}">
          <span class="username">${user.username}</span> - <span class="fullname">${user.fullName}</span>
        </div>
      </li>
    `).join('');
  },
  
 
  getMessageList(chat) {
    return chat.messages.map(message => `
      <li>
        <div class="message">
          <div class="sender-info">
            <img class="avatar" alt="avatar of ${message.sender}" src="/images/avatar-${message.sender.toLowerCase()}.jpg"/>
            <span class="username">${message.sender}</span>
          </div>
          <p class="message-text">${message.text}</p>
        </div>
      </li>
    `).join('');
  },


  getOutgoingSection() {
    return `
      <form action="/chat" method="POST">
        <input type="hidden" name="username" value="Bao" />
        <input type="text" name="text" placeholder="Enter message to send" class="to-send" />
        <button type="submit">Send</button>
      </form>
    `;
  },
};

module.exports = chatWeb;
