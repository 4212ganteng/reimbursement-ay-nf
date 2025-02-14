'use server'

export async function RegisterUserAction(prevState: unknown, formdata: FormData) {
  const FullName = formdata.get('fullName')
  const username = formdata.get('username')
  const email = formdata.get('email')
  const password = formdata.get('password')
  const role = formdata.get('role')

  return {
    status: 'success',
    message: 'user registered successfully'
  }
}
