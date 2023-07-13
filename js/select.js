import { Visit, VisitDentist, VisitCardiologist, VisitTherapist } from "./cards.js";

class Select {

  selectCards() {
    fetch('https://ajax.test-danit.com/api/v2/cards', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        let result = data;
    const btnSearch = document.querySelector('.btn-search');
    let urgency = "";
    let status = "";
    const urgencyEl = document.querySelector("#urgency");
    const statusEl = document.querySelector('#status');
    statusEl.addEventListener('change', (ev) => {
        status = ev.target.value;
    });
    urgencyEl.addEventListener('change', (e) => {
        urgency = e.target.value;
    });
    btnSearch.addEventListener('click', (event) => {
        let inputSearch = document.querySelector('.input-search').value;
        console.log(inputSearch);
        console.log(status, urgency);
        // console.log(cardsAll);
        let cardsAll = result;

        // фільтрування карток для пошуку по input та двом select 
        cardsAll = cardsAll.filter((card) => {
            if (inputSearch === "")  {
                 return true; 
                } else {
                    return card.fullname.includes(inputSearch);
                }
        }) 
        cardsAll = cardsAll.filter((card) => {
            if (urgency === "all")  {
                return true; 
               } else {
                   return card.urgency.includes(urgency);
               }
        })
        cardsAll = cardsAll.filter((card) => {
            if (status === "all")  {
                return true; 
               } else {
                   return card.completed.includes(status);
               }        
    })

  if (cardsAll.length === 0) {
    // якщо за даними пошуку нічого не знайдено, то виводимо на екран повідомлення про це
    console.log("за даними пошуку візитів не знайдено");
    const cards = document.querySelector('.cards');
    cards.innerHTML = '<div class="no-visit">за даними пошуку візитів не знайдено</div>';

  } else {
    // відмальовування на екрані відфільтрованих карток
    const cards = document.querySelector('.cards');
    cards.innerHTML = "";
    cardsAll.forEach((card) => {
        console.log(card);
        const fullname = card.fullname;
        const doctor = card.doctor;
        const id = card.id;
        const visit = new Visit(fullname, doctor, id);
        visit.renderCard(fullname, doctor, id);
        const purpose = card.purpose;
        const description = card.description;
        const urgency = card.urgency;
        const completed = card.completed;
        const addcomment = card.addcomment;
        if (doctor === 'dentist') {
            const lastvisit = card.lastvisit;
            const visitDentist = new VisitDentist();
            visitDentist.renderCardDentist(fullname, purpose, description, urgency, completed, lastvisit, addcomment);
        } else if  (doctor === 'therapist') {           
                const age = card.age;
                const visitTherapist = new VisitTherapist();
                visitTherapist.renderCardTherapist(fullname, purpose, description, urgency, completed, age, addcomment);                
        } else {
            const pressure = card.pressure;
            const age = card.age;
            const weight = card.weight;
            const illness = card.illness;
            const visitCardiologist = new VisitCardiologist();
            visitCardiologist.renderCardCardiologist(fullname, purpose, description, urgency, completed, pressure, age, weight, illness, addcomment)
        }
    })
  }  
  })
})                
}}
  
const select = new Select();

export { Select, select };
