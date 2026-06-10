const textInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function addTask() {
    const temTexto = textInput.value.trim();
    if (temTexto !== '') {
        const li = document.createElement('li');
        li.innerHTML = `
            ${textInput.value.trim()}
            <div>
                <button onclick="remover(this)">Remover</button>
                <button onclick="editar(this)">Editar</button>
                <button onclick="completar(this)">Concluir</button>
            </div>
        `;
        taskList.appendChild(li);
        textInput.value = '';
    }
}

function remover(button) {
    const itemToRemove = button.parentElement.parentElement;
    itemToRemove.remove();
}

function editar(button) {
    const li = button.parentElement.parentElement;
    const textContent = li.textContent.trim().replace(/RemoverEditarConcluir/g, '').trim();
    const newText = prompt('Editar tarefa:', textContent);
    if (newText !== null && newText.trim() !== '') {
        li.innerHTML = `
            ${newText.trim()}
            <div>
                <button onclick="remover(this)">Remover</button>
                <button onclick="editar(this)">Editar</button>
                <button onclick="completar(this)">Concluir</button>
            </div>
        `;
    }
}

function completar(button) {
    const li = button.parentElement.parentElement;
    li.classList.toggle('completed');
}

textInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});
