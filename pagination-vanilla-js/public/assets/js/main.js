class Pagination {
  constructor({ data, itemsPerPage, listEl, paginationEl }) {
    this.data = data;
    this.itemsPerPage = itemsPerPage;
    this.listEl = listEl;
    this.paginationEl = paginationEl;

    this.currentPage = 1;
    this.totalPages = Math.ceil(data.length / itemsPerPage);

    this.render();
  }

  render = () => {
    this.renderList();
    this.renderPagination();
  };

  renderList = () => {
    this.listEl.innerHTML = "";
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    this.data.slice(start, end).forEach((item) => {
      const div = document.createElement("div");
      div.innerHTML = `<p>${item}</p>`;
      this.listEl.appendChild(div);
    });
  };

  renderPagination = () => {
    this.paginationEl.innerHTML = "";
    for (let i = 1; i <= this.totalPages; i++) {
      const btn = document.createElement("button");
      btn.className = "page-btn";
      btn.textContent = i;

      if (i === this.currentPage) {
        btn.classList.add("active");
        btn.setAttribute("aria-current", "page");
      }

      btn.addEventListener("click", () => {
        this.currentPage = i;
        this.render();
      });

      this.paginationEl.appendChild(btn);
    }
  };
}

const data = Array.from({ length: 42 }, (_, i) => `Item Number : ${i}`);

console.log(data);
new Pagination({
  data,
  itemsPerPage: 5,
  listEl: document.getElementById("list"),
  paginationEl: document.getElementById("pagination"),
});
