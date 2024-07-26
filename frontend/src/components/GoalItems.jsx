import { useDispatch } from 'react-redux'
import {deleteGoal} from '../features/goals/goalSlice'

function GoalItems({goal}) {
    const dispatch = useDispatch()

  return (
    <div className='goal'>
      <div>
        {new Date(goal.createdAt).toLocaleString('en-US')}
      </div>
      <h2>{goal.text}</h2>
      <p></p>
      <button onClick={()=>dispatch(deleteGoal(goal._id))} className='close'>X</button>
    </div>
  )
}

export default GoalItems

