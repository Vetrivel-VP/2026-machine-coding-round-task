class Accordion {
  constructor(container, options = {}) {
    this.container = container;
    this.items = [...container.querySelectorAll(".accordion-item")];

    this.config = {
      singleOpen: options.singleOpen ?? true,
    };

    this.init();
  }

  init = () => {
    this.items.forEach((item) => {
      const header = item.querySelector(".accordion-header");

      header.setAttribute("tabindex", "0");

      header.addEventListener("click", () => this.toggle(item));
      header.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.toggle(item);
        }
      });
    });
  };

  toggle = (selectedItem) => {
    if (this.config.singleOpen) {
      this.items.forEach((item) => {
        if (item !== selectedItem) {
          item.classList.remove("active");
        }
      });
    }

    selectedItem.classList.toggle("active");
  };
}

// intialize all accordion
document.querySelectorAll(".accordion").forEach((accordion) => {
  new Accordion(accordion, { singleOpen: false });
});
