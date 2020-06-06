import { CreateMeetingModel, JoinMeetingModel } from "src/models";

const createMeetingFormConfig = [
    {
        title: "createMeeting",
        formStateKey: "createMeetingForm",
        formModel: new CreateMeetingModel(),
        fieldSets: [
            {
                // formLabel: "Do you want to create a private meeting",
                // formHelperText: "This will be used to create",
                fieldsetKey: "createMeeting",
                buttonText: "Create",
                buttonName: "createButton",
                buttonValue: "create",
                onSubmitValidateFieldsName: ["createUserName", "createMeetingName"],
                divider: true,
                fields: [
                    {
                        type: "text",
                        name: "createUserName",
                        label: "Your name",
                        // placeholder: "",
                        inputProps: {
                            maxLength: 50,
                            required: true,
                        },
                        // onChangeHandler: "in parent component attach the function to be called."
                        // onChangeHandler: (event) => console.log(event.target.value),
                        keys: {
                            fieldKey: "userName",
                            fieldsetKey: "createMeeting",
                            formStateKey: "createMeetingForm",
                        },
                    },
                    {
                        type: "text",
                        name: "createMeetingName",
                        label: "Meeting name",
                        // placeholder: "",
                        inputProps: {
                            maxLength: 50,
                            required: true,
                        },
                        keys: {
                            fieldKey: "meetingName",
                            fieldsetKey: "createMeeting",
                            formStateKey: "createMeetingForm",
                        },

                    }
                ]
            },

        ]
    },
]


const joinMeetingFormConfig = [
    {
        title: "",
        formStateKey: "joinMeetingForm",
        formModel: new JoinMeetingModel(),
        fieldSets: [
            {
                // formLabel: "Do you want to join a private meeting",
                // formHelperText: "This will be used to create",
                fieldsetKey: "joinMeeting",
                buttonText: "Join",
                buttonName: "joinButton",
                buttonValue: "join",
                fields: [
                    {
                        type: "text",
                        name: "joinUserName",
                        label: "Your name",
                        // placeholder: "",
                        inputProps: {
                            maxLength: 50,
                            required: true,
                        },
                        // onChangeHandler: "in parent component attach the function to be called."
                        // onChangeHandler: (event) => console.log(event.target.value),
                        keys: {
                            fieldKey: "userName",
                            fieldsetKey: "joinMeeting",
                            formStateKey: "joinMeetingForm",
                        },

                    },
                    {
                        type: "text",
                        name: "joinMeetingName",
                        label: "Meeting url",
                        // placeholder: "",
                        inputProps: {
                            maxLength: 50,
                            required: true,
                        },
                        keys: {
                            fieldKey: "meetingUrl",
                            fieldsetKey: "joinMeeting",
                            formStateKey: "joinMeetingForm",
                        },

                    }
                ]
            }
        ]
    },
]

export {
    createMeetingFormConfig,
    joinMeetingFormConfig,
}