class CreateMeetingModel{
    constructor(){
        this.userName = "";
        this.meetingName = "";
    }
}

class JoinMeetingModel{
    constructor(){
        this.userName = "";
        this.meetingUrl = "";
    }
}

export{
    CreateMeetingModel,
    JoinMeetingModel,
}