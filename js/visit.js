import { Visit, VisitDentist, VisitCardiologist, VisitTherapist } from "./cards.js"
import { modal } from "./modal.js"
import { Select } from "./select.js"
import { EditVisit } from "./editvisit.js"

class CreateVisit {

// МЕТОД Повідомлення про незаповнені поля форми 
    emptyField() {
        const modalNewVisit = document.querySelector('.modal-newvisit');
        const errorForm = document.createElement('div');
        errorForm.innerText = 'Заповніть усі поля форми!';
        errorForm.classList.add('modal-newvisit');
        errorForm.classList.add('modal-error');
        modalNewVisit.appendChild(errorForm);
        const closeErr = document.createElement('div');
        closeErr.innerHTML = '<i class="fa-solid fa-xmark err-delete"></i>';
        errorForm.appendChild(closeErr);
        const errDelete = document.querySelector('.err-delete');
        errDelete.addEventListener('click', (e) => {
            errorForm.remove();
        })
    }

// МЕТОД Повідомлення про непередбачувану помилку в catch
    errUnexp() {
        const errDoctor = document.createElement('div');
        errDoctor.classList.add('modal-error');
        document.body.appendChild(errDoctor);
        const closeErr = document.createElement('div');
        errDoctor.innerHTML = '<i class="fa-solid fa-xmark err-delete"></i><div>Виникла непередбачувана помилка!!!</div>';
        errDoctor.append(closeErr);
        errDoctor.addEventListener('click', (e) => {
            errDoctor.remove();
        });    
    }
 
// МЕТОД Відмальовування модального вікна для створення візиту
    renderModalVisit() {
        const wrapperVisit = document.createElement('div');
        document.body.appendChild(wrapperVisit);
        wrapperVisit.classList.add('wrap-visit');
        const modalNewVisit = document.createElement('div');
        modalNewVisit.classList.add('modal-newvisit');        
        wrapperVisit.appendChild(modalNewVisit);
        document.body.style.height = '800px';
        // Закриття вікна створення візиту при кліку за його межами
        wrapperVisit.addEventListener( 'click', (e) => {
            if (!(e.target.closest('.modal-newvisit'))) {
                wrapperVisit.remove();
                document.body.style.height = '100vh';
                };
            });       

    // Відмальовування полів вікна для створення візиту       
        const inputFullname = document.createElement('div');
        inputFullname.innerHTML = '<label class="name-input">ПІБ пацієнта<textarea  class="input-visit input-fullname" type = "text" required /></textarea></label>';

        const inputPuspose = document.createElement('div');
        inputPuspose.innerHTML = '<label class="name-input">Мета візиту<textarea  class="input-visit input-purpose" type = "text" required /></textarea></label>';
        const inputDescription = document.createElement('div');
        inputDescription.innerHTML = '<label class="name-input">Стислий опис візиту<textarea class="input-visit input-description" required></textarea></label>';

        const wrapSelect = document.createElement('div');
        wrapSelect.classList.add('wrap-select-modalvisit');

        const selectDoctor = document.createElement('div');
        selectDoctor.innerHTML = '<select class="select select-doctor" name="" id="doctors"><option value="doc">оберіть лікаря</option><option class="dentist" value="dentist">Стоматолог</option><option class="cardiologis" value="cardiologis">Кардіолог</option><option class="therapist" value="therapist">Терапевт</option></select>';

        const addField = document.createElement('div');
        addField.classList.add('add-field');

        const selectUrgency = document.createElement('div');
        selectUrgency.innerHTML = '<select class="select select-urgency" name="" id="urgency"><option value="select">терміновість візиту</option><option class="high-urgency" value="high">терміново</option><option class="normal-urgency" value="normal">звичайний</option><option class="low-urgency" value="low">плановий</option></select>';

        const selectDone = document.createElement('div');
        selectDone.innerHTML = '<select class="select select-done" name="" id="status"><option value="select">статус візиту</option><option class="visit-open" value="open">візит очікується</option><option class="visit-done" value="done">візит відбувся</option></select>';

        const inputAddComment = document.createElement('div');
        inputAddComment.innerHTML = '<label class="name-input">Додаткові коментарі<textarea class="input-visit input-addcomment"></textarea></label>';

    // Кнопки для управління створенням візиту
        const btnWrapper = document.createElement('div');
        btnWrapper.classList.add('btn-wrapper');
        const btnPostVisit = document.createElement('button');
        btnPostVisit.innerText = 'Створити';
        btnPostVisit.classList.add('btn-visit');
        btnPostVisit.classList.add('create-card');
        btnPostVisit.setAttribute('type', 'submit');
        
        const btnCloseVisit = document.createElement('button');
        btnCloseVisit.innerText = 'Закрити';
        btnCloseVisit.classList.add('btn-visit');
        btnCloseVisit.classList.add('close-visit');
        btnCloseVisit.addEventListener('click', (e) => {
            wrapperVisit.remove();
        });

        modalNewVisit.append(inputFullname, inputPuspose, inputDescription, wrapSelect,  addField, inputAddComment, btnWrapper);
        wrapSelect.append(selectDoctor, selectUrgency, selectDone);
        btnWrapper.append(btnPostVisit, btnCloseVisit);

    // Додавання до модального вікна полів для створення візиту до конкретного лікаря    
        const doctors = document.querySelector("#doctors");
        doctors.addEventListener('change', (e) => {
            console.log(e.target.value);
            let doctor = e.target.value;
            addField.innerHTML = "";
            if (doctor === 'dentist') {
                console.log("add dentist visit");
                const inpLastVisit = document.createElement('div');
                inpLastVisit.innerHTML = '<label class="name-input"><i class="fa-solid fa-tooth"></i> Дата останнього візиту<input class="input-visit input-lastvisit" type = "text" required /></label>';
                addField.appendChild(inpLastVisit);
            } else {
                if (doctor === 'cardiologis') {
                    console.log("add cardiologist visit");
                    const inpPressure = document.createElement('div');
                    inpPressure.innerHTML = '<label class="name-input"><i class="fa-solid fa-heart"></i>Робочий тиск<input class="input-visit input-pressure" type = "text" required /></label>';
                    const inpAge = document.createElement('div');
                    inpAge.innerHTML = '<label class="name-input">Вік<input class="input-visit input-age" type = "text" required /></label>';
                    const inpWeight = document.createElement('div');
                    inpWeight.innerHTML = '<label class="name-input">Індекс маси тіла<input class="input-visit input-weight" type = "text" required /></label>';
                    const inpIllness = document.createElement('div');
                    inpIllness.innerHTML = '<label class="name-input">Перенесені захворювання серцево-судинної системи<textarea class="input-visit input-illness" required></textarea></label>';

                    addField.append(inpPressure, inpAge, inpWeight, inpIllness);

                } else {
                    if (doctor === 'therapist') {
                        const inpAge = document.createElement('div');
                        inpAge.innerHTML = '<label class="name-input"><i class="fa-solid fa-stethoscope"></i>Вік<input class="input-visit input-age" type = "text" required /></label>';
                        addField.appendChild(inpAge);
                    }                    
                }
            }
        })
        
    // Отримання даних із заповнених полів    
        btnPostVisit.addEventListener('click', (e) => {
            const fullname = document.querySelector('.input-fullname').value;
            const doctor = document.querySelector('.select-doctor').value;
            const purpose = document.querySelector('.input-purpose').value;
            const description = document.querySelector('.input-description').value;
            const urgency = document.querySelector('.select-urgency').value;
            const completed = document.querySelector('.select-done').value;
            let addcomment = "нема";   
            addcomment = document.querySelector('.input-addcomment').value;
       

    // Перевірка, чи всі обов'язкові поля заповнені        
            if (fullname === '' || doctor === '' || purpose === '' || description === '' || urgency === '' || completed === '') {
                this.emptyField();

                } else if (doctor === 'dentist') {
                    const lastvisit = document.querySelector('.input-lastvisit').value;
                    if (lastvisit === '') {
                        this.emptyField();
                    } else {
                        this.createPost(fullname, doctor, purpose, description, urgency, completed, addcomment);
                    }

                } else if (doctor === 'cardiologis') {
                    const pressure = document.querySelector('.input-pressure').value;
                    const age = document.querySelector('.input-age').value;
                    const weight = document.querySelector('.input-weight').value;
                    const illness = document.querySelector('.input-illness').value;
                    if (pressure === '' || age === '' || weight === '' || illness === '') {
                        this.emptyField();
                        } else {
                            this.createPost(fullname, doctor, purpose, description, urgency, completed, addcomment);
                    }

                } else if (doctor === 'therapist') {
                        const age = document.querySelector('.input-age').value;
                        if (age === '') {
                            this.emptyField();
                        } else {
                            this.createPost(fullname, doctor, purpose, description, urgency, completed, addcomment);
                        }
                                
            } else {
                this.createPost(fullname, doctor, purpose, description, urgency, completed, addcomment);
            }

        })
    }  

// МЕТОД Створення нового візиту  
    createPost(fullname, doctor, purpose, description, urgency, completed, addcomment) {
        console.log (fullname, doctor, purpose, description, urgency, completed, addcomment);
        // створення візиту стоматолога
            if (doctor === 'dentist') {
                const lastvisit = document.querySelector('.input-lastvisit').value;
                (async() => {
                    const response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({
                            fullname: `${fullname}`,
                            doctor: `${doctor}`,
                            purpose: `${purpose}`,
                            description: `${description}`,
                            urgency: `${urgency}`,
                            completed: `${completed}`,
                            lastvisit: `${lastvisit}`,
                            addcomment: `${addcomment}`
                    })
                })
                    try {
                        const data = await response.json()
                        console.log(data.id, data.lastvisit);
                        const newId = data.id;

                        fetch(`https://ajax.test-danit.com/api/v2/cards/${newId}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    })
                        .then((r) => r.json())
                        .then((d) => {
                            console.log(d);
                            const fullname = d.fullname;
                            const doctor = d.doctor;
                            const id = d.id;
                            const visit = new Visit(id, fullname, doctor);
                            visit.renderCard(fullname, doctor, id);
                            const wrapperVisit = document.querySelector('.wrap-visit');
                            wrapperVisit.remove();  
                            modal.deleteFirstInfo();
                            const purpose = d.purpose;
                            const description = d.description;
                            const urgency = d.urgency;
                            const completed = d.completed;
                            const lastvisit = d.lastvisit;
                            const addcomment = d.addcomment;
                            const visitDentist = new VisitDentist(id, fullname, doctor, purpose, description, urgency, completed, lastvisit, addcomment);
                            visitDentist.renderCardDentist(fullname, purpose, description, urgency, completed, lastvisit, addcomment);
                        });
                    } catch {
                        console.log('Виникла непередбачувана помилка!');
                        this.errUnexp();
                    }
                    const select = new Select ();
                    select.selectCards();
            })();                       

            // Створення візиту терапевта
            } else if (doctor === 'therapist') {
                const age = document.querySelector('.input-age').value;
                (async() => {
                    const response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({
                            fullname: `${fullname}`,
                            doctor: `${doctor}`,
                            purpose: `${purpose}`,
                            description: `${description}`,
                            urgency: `${urgency}`,
                            completed: `${completed}`,
                            age: `${age}`,
                            addcomment: `${addcomment}`
                        })  
                })
                    try {
                        const data = await response.json()
                        console.log(data.id, data.age);
                        const newId = data.id;

                        fetch(`https://ajax.test-danit.com/api/v2/cards/${newId}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    })
                        .then((r) => r.json())
                        .then((d) => {
                            console.log(d);
                            const fullname = d.fullname;
                            const doctor = d.doctor;
                            const id = d.id;
                            const visit = new Visit(id, fullname, doctor);
                            visit.renderCard(fullname, doctor, id);
                            const wrapperVisit = document.querySelector('.wrap-visit');
                            wrapperVisit.remove();  
                            modal.deleteFirstInfo();
                            const purpose = d.purpose;
                            const description = d.description;
                            const urgency = d.urgency;
                            const completed = d.completed;
                            const age = d.age;
                            const addcomment = d.addcomment;
                            const visitTherapist = new VisitTherapist(id, fullname, doctor, purpose, description, urgency, completed, age, addcomment);
                            visitTherapist.renderCardTherapist(fullname, purpose, description, urgency, completed, age, addcomment);
                        });
                    } catch {
                        console.log('Виникла непередбачувана помилка!');
                        this.errUnexp();
                    }
                    const select = new Select ();
                    select.selectCards();
            })();


            // Створення візиту кардіолога
            } else if (doctor === 'cardiologis') {
                const pressure = document.querySelector('.input-pressure').value;
                const age = document.querySelector('.input-age').value;
                const weight = document.querySelector('.input-weight').value;
                const illness = document.querySelector('.input-illness').value;
                (async() => {
                    const response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        fullname: `${fullname}`,
                        doctor: `${doctor}`,
                        purpose: `${purpose}`,
                        description: `${description}`,
                        urgency: `${urgency}`,
                        completed: `${completed}`,
                        pressure: `${pressure}`,
                        age: `${age}`,
                        weight: `${weight}`,
                        illness: `${illness}`,
                        addcomment: `${addcomment}`
                        }) 
                })
                try {
                    const data = await response.json()
                    console.log(data.id, data.pressure, data.age, data.weight, data.illness);
                    const newId = data.id;
                    fetch(`https://ajax.test-danit.com/api/v2/cards/${newId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                    .then((r) => r.json())
                    .then((d) => {
                        console.log(d);
                        const fullname = d.fullname;
                        const doctor = d.doctor;
                        const id = d.id;
                        const visit = new Visit(id, fullname, doctor);
                        visit.renderCard(fullname, doctor, id);
                        const wrapperVisit = document.querySelector('.wrap-visit');
                        wrapperVisit.remove();  
                        modal.deleteFirstInfo();
                        const purpose = d.purpose;
                        const description = d.description;
                        const urgency = d.urgency;
                        const completed = d.completed;
                        const pressure = d.pressure;
                        const age = d.age;
                        const weight = d.weight;
                        const illness = d.illness;
                        const addcomment = d.addcomment;
                        const visitCardiologist = new VisitCardiologist(id, fullname, doctor, purpose, description, urgency, completed, pressure, age, weight, illness, addcomment);
                        visitCardiologist.renderCardCardiologist(fullname, purpose, description, urgency, completed, pressure, age, weight, illness, addcomment);
                    });
                } catch {
                    console.log('Виникла непередбачувана помилка!');
                    this.errUnexp()
                }
                const select = new Select ();
                select.selectCards();
            })();
                
            // повідомлення на екрані, що лікар не обраний
            } else {
                console.log('Не обраний лікар');
                const errDoctor = document.createElement('div');
                errDoctor.classList.add('modal-error');
                document.body.appendChild(errDoctor);
                const closeErr = document.createElement('div');
                errDoctor.innerHTML = '<i class="fa-solid fa-xmark err-delete"></i><div>Оберіть лікаря!!!</div>';
                errDoctor.append(closeErr);
                errDoctor.addEventListener('click', (e) => {
                    errDoctor.remove();
                })
            }
        }        
}
      
const createVisit = new CreateVisit();

export { createVisit, CreateVisit };