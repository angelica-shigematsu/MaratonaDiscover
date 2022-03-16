module.exports =  {
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
        
    },
    calculateBudget: (job, valueHour) => valueHour * job["total-hours"] 

}