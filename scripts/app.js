import { alphabets, options } from "./data.js";

const root = document.getElementById("root");

// Heading Created
const heading = document.createElement("h2");
heading.classList = "heading";
heading.innerText = "Generate Paragraph Of Words or Sentance By Your Choice!";
root.append(heading);

// Input for count of Character length or Words created
const input = document.createElement("input");
input.type = "number";
input.placeholder = "Enter count!";
input.classList = "input";
root.append(input);

// Options are created Eg: Words , Character
options.map((option) => {
  const optionLabel = document.createElement("label");
  optionLabel.classList = "radio";
  optionLabel.innerHTML = `${option} : <input id=${option} type="radio" name="option" value=${option}>`;
  root.append(optionLabel);
});

// Making default "Character" option selected
document.getElementById("Character").checked = true;

// Submit Button created
const submitBtn = document.createElement("button");
submitBtn.classList = "btn";
submitBtn.innerText = "Submit";
root.append(submitBtn);

// Display outbox is created
const displayBox = document.createElement("textarea");
displayBox.id = "display";
displayBox.rows = 10;
root.append(displayBox);

// Added footer of My Name ;)
const footer = document.createElement("footer");
footer.classList = "footer";
footer.innerHTML = ` <h3>Made With 💗 By <a href="https://github.com/Abbas4tech/Text-Generator-JS" target="_blank">Abbas Shaikh</a></h3>`;

document.getElementsByTagName("body")[0].append(footer);

const getRandomWordLength = (min, max) =>
  Math.round(Math.random() * (max - min) + min);

const shuffler = (arr) =>
  arr
    .map((e) => ({ e, sortKey: Math.random() }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(({ e }) => e);

const modeChecker = () => {
  const inputs = document.querySelectorAll("input");
  for (let i = 0; i <= inputs.length; i++) {
    if (inputs[i].type === "radio" && inputs[i].checked) {
      return inputs[i].id;
    }
  }
};

const onChangeInput = (e) => {
  const mode = modeChecker();
  input.value =
    mode === "Word"
      ? e.target.value.split(" ").filter((word) => word).length
      : e.target.value.length;
};

const textGenerator = () => {
  if (input.value <= 0 || isNaN(input.value)) {
    alert("Comeon! I am Frontend Developer, its silly to check for this");
    input.value = "";
    return;
  }
  const mode = modeChecker();
  const words = [];
  const generateWordsOf = (limit) => {
    const shuffledAlphabets = shuffler(alphabets);
    const wordLength = getRandomWordLength(1, 10);
    const word = shuffledAlphabets.slice(0, wordLength).join("");
    words.push(word);
    limit--;
    if (limit) generateWordsOf(limit);
    return words;
  };
  mode === "Word"
    ? (displayBox.innerText = generateWordsOf(input.value).join(" "))
    : (displayBox.innerText = generateWordsOf(input.value)
        .join("")
        .slice(0, input.value));
  input.value = "";
};
submitBtn.addEventListener("click", textGenerator);
displayBox.addEventListener("input", onChangeInput);
