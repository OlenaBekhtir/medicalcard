// тестові дані для входу
// const token = '46a14f81-1009-4f44-9871-d7b6baf91e87';
// const email = 'bekhtir@ukr.net';
// const password = '123';


import { createVisit } from "./visit.js";
import { Visit, VisitDentist, VisitCardiologist, VisitTherapist } from "./cards.js";
import { Select } from "./select.js";


class Modal {

// МЕТОД Створення інформаційного вікна про помилку авторизації    
    addModalError() {
        const modalError = document.createElement('div');
        // прибирання лоадера
        const loader = document.querySelector('.loader');
        loader.remove();
        modalError.innerText = "Помилка авторизації!";
        modalError.classList.add('modal-error');
        document.body.appendChild(modalError);                
        this.modalWindow.remove();
        const closeErr = document.createElement('div');
        closeErr.innerHTML = '<i class="fa-solid fa-xmark err-delete"></i>';
        modalError.appendChild(closeErr);
        const errDelete = document.querySelector('.err-delete');
        errDelete.addEventListener('click', (e) => {
        modalError.remove();
        });
    }  

// МЕТОД Видалення інформаційного вікна про помилку
    deleteModalError() {
        const windowError = document.querySelector('.modal-error');
        if (document.body.contains(windowError)) {
            windowError.remove();
        }
    }

// МЕТОД Видалення інформації, яка відображається при первинному відвідуванні сторінки користувачем або при відсутності візитів
    deleteFirstInfo() {
        const firstVisit = document.querySelector('.first-vizit');
        if (firstVisit) {
            firstVisit.remove();
        }
    }

    startApi() {
            // додавання лоадера
            const loader = document.createElement('div');
            loader.classList.add('loader');
            loader.innerHTML = '<span></span>'
            document.body.prepend(loader);

            const valEmail = document.querySelector('.input-email').value;
            const valPass = document.querySelector('.input-pass').value;
            console.log(valEmail, valPass);
            if ((valEmail === "") || (valPass === "")) {
                this.addModalError();
                return
            }
            const email = valEmail;
            const password = valPass;
            
            // надсилання запиту авторизацї на сервер та "відловлювання" можливих помилок авторизації
            (async() => {
                const response = await fetch('https://ajax.test-danit.com/api/v2/cards/login', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email, password: password }),
                  });
                  try {
                   const data = await response.text()
                        console.log(data);
                        localStorage.setItem('token', data);
                        if (!(localStorage.getItem('token') == 'Incorrect username or password')) {
                            const btnCreate = document.querySelector('.header-btn');
                            btnCreate.innerText = 'Створити візит';
                            btnCreate.style.fontSize = '16px';
                            this.modalWindow.remove();
                            btnCreate.classList.add('create-vizit');
                            btnCreate.classList.remove('btn-exit');
                            const btnCreateVizit = document.querySelector('.create-vizit');
                            btnCreateVizit.addEventListener('click', (e) => {
                            console.log('Створити візит');
                            this.modalWindow.remove();
                            createVisit.renderModalVisit();
                            });
                        } else {
                            this.addModalError();
                        }
                    } catch {
                            console.log('виникла непередбачувана помилка');
                            this.addModalError();
                    }; 
                })();
                
                // надсилання запиту на сервер для отримання усіх наявних карток та їх відмальовування на екрані
                fetch('https://ajax.test-danit.com/api/v2/cards', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        // console.log(data);
                        const cardsAll = data;
                        loader.remove();
                        cardsAll.forEach(card => {
                            const fullname = card.fullname;
                            const doctor = card.doctor;
                            const id = card.id;
                            const visit = new Visit(fullname, doctor, id);
                            visit.renderCard(fullname, doctor, id);
                            this.deleteFirstInfo();
                            // loader.remove();
                            const purpose = card.purpose;
                            const description = card.description;
                            const urgency = card.urgency;
                            const completed = card.completed;
                            const addcomment = card.addcomment;
                            if (doctor === 'cardiologis') {
                                const pressure = card.pressure;
                                const age = card.age;
                                const weight = card.weight;
                                const illness = card.illness;
                                // console.log(pressure, age, weight, illness);
                                const visitCardiologist = new VisitCardiologist(fullname, doctor, purpose, description, urgency, completed, pressure, age, weight, illness, addcomment);
                                visitCardiologist.renderCardCardiologist(fullname, purpose, description, urgency, completed, pressure, age, weight, illness, addcomment);                          
                            } else if (doctor === 'dentist') {
                                const lastvisit = card.lastvisit;
                                // console.log(lastvisit);
                                const visitDentist = new VisitDentist(fullname, doctor, purpose, description, urgency, completed, lastvisit, addcomment);
                                visitDentist.renderCardDentist(fullname, purpose, description, urgency, completed, lastvisit, addcomment);
                            } else if (doctor === 'therapist') {
                                const age = card.age;
                                const visitTherapist = new VisitTherapist(fullname, purpose, description, urgency, completed, age, addcomment);
                                visitTherapist.renderCardTherapist(fullname, purpose, description, urgency, completed, age, addcomment);
                            }
                        })

                        const select = new Select ();
                        select.selectCards();
                        // прибирання лоадера
                        loader.remove();
                }); 
    }
     
// МЕТОД Відмальовування модального вікна для авторизації
    renderModal() {
        // Відмальовування полів вікна авторизації
        const btnExit = document.querySelector('.header-btn');
        btnExit.classList.add('.btn-exit');

        this.modalWindow = document.createElement('div');
        this.modalWindow.innerText = 'Авторизуйтесь, будь ласка';
        this.modalWindow.classList.add('modal');

        const closeModal = document.createElement('div');
        closeModal.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        closeModal.classList.add('btn-delete');

        const inputEmail = document.createElement('div');
        inputEmail.innerHTML = '<label class="input-label">Введіть e-mail<input class="input-modal input-email" type = "text" placeholder="e-mail" /></label>'

        // можливість перемикання між режимами видимості введеного пароля
        const inputPassword = document.createElement('div');
        inputPassword.innerHTML = '<label class="input-label">Введіть пароль<input  class="input-modal input-pass" type = "password" placeholder="password" /></label>'
        const eyeSlash = document.createElement('div');
        eyeSlash.innerHTML = '<i class="fa-solid fa-eye-slash pass-icon"></i>';
        inputPassword.append(eyeSlash);
        eyeSlash.addEventListener('click', (e) => {
            const inputPass = document.querySelector('.input-pass');
            if (inputPass.getAttribute('type') === 'password') {
                eyeSlash.innerHTML = '<i class="fa-solid fa-eye pass-icon"></i>';
                inputPass.setAttribute('type', 'text');
            } else {
                inputPass.setAttribute(`type`, 'password');
                eyeSlash.innerHTML = '<i class="fa-solid fa-eye-slash pass-icon"></i>';
            };              
        });

        // створення кнопки для надсилання даних авторизації на сервер
        const btnModal = document.createElement('button');
        btnModal.innerText = 'Надіслати';
        btnModal.classList.add('btn-modal');
        btnModal.addEventListener('click', (e) => {
            e.preventDefault();
            this.startApi();
        })
              
        document.body.append(this.modalWindow);
        this.modalWindow.appendChild(closeModal);
        this.modalWindow.appendChild(inputEmail); 
        this.modalWindow.appendChild(inputPassword);
        this.modalWindow.appendChild(btnModal);
    }

    
// МЕТОД Видалення модального вікна після авторизації користувача
    deleteModal() {
        const btnDelete = document.querySelector('.btn-delete');
        const modalWindow = document.querySelector('.modal');
        btnDelete.addEventListener('click', (e) => {
            modalWindow.remove();
        });
    }
}

const modal = new Modal();
const headerBtn = document.querySelector('.header-btn');
headerBtn.classList.add('btn-exit');
const btnExit = document.querySelector('.btn-exit');
btnExit.addEventListener('click', (e) => {  
    modal.deleteModalError();
    modal.renderModal();
    modal.deleteModal();    
});

export { modal }