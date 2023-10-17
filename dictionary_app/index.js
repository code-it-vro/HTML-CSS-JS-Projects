// Function to fetch and display the word definition
const fetchDefinition = () => {
  const wordInput = document.querySelector(".serachInput").value;
  const definitionParagraph = document.querySelector(".final_defination");

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "8e69980f27mshb20af701261636cp16f0cejsna9b1e43f8b8c",
      "X-RapidAPI-Host": "dictionary-by-api-ninjas.p.rapidapi.com",
    },
  };

  fetch(
    `https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary?word=${wordInput}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.valid && data.definition) {
        definitionParagraph.innerHTML = data.definition
          .replace("2.", "<br>2.")
          .replace("3.", "<br>3.")
          .replace("3.", "<br>3.")
          .replace("4.", "<br>4.")
          .replace("5.", "<br>5.")
          .replace("6.", "<br>6.")
          .replace("7.", "<br>7.")
          .replace("8.", "<br>8.")
          .replace("9.", "<br>9.");
      } else {
        definitionParagraph.innerHTML = "Definition not found.";
      }
    })
    .catch((err) => console.log(err));
};

// Add an event listener to the search button
const searchButton = document.querySelector(".searchBtn");
searchButton.addEventListener("click", fetchDefinition);
