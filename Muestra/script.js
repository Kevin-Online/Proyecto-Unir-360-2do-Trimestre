// script.js
// Este archivo contiene la lógica JavaScript para la visualización interactiva de un arreglo.

document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del DOM
    const valueInput = document.getElementById('valueInput');
    const indexInput = document.getElementById('indexInput');
    const addButton = document.getElementById('addButton');
    const accessButton = document.getElementById('accessButton');
    const updateButton = document.getElementById('updateButton');
    const deleteButton = document.getElementById('deleteButton');
    const arrayVisualization = document.getElementById('arrayVisualization');
    const messageArea = document.getElementById('messageArea');

    // El arreglo que vamos a manipular y visualizar
    let myArray = [];

    // --- Funciones de Utilidad ---

    /**
     * Muestra un mensaje de feedback al usuario.
     * @param {string} message - El mensaje a mostrar.
     * @param {'success'|'error'} type - El tipo de mensaje ('success' o 'error').
     */
    function showMessage(message, type) {
        messageArea.textContent = message;
        messageArea.classList.remove('hidden', 'success', 'error'); // Limpia clases anteriores
        messageArea.classList.add(type); // Añade la clase de tipo
        messageArea.classList.remove('hidden'); // Asegura que el área de mensaje sea visible

        // Oculta el mensaje después de 3 segundos
        setTimeout(() => {
            messageArea.classList.add('hidden');
        }, 3000);
    }

    /**
     * Limpia los campos de entrada.
     */
    function clearInputs() {
        valueInput.value = '';
        indexInput.value = '';
    }

    /**
     * Resalta un elemento del arreglo por su índice.
     * @param {number} index - El índice del elemento a resaltar.
     */
    function highlightElement(index) {
        // Elimina el resaltado de todos los elementos primero
        document.querySelectorAll('.array-element').forEach(el => {
            el.classList.remove('selected');
        });
        // Si el índice es válido, resalta el elemento correspondiente
        if (index >= 0 && index < myArray.length) {
            const elementToHighlight = arrayVisualization.children[index];
            if (elementToHighlight) {
                elementToHighlight.classList.add('selected');
            }
        }
    }

    // --- Operaciones del Arreglo (CRUD) ---

    /**
     * Renderiza el estado actual del arreglo en la interfaz.
     */
    function renderArray() {
        arrayVisualization.innerHTML = ''; // Limpia la visualización actual
        if (myArray.length === 0) {
            // Si el arreglo está vacío, muestra un mensaje o un placeholder
            arrayVisualization.innerHTML = '<div class="text-gray-500 text-xl">Arreglo vacío. ¡Añade elementos!</div>';
            return;
        }

        // Itera sobre el arreglo y crea un elemento visual para cada item
        myArray.forEach((item, index) => {
            const elementDiv = document.createElement('div');
            elementDiv.classList.add('array-element'); // Clase CSS para el estilo del círculo

            // Contenido del elemento: índice y valor
            elementDiv.innerHTML = `
                <span class="index">[${index}]</span>
                <span class="value">${item}</span>
            `;
            arrayVisualization.appendChild(elementDiv);
        });
    }

    /**
     * Añade un nuevo valor al final del arreglo.
     */
    function addValue() {
        const value = valueInput.value.trim();
        if (value === '') {
            showMessage('Por favor, ingresa un valor para añadir.', 'error');
            return;
        }
        myArray.push(value); // Añade el valor al final del arreglo
        renderArray(); // Vuelve a renderizar la visualización
        highlightElement(myArray.length - 1); // Resalta el elemento recién añadido
        showMessage(`Valor "${value}" añadido en el índice [${myArray.length - 1}].`, 'success');
        clearInputs();
    }

    /**
     * Accede y muestra el valor en un índice específico.
     */
    function accessValue() {
        const index = parseInt(indexInput.value);
        if (isNaN(index)) {
            showMessage('Por favor, ingresa un índice numérico para acceder.', 'error');
            return;
        }
        if (index < 0 || index >= myArray.length) {
            showMessage(`Índice [${index}] fuera de los límites del arreglo.`, 'error');
            return;
        }
        const value = myArray[index];
        showMessage(`Valor en el índice [${index}]: "${value}"`, 'success');
        highlightElement(index); // Resalta el elemento accedido
        valueInput.value = value; // Muestra el valor en el campo de valor
    }

    /**
     * Actualiza el valor en un índice específico.
     */
    function updateValue() {
        const value = valueInput.value.trim();
        const index = parseInt(indexInput.value);

        if (value === '') {
            showMessage('Por favor, ingresa un valor para actualizar.', 'error');
            return;
        }
        if (isNaN(index) || index < 0 || index >= myArray.length) {
            showMessage('Por favor, ingresa un índice válido para actualizar.', 'error');
            return;
        }
        const oldValue = myArray[index];
        myArray[index] = value; // Actualiza el valor en el arreglo
        renderArray(); // Vuelve a renderizar
        highlightElement(index); // Resalta el elemento actualizado
        showMessage(`Valor en el índice [${index}] actualizado de "${oldValue}" a "${value}".`, 'success');
        clearInputs();
    }

    /**
     * Elimina un elemento en un índice específico.
     */
    function deleteValue() {
        const index = parseInt(indexInput.value);
        if (isNaN(index) || index < 0 || index >= myArray.length) {
            showMessage('Por favor, ingresa un índice válido para eliminar.', 'error');
            return;
        }

        // Añade una clase temporal para la animación de eliminación
        const elementToDelete = arrayVisualization.children[index];
        if (elementToDelete) {
            elementToDelete.classList.add('deleting');
        }

        // Permite que la animación de eliminación se vea antes de eliminar el elemento
        setTimeout(() => {
            const deletedValue = myArray.splice(index, 1); // Elimina el elemento del arreglo
            renderArray(); // Vuelve a renderizar
            showMessage(`Elemento "${deletedValue}" eliminado del índice [${index}].`, 'success');
            clearInputs();
        }, 300); // Pequeño retraso para la animación
    }

    // --- Enlace de Eventos ---
    addButton.addEventListener('click', addValue);
    accessButton.addEventListener('click', accessValue);
    updateButton.addEventListener('click', updateValue);
    deleteButton.addEventListener('click', deleteValue);

    // Renderiza el arreglo inicial (vacío) al cargar la página
    renderArray();
});
