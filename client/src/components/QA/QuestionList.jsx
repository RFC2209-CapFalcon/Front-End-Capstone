import React from 'react'
import './assets/styles.css'

//react hooks
const {useState} = React


//remove exampleData when we connect this module to the API
// exampleData.results[0].question_body
// exampleData.results[0].question_id
const exampleData = {
  "product_id": "5",
  "results": [{
        "question_id": 37,
        "question_body": "Why is this product cheaper here than other sites?",
        "question_date": "2018-10-18T00:00:00.000Z",
        "asker_name": "williamsmith",
        "question_helpfulness": 4,
        "reported": false,
        "answers": {
          68: {
            "id": 68,
            "body": "We are selling it here without any markup from the middleman!",
            "date": "2018-08-18T00:00:00.000Z",
            "answerer_name": "Seller",
            "helpfulness": 4,
            "photos": []
            // ...
          }
        }
      },
      {
        "question_id": 38,
        "question_body": "How long does it last?",
        "question_date": "2019-06-28T00:00:00.000Z",
        "asker_name": "funnygirl",
        "question_helpfulness": 2,
        "reported": false,
        "answers": {
          70: {
            "id": 70,
            "body": "Some of the seams started splitting the first time I wore it!",
            "date": "2019-11-28T00:00:00.000Z",
            "answerer_name": "sillyguy",
            "helpfulness": 6,
            "photos": [],
          },
          78: {
            "id": 78,
            "body": "9 lives",
            "date": "2019-11-12T00:00:00.000Z",
            "answerer_name": "iluvdogz",
            "helpfulness": 31,
            "photos": [],
          }
        }
      },
      // ...
  ]
}

const QuestionList = () => {
  //States
  const [selected, setSelected] = useState(null)
  //Handlers
  const toggle = (index) => {
    if (selected === index) {
      return setSelected(null)
    }

    setSelected(index)
  }
  return (
    <div className="wrapper">
      Wrapper
      <div className="Accordion">
        {exampleData.results.map(function(question, index){
          return(
            <div className='question' key={index}>
              {/*in the future this should render a question component*/}
              <h2 className='Title' onClick={()=>{toggle(index)}}>
                {`Question ${index + 1}`}
              </h2>
              <span>{selected === index ? '-': '+'}</span>
              <div className='Body'>
                {`Question Body: ${question.question_body}`}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default QuestionList;