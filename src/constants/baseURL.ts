let baseURL: string = 'http://localhost:4000'

if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:4000'
} else if (process.env.NODE_ENV === 'production') {
    baseURL = 'http://89.22.226.203:4000/'
}
  
export { baseURL }