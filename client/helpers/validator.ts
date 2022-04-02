const Validator = {
  name: (name: string): boolean => {
    return name ?  /^[a-zA-ZЁёА-я]+[\-\'\s]?[a-zA-ZЁёА-я]{3,30}$/.test(name) : false;
  },
  email: (email: string) : boolean => {
    return email ? /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) : false;
  },
  password: (password: string, confirme: string) : boolean => {
    const pass = password ? /^[a-zA-Z0-9]\w{5,30}$/.test(password) : false;
    return (pass && password === confirme);
  },
}

export default Validator;