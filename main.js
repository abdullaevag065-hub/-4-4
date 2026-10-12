 const outputContainer = document.getElementById('output');
    const statusMessage = document.getElementById('status-message');

    function loadData(endpoint) {
      outputContainer.innerHTML = ''; 
      statusMessage.textContent = 'Загрузка...';
      statusMessage.className = 'loading';

      
      fetch(`https://typicode.com{endpoint}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Сеть ответила с ошибкой');
          }
          return response.json();
        })
        .then(data => {
          if (endpoint === 'posts') renderPosts(data);
          else if (endpoint === 'comments') renderComments(data);
          else if (endpoint === 'todos') renderTodos(data);
          else if (endpoint === 'photos') renderPhotos(data);
        })
        .catch(error => {
          console.error(error);
          statusMessage.textContent = 'Ошибка загрузки';
          statusMessage.className = 'error';
        })
        .finally(() => {
          if (statusMessage.className === 'loading') {
            statusMessage.textContent = '';
            statusMessage.className = '';
          }
        });
    }

    
    function renderPosts(posts) {
      posts.slice(0, 20).forEach(post => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.body}</p>
        `;
        outputContainer.appendChild(card);
      });
    }

    
    function renderComments(comments) {
      comments.slice(0, 20).forEach(comment => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <h3>${comment.name}</h3>
          /* В задании требуется email */
          <em class="email">${comment.email}</em>
          <p>${comment.body}</p>
        `;
        outputContainer.appendChild(card);
      });
    }

    
    function renderTodos(todos) {
      const ul = document.createElement('ul');
      ul.className = 'todo-list';

      todos.slice(0, 20).forEach(todo => {
        const li = document.createElement('li');
        const statusText = todo.completed ? 'Выполнено' : 'Не выполнено';
        const statusClass = todo.completed ? 'completed' : 'pending';
        
        li.className = `todo-item ${statusClass}`;
        li.innerHTML = `
          <span>${todo.title}</span>
          <strong>${statusText}</strong>
        `;
        ul.appendChild(li);
      });
      outputContainer.appendChild(ul);
    }

    
    function renderPhotos(photos) {
      photos.slice(0, 20).forEach(photo => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.textAlign = 'center';
        card.innerHTML = `
          <h3>${photo.title}</h3>
          <img src="${photo.thumbnailUrl}" alt="${photo.title}" style="border-radius: 4px; margin-top: 10px;">
        `;
        outputContainer.appendChild(card);
            });
    }
