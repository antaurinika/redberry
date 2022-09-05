const container = document.getElementById("container");

let id;
function displayLaptops() {
  fetch(
    "https://pcfy.redberryinternship.ge/api/laptops?token=8fbc9692d1b41b6b5b6263c8b6c26ec4"
  )
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      let displayLaptopsVar = data.data.map((values) => {
        return ` <div class="item" id="${values.laptop.id}">
          <img src="https://pcfy.redberryinternship.ge/${values.laptop.image}" alt="" class="item-img" />
          <div class="info">
            <h1 class="username">${values.user.name}  ${values.user.surname}</h1>
            <a  class="more">მეტის ნახვა</a>
          </div>
        </div>`;
      });
      displayLaptopsVar = displayLaptopsVar.join("");
      container.innerHTML = displayLaptopsVar;
      //   });
      const item = document.querySelectorAll(".item");
      item.forEach((e) => {
        e.addEventListener("click", () => {
          id = e.id;
          console.log(id);
          sessionStorage.setItem("id", id);
          window.location.href = "./laptopDesc.html";
        });
      });
    });
  //   });
}
displayLaptops();
