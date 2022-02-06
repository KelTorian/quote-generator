const quoteContainer = document.getElementById("quote-cointainer");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuote;

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = "https://api.quotable.io/random";
  try {
    const response = await fetch(apiUrl);
    apiQuote = await response.json();
    authorText.textContent = apiQuote.author;
    if (apiQuote.content.length > 100) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.textContent = apiQuote.content;
    removeLoadingSpinner();
  } catch (error) {
    console.error(error);
  }
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

newQuoteBtn.addEventListener("click", getQuotes);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();
