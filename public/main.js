function onSubmit(e) {
  e.preventDefault();

  // clearing image and error if shown before
  document.querySelector(".msg").textContent = "";
  document.querySelector("#image").src = "";

  const prompt = document.querySelector("#prompt").value;
  const size = document.querySelector("#size").value;

  if (prompt === "") {
    alert("Please add some text");
    return;
  }

  console.log(prompt, size);
  generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
  try {
    toggleSpinner();
    const response = await fetch("/openai/generateimage", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });

    if (!response.ok) {
      toggleSpinner();
      throw new Error("That image could not be generated");
    }
    const data = await response.json();
    const imageUrl = data.url;
    document.querySelector("#image").src = imageUrl;
    toggleSpinner();
  } catch (error) {
    document.querySelector(".msg").textContent = error;
  }
}

function toggleSpinner() {
  document.querySelector(".spinner").classList.toggle("show");
}

document.querySelector("#image-form").addEventListener("submit", onSubmit);
