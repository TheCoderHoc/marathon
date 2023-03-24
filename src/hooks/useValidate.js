const useValidate = () => {
    const validate = (value) => {
        let errorMsg = "";

        if (value.length > 26) {
            errorMsg = "Please add a shorter list name...";
        }

        if (value.length <= 1) {
            errorMsg = "Please add a longer list name...";
        }

        return errorMsg;
    };

    return validate;
};

export default useValidate;
