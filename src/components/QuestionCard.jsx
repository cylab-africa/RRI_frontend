import React from 'react'





const TextQuestion =(props)=>{
    const {question, number, select, answers, selectScore} = props;

    let answer = answers.find(answer => answer.id === question.id);
  
    return (
      <div  key={question.id}>
              <div  class="question">
                  <p> {number}. {question.questionText} </p>
                  <textarea value={answer? answer.score : ""} onChange={(e)=>{select(question.id, e.target.value)}} style={{minHeight:100}} name="" id="" cols="30"   rows="20"></textarea>
              </div>
          </div>
    )
}

const ChoiceQuestion = (props) => {
    const {question, number, answers, select} = props;
    let answer = answers.find(answer => answer.id === question.id);
    
    return (


      <div   key={question.id}>
              <div  class="question">
                  <p> {number}. {question.questionText} </p>
                  <div  class="scores-phone">
                    <div  class="scores">
                        <div class="score">
                            <p style={{padding: 0, margin: 0}}>N/A</p>
                            <input checked={answer && 0==answer.score} onClick={()=>{select(question.id, 0)}}  type="radio"  id=""/>
                        </div>
                        <div class="score">
                            <p style={{padding: 0, margin: 0}}>Much disagry</p>
                            <input checked={answer && 1==answer.score} onClick={()=>{select(question.id, 1)}}  type="radio"  id=""/>
                        </div>
                        <div class="score">
                            <p style={{padding: 0, margin: 0}}>Disagree</p>
                            <input  checked={answer && 2.5==answer.score} onClick={()=>{select(question.id, 2.5)}} type="radio"  id=""/>
                        </div>
                    </div>    
                    <div  class="scores">
                        
                        <div class="score">
                            <p style={{padding: 0, margin: 0}}>Neutral</p>
                            <input checked={ answer && 5==answer.score} onClick={()=>{select(question.id, 5)}} value="3" type="radio"  id=""/>
                        </div>
                        <div class="score">
                            <p style={{padding: 0, margin: 0}}>Agree</p>
                            <input checked={answer && 7.5==answer.score} onClick={()=>{select(question.id, 7.5)}}  type="radio"  id=""/>
                        </div>
                        <div class="score">
                            <p style={{padding: 0, margin: 0}}>Much agree</p>
                            <input checked={answer && 10==answer.score} onClick={()=>{select(question.id, 10)}}  type="radio"  id=""/>
                        </div>

                    </div>  
                  </div>
                  <div className="scores-desktop">
                  <div  class="scores">
                        <div class="score">
                            <p style={{padding: 0, margin: 0}}>N/A</p>
                            <input checked={answer && 0==answer.score} onChange={()=>{select(question.id, 0)}}  type="radio"  id=""/>
                        
                        </div>
                        <div class="score">
                            <p style={{padding: 0, margin: 0}}>Strongly disagry</p>
                            <input checked={answer && 1==answer.score} onChange={()=>{select(question.id, 1)}}  type="radio"  id=""/>
                        </div>
                        <div class="score">
                            <p style={{padding: 0, margin: 0}}>Disagree</p>
                            <input checked={answer && 2.5==answer.score} onChange={()=>{select(question.id, 2.5)}} type="radio"  id=""/>
                        </div>
                        <div class="score">
                            <p style={{padding: 0, margin: 0}}>Neutral</p>
                            <input checked={answer && 5==answer.score} onChange={()=>{select(question.id, 5)}} value="3" type="radio"  id=""/>
                        </div>
                        <div class="score">
                            <p style={{padding: 0, margin: 0}}>Agree</p>
                            <input checked={answer && 7.5==answer.score} onChange={()=>{select(question.id, 7.5)}}  type="radio"  id=""/>
                        </div>
                        <div class="score">
                            <p style={{padding: 0, margin: 0}}>Strongly agree</p>
                            <input checked={answer && 10==answer.score} onChange={()=>{select(question.id, 10)}}  type="radio"  id=""/>
                        </div>

                </div>
                  </div>
                  
                
              </div>
          </div>
    )
  }



  const ScaleQuestion =(props)=>{
    const {question, number, answers, select, setTextAnswer} = props;
    let answer = answers.find(answer => answer.id === question.id);
    // console.log(answer)
    return (
        <div   key={question.id}>
                <div  class="question">

                    <p> {number}. {question.questionText} </p>
                    <div class="scores">
                    <div class="score">
                                <p style={{padding: 0, margin: 0}}>N/A</p>
                                <input checked={answer && 0==answer.score} onClick={()=>{select(question.id, 0)}}  type="radio" name={question.id} id=""/>
                            </div>
                            <div class="score">
                                <p style={{padding: 0, margin: 0}}>1</p>
                                <input checked={answer && 1==answer.score} onClick={()=>{select(question.id, 1)}}  type="radio" name={question.id} id=""/>
                            </div>
                            <div class="score">
                                <p style={{padding: 0, margin: 0}}>2</p>
                                <input checked={answer && 2==answer.score} onClick={()=>{select(question.id, 2)}} type="radio" name={question.id} id=""/>
                            </div>
                            <div class="score">
                                <p style={{padding: 0, margin: 0}}>3</p>
                                <input checked={answer && 3==answer.score} onClick={()=>{select(question.id, 3)}} value="3" type="radio" name={question.id} id=""/>
                            </div>
                            <div class="score">
                                <p style={{padding: 0, margin: 0}}>4</p>
                                <input checked={answer && 4==answer.score} onClick={()=>{select(question.id, 4)}}  type="radio" name={question.id} id=""/>
                            </div>
                            <div class="score">
                                <p style={{padding: 0, margin: 0}}>5</p>
                                <input checked={answer && 5==answer.score} onClick={()=>{select(question.id, 5)}}  type="radio" name={question.id} id=""/>
                            </div>
                            <div class="score">
                                <p style={{padding: 0, margin: 0}}>6</p>
                                <input checked={answer && 6==answer.score} onClick={()=>{select(question.id, 6)}}  type="radio" name={question.id} id=""/>
                            </div>
                            <div class="score">
                                <p style={{padding: 0, margin: 0}}>7</p>
                                <input checked={answer && 7==answer.score} onClick={()=>{select(question.id, 7)}}  type="radio" name={question.id} id=""/>
                            </div>
                            <div class="score">
                                <p style={{padding: 0, margin: 0}}>8</p>
                                <input checked={answer && 8==answer.score} onClick={()=>{select(question.id, 8)}} type="radio" name={question.id} id=""/>
                            </div>
                            <div class="score">
                                <p style={{padding: 0, margin: 0}}>9</p>
                                <input checked={answer && 9==answer.score} onClick={()=>{select(question.id, 9)}} type="radio" name={question.id} id=""/>
                            </div>
                            <div class="score">
                                <p style={{padding: 0, margin: 0}}>10</p>
                                <input checked={answer && 10==answer.score} onClick={()=>{select(question.id, 10)}} type="radio" name={question.id} id=""/>
                            </div>
                            
    
                    </div>
                    </div>
            </div>
      )
  }



const QuestionCard = (props) => {
  const {question, q_number, selectScore} = props;

  const select =(id,  score)=>{
    const answer = {id:id, score:score, q_number:q_number}
    selectScore(answer)
  }

  props = {...props, select}
  
  if(props.question.type==="text"){
    return TextQuestion(props)
  }else if (props.question.type === "choice"){
    return ChoiceQuestion(props)
  }else if(props.question.type === "scale"){
    return ScaleQuestion(props)
  }
}


export default QuestionCard