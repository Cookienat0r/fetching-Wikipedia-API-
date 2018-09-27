let searchUrl = "https://en.wikipedia.org/w/api.php?action=query&format=json&gsrlimit=10&generator=search&origin=*&gsrsearch=";
let userInput, startSearch;

function setup(e) {
	userInput = document.getElementById("userInput");
	startSearch = document.getElementById("searchButton")
	startSearch.addEventListener("click", goWiki);
	goWiki();
	clearSearch = document.getElementById("clearButton");
	clearSearch.addEventListener("click", function() {
		document.getElementById("result").innerHTML = "";
	    userInput.value =  "";
	});
}

function goWiki() {
	let term = userInput.value;
	let url = searchUrl + term;
	console.log("Checking for URL: ", url);
	fetch(url)
		.then(response => response.json())
		.then((data) => {
			console.log("JSON results: ", data);
			let result = `<h2>Here are 10 random Wikipedia results for  "` + term + `":</h2>`;
			
			// needs to show on page: Title from data.query.pages[i].title, 
			// using Object.key because pageid is an object
			result +=  Object.keys(data.query.pages).map( key => {
				const item = data.query.pages[key]
				return `<p><a class="link" href="https://en.wikipedia.org/?curid=` + item.pageid + `" target='_blank'>` + item.title + `</a></p>`
			}).join("");

			document.getElementById('result').innerHTML = result;			
		});	
}




