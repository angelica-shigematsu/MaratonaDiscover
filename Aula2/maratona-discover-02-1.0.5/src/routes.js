const express = require('express')
//criar servidor

const routes = express.Router()
//no ejs como padrão já sabe o views
//const basePath = __dirname + "/views"

const views = __dirname + "/views/"

const Profile = {
    data: {
    name: "Angélica",
    avatar: "https://avatars.githubusercontent.com/u/78798754?v=4",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4,
    "value-hour": 75
    },
    controllers: {
        index(re,res) {
            return res.render(views + "profile", {profile: Profile.data})
        },
    update(req,res){
        //re.body para pegar os dados
        const data = req.body
        //definir quantas semanas tem num ano
        const weeksPerYear = 52
        //remover as semanas de férias do ano
        const weeksPerMonth  = (weeksPerYear - data["vacation-per-year"]) / 12
        
        //quantas horas por semana estou trabalhando
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
        //total de horas trabalhadas no mês
        const monthlyTotalHours = weekTotalHours * weeksPerMonth

        //qual será o valor da minha hora
        data["value-hour"] = data["monthly-budget"] / monthlyTotalHours
        
        Profile.data = data
        return res.redirect('/profile')
        }
    }
}

const Job = {
    data: [
        {
            id: 1,
            name: 'Pizza Guloso',
            "daily-hours": 2,
            "total-hours": 1,
            created_at: Date.now(),
            
        },
        {
            id: 2,
            name: 'OneTwo Project',
            "daily-hours": 3,
            "total-hours": 47,
            created_at: Date.now()
            
        }
    ],

    controllers: {
        index(req,res) {

            //dias restantes
            const updatedJobs = Job.data.map((job) => {
                const remaining = Job.services.remainingDays(job)
                const status = remaining <= 0 ? 'done' : 'progress'
        
                return {
                  ...job,
                  remaining,
                  status,
                  budget: Profile.data["value-hour"] * job["total-hours"]  
                }
            })
            res.render(views + "index", {jobs : updatedJobs})
    
        },
        create(req,res){
            return res.render(views + "job")
        },
        save(req,res){
            const lastId = Job.data[Job.data.length - 1]?.id || i;
    

        Job.data.push({
            id: lastId + 1,
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now()
    })
    return res.redirect('/')
        }
    },
    services: {
        remainingDays(job){
    
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
    }
}

routes.get('/', Job.controllers.index)  
routes.get('/job',Job.controllers.create)
routes.post('/job',Job.controllers.save)
routes.get('/job/edit',(req,res) => res.render(views + "job-edit"))
routes.get('/profile',Profile.controllers.index )
routes.post('/profile',Profile.controllers.update )

//sendFIle vai enviar o html pronto já no ejs usa render
module.exports = routes