const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
var myQuestions;
var base_url = window.location.origin;

var promise = new Promise(
    function (resolve, reject) {
        $.ajax({
            url: base_url+"/unzip",
            success:  function(response) {
             var q =  response;
             myQuestions = q;
             resolve(q);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
              alert("The test is not available");
              reject("The test is not available");
        }       
          });
    }
);

var consume = function () {
    promise
        .then(function (fulfilled) {
            console.log(fulfilled);
            (function(){
                function buildQuiz(){
                  // variable to store the HTML output
                  const output = []; 
                    
                  myQuestions.forEach(
                    (currentQuestion, questionNumber) => {
              
                      // variable to store the list of possible answers
                      const answers = [];
              
                      // and for each available answer...
                      for(letter in currentQuestion.answers){
              
                        // ...add an HTML radio button
                        answers.push(
                          `<label>
                            <input type="radio" name="question${questionNumber}" value="${letter}">
                            ${letter} :
                            ${currentQuestion.answers[letter]}
                          </label>`
                        );
                      }
              
                      // add this question and its answers to the output
                      output.push(
                        `<div class="question"> ${currentQuestion.question} </div>
                        <div class="answers"> ${answers.join('')} </div>`
                      );
                    }
                  );
              
                  // finally combine our output list into one string of HTML and put it on the page
                  quizContainer.innerHTML = output.join('');
                }
              
                function showResults(){
              
                  const answerContainers = quizContainer.querySelectorAll('.answers');
                  let numCorrect = 0;
              
                 
                  myQuestions.forEach( (currentQuestion, questionNumber) => {
              
                    const answerContainer = answerContainers[questionNumber];
                    const selector = `input[name=question${questionNumber}]:checked`;
                    const userAnswer = (answerContainer.querySelector(selector) || {}).value;
              
                    // if answer is correct
                    if(userAnswer === currentQuestion.correctAnswer){
                      // add to the number of correct answers
                      numCorrect++;
              
                      // color the answers green
                      answerContainers[questionNumber].style.color = 'lightgreen';
                    }
                    // if answer is wrong or blank
                    else{
                      // color the answers red
                      answerContainers[questionNumber].style.color = 'red';
                    }
                  });
              
                  // show number of correct answers out of total
                  resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
                  if (numCorrect == 3){
                      var element = document.getElementById('certificate');
                      element.style.visibility = 'visible';
                  }
                }
            
                
              
                // Kick things off
                buildQuiz();
              
                // Event listeners
                submitButton.addEventListener('click', showResults);
              })();
        })
        .catch(function (error) {
            console.log(error.message);
        });
};

consume();


// Listen for clicks on Generate Word Document button
document.getElementById("generate").addEventListener(
  "click",
  function(event) {
    generateWordDocument(event);
  },
  false
);

function generateWordDocument(event) {
  event.preventDefault();
  // Create a new instance of Document for the docx module
  let doc = new Document();
  doc.theme = {
    font: {
      normal: {
        family: "Calibri",
        color: "303856"
      },
      header: { family: "Calibri Light" }
    },
    title: {
      color: "4ABDAC"
    },
    headings: {
      one: {
        color: "FC4A1A"
      },
      two: {
        color: "F7B733"
      }
    }
  };
  doc.Styles.createParagraphStyle("customHeading1", "Custom Heading 1")
    .basedOn("Heading 1")
    .next("Normal")
    .quickFormat()
    .font(doc.theme.font.header.family)
    .size(32)
    .bold()
    .color(doc.theme.headings.one.color)
    .spacing({ after: 250 });
  doc.Styles.createParagraphStyle("customHeading2", "Custom Heading 2")
    .basedOn("Heading 2")
    .next("Normal")
    .quickFormat()
    .font(doc.theme.font.header.family)
    .size(26)
    .bold()
    .color(doc.theme.headings.two.color)
    .spacing({ after: 150 });
  doc.Styles.createParagraphStyle("customTitle", "Custom Title")
    .basedOn("Title")
    .next("Normal")
    .quickFormat()
    .font(doc.theme.font.header.family)
    .size(56)
    .bold()
    .center()
    .color(doc.theme.font.normal.color)
    .spacing({ after: 250 });
  doc.Styles.createParagraphStyle("customSubtitle", "Custom Subtitle")
    .basedOn("Subtitle")
    .next("Normal")
    .quickFormat()
    .font(doc.theme.font.header.family)
    .size(22)
    .color(doc.theme.font.normal.color)
    .spacing({ after: 150 });
  doc.Styles.createParagraphStyle("customNormal", "Custom Normal")
    .basedOn("Normal")
    .quickFormat()
    .font(doc.theme.font.normal.family)
    .size(20)
    .color(doc.theme.font.normal.color)
    .spacing({ after: 150 });
  doc.createParagraph("O.H.S. Certificate").style("customTitle");
  doc.createParagraph("Med Consulting S.S.M.").style("customSubtitle");
  doc.createParagraph("This certificate attest as a proof that the employee "+" has completed the periodical OHS testing.").style("customNormal");
  saveDocumentToFile(doc, "certificateOHS.docx");
}

function saveDocumentToFile(doc, fileName) {
  // Create new instance of Packer for the docx module
  const packer = new Packer();
  // Create a mime type that will associate the new file with Microsoft Word
  const mimeType =
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  // Create a Blob containing the Document instance and the mimeType
  packer.toBlob(doc).then(blob => {
    const docblob = blob.slice(0, blob.size, mimeType);
    // Save the file using saveAs from the file-saver package
    saveAs(docblob, fileName);
  });
}


