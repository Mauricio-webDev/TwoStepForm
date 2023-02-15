/*Función para el formulario de entidades, si se escoge bancos salen caixa, ing y bbva y si se esscoge financieras sale vivus, moneyman y wennace*/
// Declara las opciones para el menú desplegable "bancos"
const bancos = [
  { value: 'Caixabank', label: 'CaixaBank' },
  { value: 'ING', label: 'ING' },
  { value: 'BBVA', label: 'BBVA' }
];

// Declara las opciones para el menú desplegable "financieras"
const financieras = [
  { value: 'Vivus', label: 'Vivus' },
  { value: 'Moneyman', label: 'Moneyman' },
  { value: 'Wenance', label: 'Wenance' }
];

// Obtiene el menú desplegable de entidades y el menú desplegable de tipo de entidad del formulario
const entidadesDropdown = document.getElementById('entidades');
const tipoEntidadDropdown = document.getElementById('tipo-entidad');

// Rellena el menú desplegable de entidades con las opciones del menú desplegable "bancos"
function fillDropdownWithEntidades(entidades) {
  entidadesDropdown.innerHTML = '';
  entidades.forEach((entidad) => {
    const option = document.createElement('option');
    option.value = entidad.value;
    option.text = entidad.label;
    entidadesDropdown.add(option);
  });
}

// Rellena inicialmente el menú desplegable de entidades con las opciones del menú desplegable "bancos"
fillDropdownWithEntidades(bancos);

// Escucha los cambios en el menú desplegable de tipo de entidad y actualiza el menú desplegable de entidades en consecuencia
tipoEntidadDropdown.addEventListener('change', (event) => {
  if (event.target.value === 'bancos') {
    fillDropdownWithEntidades(bancos);
  } else if (event.target.value === 'financieras') {
    fillDropdownWithEntidades(financieras);
  }
});
// Este código JavaScript maneja la animación entre los pasos de un formulario

// Se obtienen los elementos HTML relevantes
const phase1 = document.getElementById('phase1');
const phase2 = document.getElementById('phase2');
const continueBtn = document.getElementById('continueBtn');
const backBtn = document.getElementById('backBtn');
const tab1 = [document.getElementById('form-1-tab'), document.getElementById('form-3-tab')];
const tab2 = document.getElementById('form-2-tab');

// Función que maneja la animación de transición entre pasos
const animateTransition = (out, inEl, outAnimation, inAnimation) => {
out.style.animation = outAnimation;
inEl.style.animation = inAnimation;

setTimeout(() => {
out.style.display = 'none';
out.style.animation = '';
inEl.style.display = 'block';
inEl.style.animation = '';
}, 500);
};

// Función para mostrar el primer paso
const showPhase1 = () => animateTransition(phase2, phase1, 'fadeOutRight 0.5s', 'fadeInLeft 0.5s');

// Función para mostrar el segundo paso
const showPhase2 = () => animateTransition(phase1, phase2, 'fadeOutLeft 0.5s', 'fadeInRight 0.5s');

// Se agregan eventos a los botones relevantes y se les asigna una función para manejar la animación de transición
tab1.forEach(tab => tab.addEventListener('click', showPhase1));

tab1[1].addEventListener('click', () => {
showPhase1();
phase2.style.animation = 'fadeOutRight 0.5s';
phase1.style.animation = 'fadeInLeft 0.5s';

setTimeout(() => {
phase2.style.display = 'none';
phase2.style.animation = '';
phase1.style.display = 'block';
phase1.style.animation = '';
}, 500);
});

tab2.addEventListener('click', showPhase2);

continueBtn.addEventListener('click', () => showPhase2());

backBtn.addEventListener('click', () => showPhase1());

/*Local Storage + PopUp + Validación*/

/* Este script utiliza Local Storage para guardar los datos ingresados en un formulario, valida los campos requeridos y muestra un PopUp con un mensaje de éxito en caso de que la validación sea correcta. */

// Obtenemos el formulario y los campos requeridos
const form = document.getElementById('formData');
const requiredInputs = document.querySelectorAll('input[required], input[type="email"]');

// A cada campo requerido le asignamos un listener para validar su contenido
requiredInputs.forEach(input => {
input.addEventListener('input', () => {
// Si el campo es el teléfono, quitamos los espacios en blanco
const telefonoValue = input.id === 'telefono' ? input.value.replace(/\s/g, '') : '';
// Validamos si el campo es válido según su tipo (text, email, etc.) y si tiene un valor ingresado
const isValid = input.checkValidity() && (input.value || input.type === 'email');
// Asignamos las clases "valid" e "invalid" según la validación del campo
input.classList.toggle('valid', isValid && (input.id !== 'telefono' || /^\d{9}$/.test(telefonoValue)));
input.classList.toggle('invalid', !isValid || (input.id === 'telefono' && !/^\d{9}$/.test(telefonoValue)));
});
});

// Al campo "teléfono" le asignamos un listener adicional para validar en tiempo real su contenido mientras se escribe
const telefonoInput = document.getElementById('telefono');
telefonoInput.addEventListener('keydown', () => {
const telefonoValue = telefonoInput.value.replace(/\s/g, '');
telefonoInput.classList.toggle('valid', /^\d{9}$/.test(telefonoValue));
telefonoInput.classList.toggle('invalid', !/^\d{9}$/.test(telefonoValue));
});

// Al enviar el formulario, validamos todos los campos requeridos y si el teléfono es válido
form.addEventListener('submit', event => {
event.preventDefault();

const telefonoValue = telefonoInput.value.replace(/\s/g, '');
const invalidInputs = document.querySelectorAll('.formInputsBody2.invalid');

// Si no hay campos inválidos y el teléfono es válido, guardamos los datos en Local Storage y mostramos el PopUp
if (invalidInputs.length === 0 && /^\d{9}$/.test(telefonoValue)) {
const formData = {
Tipo_Entidad: document.getElementById('tipo-entidad').value,
Entidad: document.getElementById('entidades').value,
Monto: document.getElementById('slider').value,
Nombre: document.getElementById('nombre').value,
Apellidos: document.getElementById('apellidos').value,
Telefono: telefonoValue,
Correo: document.getElementById('correo').value,
};
localStorage.setItem('formData', JSON.stringify(formData));

const popupContainer = document.getElementById("popup");
const closeButton = popupContainer.querySelector('.close-button');

// Agregamos las clases de animación para mostrar el PopUp y asignamos el listener para cerrarlo
popupContainer.classList.add('animate__fadeIn');
popupContainer.style.display = 'block';

closeButton.addEventListener('click', () => {
  popupContainer.classList.remove('animate__fadeIn');
  popupContainer.classList.add('animate__fadeOut');
  setTimeout(() => {
    popupContainer.style.display = "none";
    popupContainer.classList.remove('animate__fadeOut');
  }, 500);
});
}
});

/*Función para sumar valores al slider con botones*/ 
const s = (s) => document.querySelector(s);
const slider = s('#slider');
const menosButton = s('#menosButton');
const masButton = s('#masButton');
const sliderValue = s('#slider-value');

const actualizarBotones = () => {
  const v = parseInt(slider.value);
  menosButton.disabled = (v <= slider.min);
  masButton.disabled = (v >= slider.max);
};

const updateSliderValue = () => {
  let v = slider.value;
  sliderValue.textContent = (v == slider.max) ? `${v} € o más` : `${v} €`;
  actualizarBotones();
};

slider.addEventListener('input', updateSliderValue);

menosButton.addEventListener('click', () => {
  const v = parseInt(slider.value);
  if (v > slider.min) {
    slider.value = (v - 1000).toString();
    updateSliderValue();
  }
});

masButton.addEventListener('click', () => {
  const v = parseInt(slider.value);
  if (v < slider.max) {
    slider.value = (v + 1000).toString();
    updateSliderValue();
  }
});

updateSliderValue();

/*Formulario Responsive para pantallas pequeñas*/

const openButton = document.querySelector('#responsiveForm a');
const formContainer = document.querySelector('#formRegister');

openButton.addEventListener('click', () => {
  formContainer.classList.add('animate');
});

formContainer.addEventListener('click', event => {
  if (event.target === formContainer) {
    formContainer.classList.remove('animate');
  }
});