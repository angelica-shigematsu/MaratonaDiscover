const express = require('express')
//criar servidor

const routes = express.Router()
//no ejs como padrão já sabe o views
//const basePath = __dirname + "/views"

const views = __dirname + "/views/"

const profile = {
    name: "Angélica",
    avatar: "https://avatars.githubusercontent.com/u/78798754?v=4",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4,
    "value-hour": 75
}

const jobs = [
    {
        id: 1,
        name: 'Pizza Guloso',
        "daily-hours": 2,
        "total-hours": 60,
        created_at: Date.now(),
        
    },
    {
        id: 2,
        name: 'OneTwo Project',
        "daily-hours": 3,
        "total-hours": 47,
        created_at: Date.now()
       
    }
]

function remainingDays(job){
    
    const remainingDays = (job["total-hours"] /job["daily-hours"]).toFixed()

    const createdDate = new Date(job.created_at)
    const dueDay = createdDate.getDate() + Number(remainingDays)//data futura do término
    const dueDateInMs = createdDate.setDate(dueDay)//criar uma nova data

    const timeDiffInMs = dueDateInMs - Date.now()//dias restantes
    //transformar mili em dias
    const dayInMs = 1000 * 60 * 60 * 24
    const dayDiff = Math.floor(timeDiffInMs/dayInMs)//arrendodar para baixo
    //restam x dias
    return dayDiff
    
}

routes.get('/',(req,res) => {
    //dias restantes
    const updatedJobs = jobs.map((job) => {
        const remaining = remainingDays(job)
        const status = remaining <= 0 ? 'done' : 'progress'

        return {
          ...job,
          remaining,
          status,
          budget: profile["value-hour"] * job["total-hours"]  
        }
    })
    
    res.render(views + "index", {jobs : updatedJobs}
    
    
    )})
routes.get('/job',(req,res) => res.render(views + "job"))
routes.post('/job',(req,res) => {

    const lastId = jobs[jobs.length - 1]?.id || i;
    

    jobs.push({
        id: lastIds + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": re.body["total-hours"],
        created_at: Date.now()

    })
    return res.redirect('/')
})
routes.get('/job/edit',(req,res) => res.render(views + "job-edit"))
routes.get('/profile',(req,res) => res.render(views + "profile", {profile}))

//sendFIle vai enviar o html pronto já no ejs usa render
module.exports = routes