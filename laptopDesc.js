const container = document.querySelector(".container");
const getId = sessionStorage.getItem("id");

let state;
async function fullDataPage() {
  await fetch(`https://pcfy.redberryinternship.ge/api/laptop/${getId}?token=8fbc9692d1b41b6b5b6263c8b6c26ec4
  `)
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      if (data.data.laptop.state == "new") {
        state = "ახალი";
      }
      if (data.data.laptop.state == "used") {
        state = "მეორადი";
      }
      let displayOneItem = ` <div class="user-container">
      <img src="https://pcfy.redberryinternship.ge/${data.data.laptop.image}" class="laptop-img" alt="" />
      <div class="data">
        <p class="name">
          სახელი:</p><span
            class="dData"
            >${data.data.user.name} ${data.data.user.surname}</span
          >
        <p class="team">
          თიმი:</p><span
            class="dData"
            >${data.data.user.team_id}</span
          >
        
        <p class="position">
          პოზიცია: </p><span class="dData">${data.data.user.position_id}</span>
        
        <p class="mail">მეილი </p><span class="dData">${data.data.user.email}</span>
       
        <p class="phone">
          ტელ. ნომერი: </p><span class="dData">${data.data.user.phone_number}</span>
       
      </div>
    </div>
    <span class="x-line"></span>
    
    <div class="laptop-container">
        <div class="first-row">
          <p class="lName">
            ლეპტოპის სახელი: </p><span class="dData">${data.data.laptop.name}</span>
         
          <p class="lBrand">ლეპტოპის ბრენდი: </p><span class="dData"
              >${data.data.laptop.brand_id}</span
            >
          
          <p class="ram">
            RAM: </p>
            <span class="dData">${data.data.laptop.ram}</span>
      
          <p class="storageType">მეხსიერების ტიპი: </p><span class="dData"
              >${data.data.laptop.hard_drive_type}</span
            >
         
        </div>
        <div class="second-row">
          <p class="cpu">CPU: </p><span class="dData">${data.data.laptop.cpu.name}</span>
       
          <p class="cores">CPU-ს ბირთვი: </p><span class="dData"
              >${data.data.laptop.cpu.cores}</span>
        
          <p class="threads">CPU-ს ნაკადი: </p><span class="dData">${data.data.laptop.cpu.threads}</span>
        
        </div>
      </div>
      <span class="x-line"></span>

      <div class="price-container">
        <div class="first">
          <p class="condition">
            ლეპტოპის მდგომარეობა: </p><span class="dData">${state}</span>
         
          <p class="price">ლეპტოპის ფასი: </p><span class="dData"
              >${data.data.laptop.price} ₾</span
            >
         
        </div>
        <div class="second">
          <p class="date">შევსების რიცხვი: </p><span
              class="dData"
              >${data.data.laptop.purchase_date}</span
            >
          
        </div>
      </div>
    `;

      container.innerHTML = displayOneItem;
    });
}
fullDataPage();
