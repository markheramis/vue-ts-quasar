import User from '@/types/user'
import { isValidEmail } from '@/utils/validate'

export const userDefault: 
  Pick<User.Bio, 'first_name' | 'last_name' | 'email'>  &
  Pick<User.Account, 'username' | 'password'>
= {
  first_name: '',
  last_name: '',
  username: '',
  email: '',
  password: '',
}

export const firstNameRules = [
  (val: string) => !!val || 'First name is required',
  (val: string) => val.length > 2 || 'Name is too short',
]

export const lastNameRules = [
  (val: string) => !!val || 'Last name is required',
  (val: string) => val.length > 2 || 'Name is too short',
]

export const emailRules = [
  (val: string) => !!val || 'Email is required',
  (val: string) => isValidEmail(val) || 'Please enter a valid email address',
]

export const usernameRules = [
  (val: string) => !!val || 'Username is required',
  (val: string) => val.length >= 6 || 'Username must be atleast 6 characters',
]

export const passwordRules = [
  (val: string) => !!val || 'Password is required',
  (val: string) => val.length >= 6 || 'Password must be atleast 6 characters',
]
