const selectTag = document.querySelectorAll("select");
const translatebtn = document.querySelector("button");
const fromText =document.querySelector(".form-text");
const toText = document.querySelector(".to-text");
const exchageIcon =document.querySelector(".exchange");
const icons = document.querySelectorAll(".row i");

selectTag.forEach((tag, id) => {
    for (const country_code in countries) {
        
    //  console.log(countries[country_code]);

//selecting English by default as from Lunguage and Somali as TO language
    let selected;

    if(id == 0 && country_code == "en-GB"){
        selected = "selected";
    }
    else if(id == 1 &&  country_code == "so-SO"){
        selected = "selected";
    }

     let option = ` <option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
     tag.insertAdjacentHTML("beforeend", option); // adding options tag inside select tag
    }
});

exchageIcon.addEventListener('click', function() {
 // exchange textarea and values
    let tempText = fromText.value;
    fromText.value = toText.value;
    toText.value = tempText;
// exchange select tag and values
    let tempLang = selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;



   
});

translatebtn.addEventListener('click', function(){
    let text = fromText.value,
    translateFrom = selectTag[0].value,//getting fromselect tag value
    translateTo = selectTag[1].value;//getting to select tag value
if(!text) return;
toText.setAttribute("placeholder", "Translation..");

    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;

    //fetching API response and returning  it with parsing into js obj
    // and in another then method receiving that obj
fetch(apiUrl).then(res => res.json()).then(data =>{
   console.log(data);

    toText.value = data.responseData.translatedText;
    toText.setAttribute("placeholder", "Translation");
                
});

});

icons.forEach(icon => { 
    icon.addEventListener('click', function({target})  {
        if(target.classList.contains("fa-copy")){
            // if clicked icon has from id, copy the fromtextarea value else copy the toTextarea value
            if(target.id == "form"){
                navigator.clipboard.writeText(fromText.value);
            }else{
                navigator.clipboard.writeText(toText.value);
            }
        }else{
            if(target.id == "form"){
               utterance = new SpeechSynthesisUtterance(fromText.value);
               utterance.lang = selectTag[0].value; //setting utterance language to from Select tag value 

            }else{
                utterance = new SpeechSynthesisUtterance(toText.value);
               utterance.lang = selectTag[1].value;//setting utterance language to to Select tag value 


            }
            speechSynthesis.speak(utterance);//speak the passed utterance 
        }
    });
});