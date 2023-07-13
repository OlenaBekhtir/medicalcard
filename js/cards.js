import { EditVisit, editVisit } from "./editvisit.js"
import { createVisit, CreateVisit } from "./visit.js";

class Visit {
    constructor(id, fullname, doctor, purpose, description, urgency, completed, addcomment) {
        this.id = id;
        this.fullname = fullname;
        this.doctor = doctor;
        this.purpose = purpose;
        this.description = description;
        this.urgency = urgency;
        this.completed = completed;
        this.addcomment = addcomment;
    }

// МЕТОД Відмальовування картки (скороченна форма) на екрані та її видалення за необхідності
    renderCard(fullname, doctor, id) {
        // Відмальовування карток для різних лікарів
        const cards = document.querySelector('.cards');
        const newCard = document.createElement('div');
        newCard.classList.add('new-card');
        cards.prepend(newCard);
        if (doctor === 'dentist') {
            newCard.innerHTML = `<div class="card-dentist"><div class="btn-container"><div class="btn-maxinfo"><i class="fa-solid fa-maximize"></i></div><div class="btn-edit-card"><i class="fa-solid fa-pen"></i></div><div class="btn-delete-card"><i class="fa-solid fa-user-xmark"></i></div></div><div class="text-container"><p>${fullname}</p><p class="name-visit">Візит до стоматолога</p></div></div>`;    
        } else if (doctor === 'cardiologis') {
            newCard.innerHTML = `<div class="card-cardiologist"><div class="btn-container"><div class="btn-maxinfo"><i class="fa-solid fa-maximize"></i></div><div class="btn-edit-card"><i class="fa-solid fa-pen"></i></div><div class="btn-delete-card"><i class="fa-solid fa-user-xmark"></i></div></div><div class="text-container"><p>${fullname}</p><p class="name-visit">Візит до кардіолога</p></div></div>`;
        } else if (doctor === 'therapist') {
            newCard.innerHTML = `<div class="card-therapist"><div class="btn-container"><div class="btn-maxinfo"><i class="fa-solid fa-maximize"></i></div><div class="btn-edit-card"><i class="fa-solid fa-pen"></i></div><div class="btn-delete-card"><i class="fa-solid fa-user-xmark"></i></div></div><div class="text-container"><p>${fullname}</p><p class="name-visit">Візит до терапевта</p></div></div>`;
        } else {
            newCard.innerHTML = `<div class="other-doctor"><div class="btn-container"><div class="btn-maxinfo"><i class="fa-solid fa-maximize"></i></div><div class="btn-edit-card"><i class="fa-solid fa-pen"></i></div><div class="btn-delete-card"><i class="fa-solid fa-user-xmark"></i></div></div><div class="text-container"><p>${fullname}</p><p class="name-visit">Інший лікар</p></div></div>`;
        }
        // Видалення картки по кліку на кнопку "видалити"
        const btnDeleteCard = document.querySelector('.btn-delete-card');

        btnDeleteCard.addEventListener('click', (e) => {
            if (!(btnDeleteCard.classList.contains('active'))) {
            const modalDel = document.createElement('div');
            // додаткове вікно для того, щоб упевнитись, що користувач дійсно хоче видалити обрану картку
            modalDel.innerText = 'Ви точно хочете видалити картку?';
            modalDel.classList.add('modal-delete-card');
            e.target.append(modalDel);
            btnDeleteCard.classList.add('active');
            const butWrap = document.createElement('div');
            butWrap.classList.add('but-wrap');
            modalDel.appendChild(butWrap);
            const butDel = document.createElement('button');
            butDel.innerText = 'Так';
            butDel.classList.add('btn-visit');
            const butClose = document.createElement('button');
            butClose.classList.add('btn-visit');
            butClose.classList.add('close-visit');
            butClose.innerText = 'Ні';
            butWrap.append(butDel, butClose);
            // закриття діалогового вікна, якщо користувач передумав видаляти картку
            butClose.addEventListener('click', (e) => {
                btnDeleteCard.classList.remove('active');
                modalDel.remove();
            })
            // відправлення запиту на видалення картки та її видалення з екрану після підтверження про успішність видалення з серверу
            butDel.addEventListener('click', (e) => {
                e.stopPropagation();
                (async() => {
                    const result = await fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                }).then(response => {
                    console.log(response)
                    btnDeleteCard.classList.remove('active');
                    newCard.remove(id);
                })                
            })();                
            })
            } else {
             btnDeleteCard.classList.remove('active');
            }
        })

        // редагування картки по кліку на іконку "редагувати"             
            const editVisit = new EditVisit(id);
            editVisit.createModalEdit(id);        
    }   
}

class VisitDentist extends Visit {
    constructor (id, fullname, doctor, purpose, description, urgency, completed, lastvisit, addcomment) {
        super(id, fullname, doctor, purpose, description, urgency, completed, addcomment);
        this.lastvisit = lastvisit;
    }

    // МЕТОД Відмальовування картки з розширеною інформацією для візиту до стоматолога
    renderCardDentist(fullname, purpose, description, urgency, completed, lastvisit, addcomment) {
        const btnMaxInfo = document.querySelector('.btn-maxinfo');
        btnMaxInfo.addEventListener('click', (e) => {
            if (!(btnMaxInfo.classList.contains('open'))) {
            const footer = document.querySelector('.footer');
            footer.style.marginTop = '300px';
            const cardDentist = document.createElement('div');
            cardDentist.classList.add('full-card');
            cardDentist.innerHTML = `<div class="modal-card modal-dentist"><button class="close-card">Згорнути вікно</button><div ><p>${fullname}</p><p>Візит до стоматолога</p><p><span>Мета візиту: </span> ${purpose}</p><p><span>Стислий опис візиту: </span> ${description}</p><p><span>Терміновість: </span> ${urgency}</p><p><span>Статус візиту: </span> ${completed}</p><p><span>Дата останнього візиту: </span> ${lastvisit}</p><p><span>Додаткові коментарі: </span> ${addcomment}</p></div></div>`;
            e.target.append(cardDentist);
            btnMaxInfo.classList.add('open');
            cardDentist.addEventListener('click', (e) => {
                e.stopPropagation();
            })
                try {
                    if (cardDentist) {
                        const closeCard = document.querySelector('.close-card');
                        closeCard.addEventListener('click', (e) => {
                                cardDentist.remove();
                                btnMaxInfo.classList.remove('open');
                        }) 
                    }              
                    } catch (error) {
                        console.log("error! вікно вже згорнуте!");
                    }             
                } else {
                    try {
                        btnMaxInfo.addEventListener('click', (e) => {
                            if (cardDentist) {
                                cardDentist.remove();
                                btnMaxInfo.classList.remove('open');
                            }
                        })               
                    } catch (error) {
                        console.log("error! вікно вже згорнуте!");
                    }         
                }
            })      
        }        
}


class VisitCardiologist extends Visit {
    constructor (id, fullname, doctor, purpose, description, urgency, completed, pressure, age, weight, illness, addcomment) {
        super (id, fullname, doctor, purpose, description, urgency, completed, addcomment);
        this.pressure = pressure;
        this.age = age;
        this.weight = weight;
        this.illness = illness;
    }
    // МЕТОД Відмальовування картки з розширеною інформацією для візиту до кардіолога
    renderCardCardiologist(fullname, purpose, description, urgency, completed, pressure, age, weight, illness, addcomment) {
        const btnMaxInfo = document.querySelector('.btn-maxinfo');
        btnMaxInfo.addEventListener('click', (e) => {
            if (!(btnMaxInfo.classList.contains('open'))) {
            const footer = document.querySelector('.footer');
            footer.style.marginTop = '300px';
            const cardCardiologist = document.createElement('div');
            cardCardiologist.classList.add('full-card');
            cardCardiologist.innerHTML = `<div class="modal-card modal-cardiologist"><button class="close-card">Згорнути вікно</button><div ><p>${fullname}</p><p>Візит до кардіолога</p><p><span>Мета візиту: </span> ${purpose}</p><p><span>Стислий опис візиту: </span> ${description}</p><p><span>Терміновість: </span> ${urgency}</p><p><span>Статус візиту: </span> ${completed}</p><p><span>Робочий тиск: </span> ${pressure}</p><p><span>Вік: </span> ${age}</p><p><span>Індекс маси тіла: </span> ${weight}</p><p><span>Перенесенні захворювання серцево-судинної системи: </span> ${illness}</p><p><span>Додаткові коментарі: </span> ${addcomment}</p></div></div>`;
            e.target.append(cardCardiologist);
            btnMaxInfo.classList.add('open');
            cardCardiologist.addEventListener('click', (e) => {
                e.stopPropagation();
            })
            try {
                if (cardCardiologist) {
                    const closeCard = document.querySelector('.close-card');
                    closeCard.addEventListener('click', (e) => {
                        cardCardiologist.remove();
                        btnMaxInfo.classList.remove('open');
                    }) 
                }              
                } catch (error) {
                    console.log("error! вікно вже згорнуте!");
                }             
            } else {
                try {
                    btnMaxInfo.addEventListener('click', (e) => {
                        if (cardCardiologist) {
                            cardCardiologist.remove();
                            btnMaxInfo.classList.remove('open');
                        }
                    })               
                } catch (error) {
                    console.log("error! вікно вже згорнуте!");
                }         
            }
        })        
    }        
}

class VisitTherapist extends Visit {
    constructor (id, fullname, doctor, purpose, description, urgency, completed, age, addcomment) {
        super (id, fullname, doctor, purpose, description, urgency, completed, addcomment);
        this.age = age;
    }   
     // МЕТОД Відмальовування картки з розширеною інформацією для візиту до терапевта
     renderCardTherapist(fullname, purpose, description, urgency, completed, age, addcomment) {
        const btnMaxInfo = document.querySelector('.btn-maxinfo');
        btnMaxInfo.addEventListener('click', (e) => {
            if (!(btnMaxInfo.classList.contains('open'))) {
            const footer = document.querySelector('.footer');
            footer.style.marginTop = '300px';
            const cardTherapist = document.createElement('div');
            cardTherapist.classList.add('full-card');
            cardTherapist.innerHTML = `<div class="modal-card modal-therapist"><button class="close-card">Згорнути вікно</button><div ><p>${fullname}</p><p>Візит до терапевта</p><p><span>Мета візиту: </span> ${purpose}</p><p><span>Стислий опис візиту: </span> ${description}</p><p><span>Терміновість: </span> ${urgency}</p><p><span>Статус візиту: </span> ${completed}</p><p><span>Вік: </span> ${age}</p><p><span>Додаткові коментарі: </span> ${addcomment}</p></div></div>`;
            e.target.append(cardTherapist);
            btnMaxInfo.classList.add('open');
            cardTherapist.addEventListener('click', (e) => {
                e.stopPropagation();
            })
            try {
                if (cardTherapist) {
                    const closeCard = document.querySelector('.close-card');
                    closeCard.addEventListener('click', (e) => {
                        cardTherapist.remove();
                        btnMaxInfo.classList.remove('open');
                    }) 
                }              
                } catch (error) {
                    console.log("error! вікно вже згорнуте!");
                }             
            } else {
                try {
                    btnMaxInfo.addEventListener('click', (e) => {
                        if (cardTherapist) {
                            cardTherapist.remove();
                            btnMaxInfo.classList.remove('open');
                        }
                    })               
                } catch (error) {
                    console.log("error! вікно вже згорнуте!");
                }         
            }
        })          
    }        
}


const visit = new Visit();
const visitDentist = new VisitDentist();
const visitCardiologist = new VisitCardiologist();
const visitTherapist = new VisitTherapist();

export { Visit, VisitDentist, VisitCardiologist, VisitTherapist, visit, visitDentist, visitCardiologist, visitTherapist };
