const createMeetingForm = {
    title: "",
    fieldSets: [
        {
            // formLabel: "Do you want to create a private meeting",
            // formHelperText: "This will be used to create",
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
                    onChangeHandler: (event) => console.log(event.target.value)

                },
                {
                    type: "text",
                    label: "Meeting name",
                    name: "createMeetingName",
                    // placeholder: "",
                    inputProps: {
                        maxLength: 50,
                        required: true,
                    },

                }
            ]
        },
        {
            // formLabel: "Do you want to join a private meeting",
            // formHelperText: "This will be used to create",
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
                    onChangeHandler: (event) => console.log(event.target.value)

                },
                {
                    type: "text",
                    label: "Meeting url",
                    name: "joinMeetingName",
                    // placeholder: "",
                    inputProps: {
                        maxLength: 50,
                        required: true,
                    },

                }
            ]
        }
    ]
}

export {
    createMeetingForm,
}