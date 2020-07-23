import React, {useEffect, useState} from 'react';
import './App.css';
import UserForm from './UserForm'
import User from './User'
import formSchema from './validation/formSchema'
import axios from 'axios'
import * as yup from 'yup'

const initialFormValues = {
  name: '',
  email: '',
  passsword: '',
  terms: {
    agree: false,
    disagree: false,
  },
}

const initialFormErrors = {
  name: '',
  email: '',
  passsword: '', 
}

const initialUsers = [];
const initialDisabled = true;

function App() {

  const [users, setUsers] = useState(initialUsers)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled ] = useState(initialDisabled)

  const getUsers = () => {
    axios.get('https://reqres.in/api/users')
    .then(res => {
      setUsers(res.data);
      console.log(res.data);
    })
    .catch(err => {
      console.log(err.dir);
    });
  }

  const postNewUser = newUser => {
    axios.get('https://reqres.in/api/users', newUser)
    .then(res => {
      setUsers(res.data, ...users);
      setFormValues(initialFormValues)
    })
    .catch(err => {
      console.log(err.dir);
    });
  }

  const inputChange = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        })
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        })
      })

    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const checkboxChange = (name, isChecked) => {
    setFormValues({
      ...formValues,
      terms: {
        ...formValues.terms,
        [name]: isChecked,
      }
    })
  }

  const submit = () => {
    const newUser= {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: Object.keys(formValues.terms).filter(hb => formValues.terms[hb]),
    }
    // 🔥 STEP 9- POST NEW FRIEND USING HELPER
    postNewUser(newUser)
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    formSchema.isValid(formValues).then(valid => {
      setDisabled(!valid)
    })
  }, [formValues])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cora's App</h1>
      </header>

      <UserForm 
        values={formValues}
        inputChange={inputChange}
        checkboxChange={checkboxChange}
        submit={submit}
        disabled={disabled}
        errors={formErrors}
      />

      <User />
      {/* {
        users.map(user => {
          return (
            <User key={user.id} details={user} />
          )
        })
      } */}
    </div>
  )
}

export default App;
