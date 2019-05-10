import { Injectable, Inject } from '@nestjs/common';
import { List } from '../list/list.entity';
import { User } from '../user/user.entity';
import { Subject } from '../subject/subject.entity';
import { SendEmail } from './SendEmail';
import { Vote } from '../vote/vote.entity';
const schedule = require('node-schedule');
var dateFormat = require('dateformat');
// export function scheduleCronstyle(str, callback?) {

//     schedule.scheduleJob(str, () => {
//         callback();
//     });

// }

@Injectable()
export class ScheduleService {
    constructor(
        @Inject('ListRepository') private readonly listRepository: typeof List,
    ) { }

    public start(intval) {
        schedule.scheduleJob(intval, () => {
            console.log('scheduleCronstyle:' + new Date());
            this.checkUserPlan(1000*60*60*24*7*2,1000*60*60*24*7*1)
        });
    }

    public checkUserPlan(pTime,vTime){
        
        let emailTool = new SendEmail();
        this.listRepository.findAll({include:[{model:User},{model:Subject,include:[{model:Vote}]}]}).then(lists =>{
            lists.forEach(ll =>{
                let data = ll['dataValues'];
                let share_date = data.share_date;
                let now = new Date().getTime();
                if(share_date-now >vTime && share_date-now< pTime){
                    if((!ll.subjects || ll.subjects.length<3 )&& ll.user.email){
                        emailTool.send(ll.user.email,"Prepare Share Subject Attention","Hello world",this.genSHtmlTpl(ll.user.username,dateFormat(ll.share_date, "yyyy-mm-dd")))
                    }
                }
                if(share_date-now > 0 && share_date-now < vTime){
                    if(ll.subjects && ll.user.email){
                        emailTool.send(ll.user.email,"Subject Vote Result Attention","Hello world",this.genVHtmlTpl(ll.user.username,dateFormat(ll.share_date, "yyyy-mm-dd"),ll.subjects))
                    }
                }
            })
        })
    }

    public genSHtmlTpl(name,date){
        let html = `<h3>Hey ${name},</h3><p>Your nearly Share Date is <b style="color:red">${date}</b> . </p><p>Please prepare 3 subjects for everyone to vote on.</p> `;
        return html;
    }

    public genVHtmlTpl(name,date,subject){
        let html = `<h3>Hey ${name},</h3><p>Your Subject's Share Date is <b style="color:red">${date}</b> .  <br> Vote Result: </p>`;
        subject.forEach(su =>{
            html+=
            ` <p>${su.subject} : ${su.votes.length}</p>`
        })
        
        
        
        html+= `<p>Please prepare the subject with the highest number of votes. </p> `;
        return html;
    }


}



