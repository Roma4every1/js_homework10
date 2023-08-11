const getPost = async (page) => {
  const response = await fetch(`https://reqres.in/api/users?page=${page}`);
  const result = await response.json();

  return result.data;
};
const drawUsers = async (data) => {
  tbody.innerHTML = "";
  data.forEach(({ avatar, email, first_name, id, last_name }) => {
    tbody.innerHTML += `
        <tr>
        <td>${id}</td>
        <td><img src="${avatar}" alt="${first_name} ${last_name}"></td>
        <td>${first_name}</td>
        <td>${last_name}</td>
        <td>${email}</td>
    </tr>
        `;
  });
};

const init = async () => {
  let page = 1;
  const tbody = document.querySelector("#tbody");
  const prevBtn = document.querySelector("#prevBtn");
  const nextBtn = document.querySelector("#nextBtn");
  prevBtn.addEventListener("click", async () => {
    if (page > 1) {
      page--;
      const result = await getPost(page);
      drawUsers(result);
    }
  });

  nextBtn.addEventListener("click", async () => {
    page++;
    const result = await getPost(page);
    drawUsers(result);
  });
  const result = await getPost(page);
  drawUsers(result);
};

init();
