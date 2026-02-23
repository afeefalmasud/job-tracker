let interviewList = [];
let rejectedList = [];
let currentStatus = "all";

let totalCount = document.getElementById("total");
let interviewCount = document.getElementById("interview");
let rejectedCount = document.getElementById("rejected");
let jobCount = document.getElementById("job");

let allCards = document.getElementById("all-cards");

const allBtn = document.getElementById("all-btn");
const interviewBtn = document.getElementById("interview-btn");
const rejectedBtn = document.getElementById("rejected-btn");

const mainContainer = document.querySelector("main");
const filteredSection = document.getElementById("filtered-section");

function calculateCount() {
  totalCount.innerText = allCards.children.length;
  jobCount.innerText = allCards.children.length + " Jobs";
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
}
calculateCount();

function toggleStyle(id) {
  currentStatus = id;

  allBtn.classList.add("text-[#64748B]");
  interviewBtn.classList.add("text-[#64748B]");
  rejectedBtn.classList.add("text-[#64748B]");

  allBtn.classList.remove(
    "bg-[#3B82F6]",
    "bg-[#10B981]",
    "bg-[#EF4444]",
    "text-white",
  );
  interviewBtn.classList.remove(
    "bg-[#3B82F6]",
    "bg-[#10B981]",
    "bg-[#EF4444]",
    "text-white",
  );
  rejectedBtn.classList.remove(
    "bg-[#3B82F6]",
    "bg-[#10B981]",
    "bg-[#EF4444]",
    "text-white",
  );

  const selected = document.getElementById(id);
  selected.classList.remove("text-[#64748B]");

  if (id === "all-btn") {
    selected.classList.add("bg-[#3B82F6]", "text-white");
  } else if (id === "interview-btn") {
    selected.classList.add("bg-[#10B981]", "text-white");
  } else if (id === "rejected-btn") {
    selected.classList.add("bg-[#EF4444]", "text-white");
  }

  if (id === "all-btn") {
    allCards.classList.remove("hidden");
    filteredSection.classList.add("hidden");
    jobCount.innerText = allCards.children.length + " Jobs";
  } else if (id === "interview-btn") {
    allCards.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    jobCount.innerText = interviewList.length + " Jobs";
    renderInterview();
  } else if (id === "rejected-btn") {
    allCards.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    jobCount.innerText = rejectedList.length + " Jobs";
    renderRejected();
  }
}
function updateJobCount() {
  if (currentStatus === "all-btn") {
    jobCount.innerText = allCards.children.length + " Jobs";
  } else if (currentStatus === "interview-btn") {
    jobCount.innerText = interviewList.length + " Jobs";
  } else if (currentStatus === "rejected-btn") {
    jobCount.innerText = rejectedList.length + " Jobs";
  }
}
updateJobCount();

function updateOriginalCard(title, status) {
  const cards = allCards.children;

  for (let card of cards) {
    const cardTitle = card.querySelector(".title").innerText;

    if (cardTitle === title) {
      const applyBtn = card.querySelector(".apply");

      if (status === "interview") {
        applyBtn.innerText = "Interview";
        applyBtn.classList.add("bg-[#10B981]", "text-white");
        applyBtn.classList.remove("bg-[#EF4444]", "bg-[#EEF4FF]");
      } else if (status === "rejected") {
        applyBtn.innerText = "Rejected";
        applyBtn.classList.add("bg-[#EF4444]", "text-white");
        applyBtn.classList.remove("bg-[#10B981]", "bg-[#EEF4FF]");
      }
    }
  }
}
mainContainer.addEventListener("click", function (event) {
  const parentNode = event.target.closest(".p-6");
  const allCard = Array.from(allCards.children).find(
    (card) =>
      card.querySelector(".title").innerText ===
      parentNode.querySelector(".title").innerText,
  );

  allCard.classList.remove("border-l-[#10B981]", "border-l-[#EF4444]");

  if (event.target.classList.contains("inter-btn")) {
    allCard.classList.add("border-l-4", "border-l-[#10B981]");
  } else if (event.target.classList.contains("rej-btn")) {
    allCard.classList.add("border-l-4", "border-l-[#EF4444]");
  }

  if (event.target.classList.contains("inter-btn")) {
    const parentNode = event.target.parentNode.parentNode;

    const title = parentNode.querySelector(".title").innerText;
    const subTitle = parentNode.querySelector(".sub-title").innerText;
    const description = parentNode.querySelector(".description").innerText;
    const apply = parentNode.querySelector(".apply").innerText;
    const paragraph = parentNode.querySelector(".paragraph").innerText;

    parentNode.querySelector(".apply").innerText = "Interview";
    parentNode
      .querySelector(".apply")
      .classList.add("bg-[#10B981]", "text-white");
    parentNode
      .querySelector(".apply")
      .classList.remove("bg-[#EF4444]", "bg-[#EEF4FF]");
    parentNode.classList.remove("border-l-[#EF4444]", "border-l-[#10B981]");
    parentNode.classList.add("border-l-[#10B981]", "border-l-4");

    const cardInfo = {
      title,
      subTitle,
      description,
      apply: "interview",
      paragraph,
    };

    const cardExist = interviewList.find(
      (item) => item.title === cardInfo.title,
    );
    if (!cardExist) {
      interviewList.push(cardInfo);
    }
    updateOriginalCard(title, "interview");
    rejectedList = rejectedList.filter((item) => item.title != cardInfo.title);
    if (currentStatus === "rejected-btn") {
      renderRejected();
    }
    calculateCount();
    updateJobCount();
  } else if (event.target.classList.contains("rej-btn")) {
    const parentNode = event.target.parentNode.parentNode;

    const title = parentNode.querySelector(".title").innerText;
    const subTitle = parentNode.querySelector(".sub-title").innerText;
    const description = parentNode.querySelector(".description").innerText;
    const status = parentNode.querySelector(".apply").innerText;
    const paragraph = parentNode.querySelector(".paragraph").innerText;

    parentNode.querySelector(".apply").innerText = "Rejected";
    parentNode
      .querySelector(".apply")
      .classList.add("bg-[#EF4444]", "text-white");
    parentNode
      .querySelector(".apply")
      .classList.remove("bg-[#10B981]", "bg-[#EEF4FF]");
    parentNode.classList.remove("border-l-[#10B981]", "border-l-[#EF4444]");
    parentNode.classList.add("border-l-[#EF4444]", "border-l-4");

    const cardInfo = {
      title,
      subTitle,
      description,
      apply: "Rejected",
      paragraph,
    };

    const cardExist = rejectedList.find(
      (item) => item.title === cardInfo.title,
    );
    if (!cardExist) {
      rejectedList.push(cardInfo);
    }
    updateOriginalCard(title, "rejected");
    interviewList = interviewList.filter(
      (item) => item.title != cardInfo.title,
    );
    if (currentStatus === "interview-btn") {
      renderInterview();
    }
    calculateCount();
    updateJobCount();
  } else if (event.target.classList.contains("delete-btn")) {
    const parentNode = event.target.closest(".p-6");
    const title = parentNode.querySelector(".title").innerText;

    if (currentStatus === "all-btn") {
      interviewList = interviewList.filter((item) => item.title !== title);
      rejectedList = rejectedList.filter((item) => item.title !== title);
      parentNode.remove();
    }

    if (currentStatus === "interview-btn") {
      interviewList = interviewList.filter((item) => item.title !== title);
      const originalCard = Array.from(allCards.children).find(
        (card) => card.querySelector(".title").innerText === title,
      );
      if (originalCard) {
        originalCard.classList.remove("border-l-[#10B981]", "border-l-4");
        originalCard.querySelector(".apply").innerText = "Not Applied";
        originalCard
          .querySelector(".apply")
          .classList.remove("bg-[#10B981]", "text-white");
        originalCard
          .querySelector(".apply")
          .classList.add("bg-[#EEF4FF]", "text-[#002C5C]");
      }
      renderInterview();
    }

    if (currentStatus === "rejected-btn") {
      rejectedList = rejectedList.filter((item) => item.title !== title);
      const originalCard = Array.from(allCards.children).find(
        (card) => card.querySelector(".title").innerText === title,
      );
      if (originalCard) {
        originalCard.classList.remove("border-l-[#EF4444]", "border-l-4");
        originalCard.querySelector(".apply").innerText = "Not Applied";
        originalCard
          .querySelector(".apply")
          .classList.remove("bg-[#EF4444]", "text-white");
        originalCard
          .querySelector(".apply")
          .classList.add("bg-[#EEF4FF]", "text-[#002C5C]");
      }

      renderRejected();
    }
    calculateCount();
    updateJobCount();
  }
});

function renderInterview() {
  filteredSection.innerHTML = "";
  if (interviewList.length === 0) {
    filteredSection.innerHTML = `
        <div class="flex justify-center flex-col items-center py-[110px]">
            <img src="assets/jobs.png" class="w-25 h-25">
            <h2 class="font-semibold text-[24px] text-[#002C5C]">No jobs available</h2>
            <p class="text-[#64748B]">No interview jobs yet</p>
        </div>
        `;
  }

  for (let interview of interviewList) {
    let div = document.createElement("div");
    div.className =
      "my-5 p-6 bg-[#ffffff] border-2 border-[#dfdfdf] border-l-4 border-l-[#10B981] rounded-2xl";
    div.innerHTML = `
            <div class="flex justify-between">
                <h3 class="font-semibold text-[18px] text-[#002C5C] title">${interview.title}</h3>
                <div class="text-[#64748B] px-2 py-1.5 border-2 border-[#dfdfdf] rounded-full inline-block">
                    <i class="fa-regular fa-trash-can delete-btn"></i>
                </div>
            </div>
            <p class="text-[#64748B] pb-5 sub-title">${interview.subTitle}</p>
            <p class="space-x-2 text-[#64748B] pb-5 description">
                ${interview.description}
            </p>
            <button class="btn bg-[#10B981] text-white border-0 mb-3 apply">${interview.apply}</button>
            <p class="text-[#323B49] pb-5 paragraph">${interview.paragraph}</p>
            <div class="space-x-2">
                <button class="btn btn-outline btn-success inter-btn">INTERVIEW</button>
                <button class="btn btn-outline btn-secondary rej-btn">REJECTED</button>   
            </div>
        `;
    filteredSection.appendChild(div);
  }
}

function renderRejected() {
  filteredSection.innerHTML = "";
  if (rejectedList.length === 0) {
    filteredSection.innerHTML = `
        <div class="flex justify-center flex-col items-center py-[110px]">
            <img src="assets/jobs.png" class="w-25 h-25">
            <h2 class="font-semibold text-[24px] text-[#002C5C]">No jobs available</h2>
            <p class="text-[#64748B]">No interview jobs yet</p>
        </div>
        `;
  }

  for (let rejected of rejectedList) {
    let div = document.createElement("div");
    div.className =
      "my-5 p-6 bg-[#ffffff] border-2 border-[#dfdfdf] border-l-4 border-l-[#EF4444] rounded-2xl";
    div.innerHTML = `
            <div class="flex justify-between">
                <h3 class="font-semibold text-[18px] text-[#002C5C] title">${rejected.title}</h3>
                <div class="text-[#64748B] px-2 py-1.5 border-2 border-[#dfdfdf] rounded-full inline-block">
                    <i class="fa-regular fa-trash-can delete-btn"></i>
                </div>
            </div>
            <p class="text-[#64748B] pb-5 sub-title">${rejected.subTitle}</p>
            <p class="space-x-2 text-[#64748B] pb-5 description">
                ${rejected.description}
            </p>
            <button class="btn bg-[#EF4444] text-white border-0 mb-3 apply">${rejected.apply}</button>
            <p class="text-[#323B49] pb-5 paragraph">${rejected.paragraph}</p>
            <div class="space-x-2">
                <button class="btn btn-outline btn-success inter-btn">INTERVIEW</button>
                <button class="btn btn-outline btn-secondary rej-btn">REJECTED</button>   
            </div>
        `;
    filteredSection.appendChild(div);
  }
}
