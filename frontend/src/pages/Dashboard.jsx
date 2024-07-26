import { useEffect } from "react"
import { useNavigate,Link } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import GoalForm from "../components/Goalform"
import Spinner from "../components/Spinner"
import GoalItems from "../components/GoalItems"
import { getGoals} from "../features/goals/goalSlice"

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const  {user} = useSelector((state)=>state.auth)
  const{goals,isLoading,message} = useSelector((state)=>state.goals )

  useEffect(()=>{
    
    dispatch(getGoals())
  },[navigate,message,dispatch])

  if(isLoading){
    return <Spinner/>
  }
  return (
   <>
   <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
        <Link to="/profile">Profile</Link>
   </section>
   <GoalForm/>

   <section className="content">
    {goals.length>0?(
      <div className="goals">
        {goals.map((goal)=>
         <GoalItems key={goal._id} goal={goal} />
        )}
      </div>
    ):(
      <h3>You have not set any goals</h3>
    )}

   </section>
   </>
  )
}

export default Dashboard