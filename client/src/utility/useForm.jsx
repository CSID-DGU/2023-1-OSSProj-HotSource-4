import {useState} from 'react';

export const useForm = (callback, initialState = {}) => {

    const [values, setValues] = useState(initialState);

    const onIdChange = (e) => {
        setValues({...values, loginId : e.target.value} )
        console.log(values);
    }

    const onPwChange = (e) => {
        setValues({...values, password : e.target.value })
        console.log(values);
    }

    const onSubmit = (e) => {
        callback();
    }

    return {
        onIdChange,
        onPwChange,
        onSubmit,
        values
    }
}
