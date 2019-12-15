const baseUrl = ''//Тут нужно написать адрес сервера Heroku

let firstId = 0;
let lastId = 0;
let lastPosts = [];

const rootEl = document.getElementById('root');

const formEl = document.createElement('form');
formEl.className = 'form-inline mb-2';
formEl.innerHTML = `
<div class="container">
        <div class="row">
            <div class="col">
                <div class="form-group">
                    <input  class="form-control mb-2" data-id="url">
                    <input  class="form-control mb-2" data-id="text">
                    <select class="custom-select mb-2" data-id="type">
                        <option value="regular">Обычный</option>
                        <option value="image">Изображение</option>
                        <option value="audio">Аудио</option>
                        <option value="video">Видео</option>
                    </select>
                    <button class="btn btn-primary mb-2">Ок</butto>

                </div>
            </div>
        </div>
</div>
`;
rootEl.appendChild(formEl);

const showFreshPostsBtn = document.createElement('button');
showFreshPostsBtn.className = 'btn btn-primary btn-lg btn-block';
showFreshPostsBtn.textContent = 'Показать свежие записи';
showFreshPostsBtn.style.display = 'none';
showFreshPostsBtn.addEventListener('click', ev => {
    fetch(`${baseUrl}/posts/${firstId}`)//fetch ссылается на posts Из бэкенда
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        }).then(data => {
            firstId = 0;
            lastPosts.unshift(...data.reverse());
            rebuildList(postsEl, lastPosts);
            showFreshPostsBtn.style.display = "none";
        }).catch(error => {
            console.log(error);
        });

});
rootEl.appendChild(showFreshPostsBtn);


// Не работает localStorage
const urlEl = formEl.querySelector('[data-id=url]');
const textEl = formEl.querySelector('[data-id=text]');
const typeEl = formEl.querySelector('[data-id=type]');

urlEl.value = localStorage.getItem('content1');
textEl.value = localStorage.getItem('content2');
urlEl.addEventListener('input' , (ev) => {
    localStorage.setItem('content1' , ev.currentTarget.value);
});
textEl.addEventListener('input' , (ev) => {
    localStorage.setItem('content2' , ev.currentTarget.value);
});
if(localStorage.getItem('type') !== null) {
    typeEl.value = localStorage.getItem('type');
};
typeEl.addEventListener('input' , (ev) => {
    localStorage.setItem('type' , ev.currentTarget.value);
});

formEl.addEventListener('submit' , ev => {
    ev.preventDefault();
})
