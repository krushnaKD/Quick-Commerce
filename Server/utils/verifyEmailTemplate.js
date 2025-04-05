const verfiyEmailTemplete = ({name , url})=>{
    return `
    <h1>Dear ${name}</h1>
    <p>Thank You For Register</p>
    <a href=${url} style="color:white; background:blue ; margin-top :10px ; padding:4px">
    verify Email
    </a>
    `
  }
  
  export default verfiyEmailTemplete