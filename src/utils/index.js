export const uuid = (length) => {
    let rs = ''
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      rs += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return rs
}

export const dateCompare = (date1, date2) => {
  // format  'yyyy-mm-dd'
  // return 1 if date 1 > date2, -1 if date1 < date2, 0 if equal
  if (!date2 || !date1) {
    console.log(date2, date1)
    // return 0
  }
  let d1 = date1.split('-')
  let d2 = date2.split('-')
  let i = 0
  for (i = 0; i < 3; i++) {
    if (d1[i] > d2[i]) {
      return 1
    } 
    if (d1[i] < d2[i]) {
      return -1
    }    
  }
  return 0
}

export const formatDate = () => {
  var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

export const wiriteToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))

}


export const validateTask = (data) => {
  const validate = {
    id: (id) => {
      return !isNaN(id)
    },
    description: (desc) => {
      return typeof desc === 'string'
    },
    dateDue: (dateDue) => {
      try {
        if (dateDue.split('-').length !== 3) {
          return false
        }
        new Date(dateDue)

        return true
      } catch (error) {
        return false
      }
    },
    priority: (priority) => {
      return priority === 'low' || priority === 'normal' || priority === 'high'
    }
  }
  try {
    for (const key in validate) {
      if (!validate[key](data[key])) {
        return false;
      }
    }
    return true
  } catch (error) {
    return false
  }

}
