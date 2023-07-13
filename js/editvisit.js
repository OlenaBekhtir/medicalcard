import { createVisit } from "./visit.js";
import { Visit, VisitDentist, VisitCardiologist, VisitTherapist } from "./cards.js";

class EditVisit {

    createModalEdit(id) {
        const btnEdit = document.querySelector('.btn-edit-card');
        btnEdit.addEventListener('click', (e) => {
            console.log('редагувати картку');
            // знаходимо карточку, яку будемо редагувати
            const cardForEdit = e.target.closest(".new-card");
            createVisit.renderModalVisit();
            // Підписуємо, що це модальне вікно для редагування даних
            const modalEdit = document.querySelector('.modal-newvisit');
            const textEdit = document.createElement('div');
            textEdit.innerText = 'Вікно редагування даних';
            textEdit.classList.add('text-edit');
            modalEdit.prepend(textEdit);
            // у модальному вікні заміняємо кнопку "створити" на кнопку "відправити зміни"
            const btnPostVisit = document.querySelector('.create-card');
            btnPostVisit.remove();
            const modalEditBtn = document.querySelector('.btn-wrapper');
            const btnEditCard = document.createElement('button');
            btnEditCard.innerText = "Відправити зміни";
            btnEditCard.classList.add('edit-card');
            modalEditBtn.prepend(btnEditCard);
            

            // отримуємо з сервера дані, які вже є в карточці
            console.log(id);
            fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then((r) => r.json())
                .then((d) => {
                    console.log(d);
                    const id = d.id;
                    let fullname = d.fullname;
                    let doctor = d.doctor;
                    let purpose = d.purpose;
                    let description = d.description;
                    let urgency = d.urgency;
                    let completed = d.completed;
                    let addcomment = d.addcomment; 

                    // відображаємо у полях модального вікна "редагування" існуючі дані
                    const fullnameEdit = document.querySelector('.input-fullname');
                    fullnameEdit.innerText = `${fullname}`;
                    const doctorEdit = document.createElement('div');
                    doctorEdit.innerText = `Лікар: ${doctor}`;
                    let doctorNew = document.querySelector('.select-doctor');
                    doctorNew.style.display = 'none';
                    const purposeEdit = document.querySelector('.input-purpose');
                    purposeEdit.innerText = `${purpose}`;
                    const descriptionEdit = document.querySelector('.input-description');  
                    const urgencyEdit = document.createElement('div');
                    urgencyEdit.innerText = `Терміновість: ${urgency}`;
                    const completedEdit = document.createElement('div');
                    completedEdit.innerText = `Статус візиту: ${completed}`;
                    const wrapInfoSelect = document.createElement('div');
                    modalEdit.prepend(wrapInfoSelect);
                    wrapInfoSelect.classList.add('wrap-infoselect');
                    wrapInfoSelect.append(doctorEdit, urgencyEdit, completedEdit);
                    descriptionEdit.innerText = `${description}`;
                    const addcommentEdit = document.querySelector('.input-addcomment');
                    addcommentEdit.innerText = `${addcomment}`;

                    // відображення у модальному вікні окремих полів, в залежності від обраного лікаря
                    if (doctor === 'dentist') {
                        // стоматолог
                        let lastvisit = d.lastvisit;
                        const lastVisitEdit = document.createElement('div');
                        lastVisitEdit.innerHTML = `<label class="name-input"><i class="fa-solid fa-tooth"></i> Дата останнього візиту<input class="input-visit input-lastvisit" type = "text" value = ${lastvisit} required /></label>`;
                        modalEdit.prepend(lastVisitEdit);
                    } else if (doctor === 'therapist') {
                        // терапевт
                        let age = d.age;
                        const ageEdit = document.createElement('div');
                        ageEdit.innerHTML = `<label class="name-input"><i class="fa-solid fa-stethoscope"></i>Вік<input class="input-visit input-age" type = "text" value =${age} required /></label>`;
                        modalEdit.prepend(ageEdit);
                    } else {
                        // кардіолог
                        let pressure = d.pressure;
                        let age = d.age;
                        let weight = d.weight;
                        let illness = d.illness;
                        const pressureEdit = document.createElement('div');
                        pressureEdit.innerHTML = `<label class="name-input"><i class="fa-solid fa-heart"></i>Робочий тиск<input class="input-visit input-pressure" type = "text" value = ${pressure} required /></label>`;
                        const ageEdit = document.createElement('div');
                        ageEdit.innerHTML = `<label class="name-input">Вік<input class="input-visit input-age" type = "text" value = ${age} required /></label>`;
                        const weightEdit = document.createElement('div');
                        weightEdit.innerHTML = `<label class="name-input">Індекс маси тіла<input class="input-visit input-weight" type = "text" value = ${weight} required /></label>`;
                        const illnessEdit = document.createElement('div');
                        illnessEdit.innerHTML = `<label class="name-input">Перенесені захворювання серцево-судинної системи<textarea class="input-visit input-illness" required>${illness}</textarea></label>`;
                        modalEdit.prepend(pressureEdit, ageEdit, weightEdit, illnessEdit);
                    }


                    // відправляємо запит методом PUT
                    btnEditCard.addEventListener('click', (e) => {
                        // заносимо у змінні нові відредаговані дані
                        let fullnameNew = document.querySelector('.input-fullname').value;
                        let purposeNew = document.querySelector('.input-purpose').value;
                        let descriptionNew = document.querySelector('.input-description').value;
                        let urgencyNew = document.querySelector('.select-urgency').value;
                        if (urgencyNew === 'select') { urgencyNew = urgency };
                        let completedNew = document.querySelector('.select-done').value;
                        if (completedNew === 'select') { completedNew = completed};
                        let addcommentNew = document.querySelector('.input-addcomment').value;

                        // редагування окремих полів, залежно від лікаря, до якого візит

                        // для стоматолога
                    if (doctor === 'dentist') {
                            let lastvisitNew = document.querySelector('.input-lastvisit').value;
                        fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
                            method: 'PUT',
                            headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${localStorage.getItem('token')}`
                            },
                            body: JSON.stringify({
                              id: `${id}`,
                              fullname: `${fullnameNew}`,
                              doctor: `${doctor}`,
                              purpose: `${purposeNew}`,
                              description: `${descriptionNew}`,
                              urgency: `${urgencyNew}`,
                              completed: `${completedNew}`,
                              addcomment: `${addcommentNew}`,
                              lastvisit: `${lastvisitNew}`
                            })
                          })
                            .then(response => response.json())
                            .then(response => {
                                console.log(response);
                                fullname = response.fullname;
                                doctor = response.doctor;
                                const editModal = document.querySelector('.wrap-visit');
                                editModal.remove();

                                // відмальовуємо відредаговану картку
                                const visit = new Visit(fullname, doctor);
                                visit.renderCard(fullname, doctor);

                                // робимо невидимою стару картку
                                cardForEdit.style.display = 'none';

                                // записуємо в змінні дані для відображення повної картки до стоматолога
                                const purpose = response.purpose;
                                const description = response.description;
                                const urgency = response.urgency;
                                const completed = response.completed;
                                const lastvisit = response.lastvisit;
                                const addcomment = response.addcomment;

                                const visitDentist = new VisitDentist(fullname, doctor, purpose, description, urgency, completed, lastvisit, addcomment);
                                visitDentist.renderCardDentist(fullname, purpose, description, urgency, completed, lastvisit, addcomment);
                            })

                        // для терапевта
                        } else if (doctor === 'therapist') {
                            let ageNew = document.querySelector('.input-age').value;
                        fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
                            method: 'PUT',
                            headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${localStorage.getItem('token')}`
                            },
                            body: JSON.stringify({
                              id: `${id}`,
                              fullname: `${fullnameNew}`,
                              doctor: `${doctor}`,
                              purpose: `${purposeNew}`,
                              description: `${descriptionNew}`,
                              urgency: `${urgencyNew}`,
                              completed: `${completedNew}`,
                              addcomment: `${addcommentNew}`,
                              age: `${ageNew}`
                            })
                          })
                            .then(response => response.json())
                            .then(response => {
                                console.log(response);
                                fullname = response.fullname;
                                doctor = response.doctor;
                                const editModal = document.querySelector('.wrap-visit');
                                editModal.remove();

                                // відмальовуємо відредаговану картку
                                const visit = new Visit(fullname, doctor);
                                visit.renderCard(fullname, doctor);

                                // робимо невидимою стару картку
                                cardForEdit.style.display = 'none';

                                // записуємо в змінні дані для відображення повної картки до терапевта
                                const purpose = response.purpose;
                                const description = response.description;
                                const urgency = response.urgency;
                                const completed = response.completed;
                                const age = response.age;
                                const addcomment = response.addcomment;

                                const visitTherapist = new VisitTherapist(fullname, doctor, purpose, description, urgency, completed, age, addcomment);
                                visitTherapist.renderCardTherapist(fullname, purpose, description, urgency, completed, age, addcomment);
                            })
                        } else {
                            // для кардіолога
                            let pressureNew = document.querySelector('.input-pressure').value;
                            let ageNew = document.querySelector('.input-age').value;
                            let weightNew = document.querySelector('.input-weight').value;
                            let illnessNew = document.querySelector('.input-illness').value;
                        fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
                            method: 'PUT',
                            headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${localStorage.getItem('token')}`
                            },
                            body: JSON.stringify({
                              id: `${id}`,
                              fullname: `${fullnameNew}`,
                              doctor: `${doctor}`,
                              purpose: `${purposeNew}`,
                              description: `${descriptionNew}`,
                              urgency: `${urgencyNew}`,
                              completed: `${completedNew}`,
                              addcomment: `${addcommentNew}`,
                              pressure: `${pressureNew}`,
                              age: `${ageNew}`,
                              weight: `${weightNew}`,
                              illness: `${illnessNew}`
                            })
                          })
                            .then(response => response.json())
                            .then(response => {
                                console.log(response);
                                fullname = response.fullname;
                                doctor = response.doctor;
                                const editModal = document.querySelector('.wrap-visit');
                                editModal.remove();

                                // відмальовуємо відредаговану картку
                                const visit = new Visit(fullname, doctor);
                                visit.renderCard(fullname, doctor);

                                // робимо невидимою стару картку
                                cardForEdit.style.display = 'none';

                                // записуємо в змінні дані для відображення повної картки до кардіолога
                                const purpose = response.purpose;
                                const description = response.description;
                                const urgency = response.urgency;
                                const completed = response.completed;
                                const pressure = response.pressure;
                                const age = response.age;
                                const weight = response.weight;
                                const illness = response.illness;
                                const addcomment = response.addcomment;
                            
                                const visitCardiologist = new VisitCardiologist(fullname, doctor, purpose, description, urgency, completed, pressure, age, weight, illness, addcomment);
                                visitCardiologist.renderCardCardiologist(fullname, purpose, description, urgency, completed, pressure, age, weight, illness, addcomment);
                            })
                        }
                    })                    
                })
        })
    }
}

const editVisit = new EditVisit();

export { EditVisit, editVisit }