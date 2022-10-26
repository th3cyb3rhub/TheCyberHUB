import { QuizProgressIndicator, IndicatorDot } from "../../components/Resources/Quiz/Categories/CategoriesElements"

export default function RenderProgressIndicator({questionsArray, currentQuestion}){
    return (
        <QuizProgressIndicator>
        {questionsArray.map((e, i)=>{
          return(
            <IndicatorDot key={i + 'key'} id={i} questionCompleted={currentQuestion === i || currentQuestion > i}/>
          )
        })}
       </QuizProgressIndicator>
    )
}