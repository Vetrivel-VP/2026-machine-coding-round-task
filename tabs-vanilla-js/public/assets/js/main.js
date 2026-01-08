console.log("loaded main.js");

class Tabs {
  constructor(container) {
    console.log("Tabs initialized");
    this.container = container;
    this.tabs = container.querySelectorAll(".tab");
    this.tabPanels = container.querySelectorAll(".tabPanel");
    this.indicator = container.querySelector(".indicator");

    this.init();
  }

  init = () => {
    this.tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => this.activateTab(tab));
      tab.addEventListener("keydown", (e) => this.handleKeyDown(e, index));
    });

    // initial indicator position
    this.moveIndicator(this.tabs[0]);
  };

  activateTab = (selectedTab) => {
    const targetId = selectedTab.dataset.tab;

    this.tabs.forEach((tab) =>
      tab.classList.toggle("active", tab === selectedTab)
    );

    this.tabPanels.forEach((panel) =>
      panel.classList.toggle("active", panel.id === targetId)
    );

    this.moveIndicator(selectedTab);
  };

  moveIndicator = (tab) => {
    const { offsetLeft, offsetWidth } = tab;
    this.indicator.style.width = `${offsetWidth}px`;
    this.indicator.style.transform = `translateX(${offsetLeft}px)`;
  };

  handleKeyDown = (event, index) => {
    let newIndex = index;
    if (event.key === "ArrowRight") newIndex++;
    if (event.key === "ArrowLeft") newIndex--;

    if (this.tabs[newIndex]) {
      this.tabs[newIndex].focus();
      this.activateTab(this.tabs[newIndex]);
    }
  };
}

// initialize

document
  .querySelectorAll(".tabsContainer")
  .forEach((container) => new Tabs(container));
