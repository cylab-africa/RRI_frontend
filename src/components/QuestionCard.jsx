import React from 'react'

const QuestionCard = (props) => {
  const {question, selectScore} = props;

  const select =(id, score)=>{
    const answer = {id:id, score:score}
    selectScore(answer)
  }

  return (
    <li key={question.id}>
            <div  class="question">
                <p>{question.question} </p>
                <div class="scores">
                        <div class="score">
                            <p style={{padding: 0, margin: 0}}>1</p>
                            <input onClick={()=>{select(question.id, 1)}}  type="radio" name={question.id} id=""/>
                        </div>
                        <div class="score">
                            <p style={{padding: 0, margin: 0}}>2</p>
                            <input onClick={()=>{select(question.id, 2)}} type="radio" name={question.id} id=""/>
                        </div>
                        <div class="score">
                            <p style={{padding: 0, margin: 0}}>3</p>
                            <input onClick={()=>{select(question.id, 3)}} value="3" type="radio" name={question.id} id=""/>
                        </div>
                        <div class="score">
                            <p style={{padding: 0, margin: 0}}>4</p>
                            <input onClick={()=>{select(question.id, 4)}}  type="radio" name={question.id} id=""/>
                        </div>
                        <div class="score">
                            <p style={{padding: 0, margin: 0}}>5</p>
                            <input onClick={()=>{select(question.id, 5)}}  type="radio" name={question.id} id=""/>
                        </div>
                        <div class="score">
                            <p style={{padding: 0, margin: 0}}>6</p>
                            <input onClick={()=>{select(question.id, 6)}}  type="radio" name={question.id} id=""/>
                        </div>
                        <div class="score">
                            <p style={{padding: 0, margin: 0}}>7</p>
                            <input onClick={()=>{select(question.id, 7)}}  type="radio" name={question.id} id=""/>
                        </div>
                        <div class="score">
                            <p style={{padding: 0, margin: 0}}>8</p>
                            <input onClick={()=>{select(question.id, 8)}} type="radio" name={question.id} id=""/>
                        </div>
                        <div class="score">
                            <p style={{padding: 0, margin: 0}}>9</p>
                            <input onClick={()=>{select(question.id, 9)}} type="radio" name={question.id} id=""/>
                        </div>
                        <div class="score">
                            <p style={{padding: 0, margin: 0}}>10</p>
                            <input onClick={()=>{select(question.id, 10)}} type="radio" name={question.id} id=""/>
                        </div>
                        

                </div>
                </div>
        </li>
  )
}

export default QuestionCard