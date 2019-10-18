import service from './http'

/**
 * 普通post方式访问
 * 
 */
export const post = (url, data,message) => {
  return service({
    url: url,
    method: 'post',
    data,
    message
  });
};

/**
 * 普通get方式访问
 * **/
export const get = (url, params) => {
  return service({
    url: url,
    params
  });
};

/***
 * 针对dist方式定制访问
 */

export const dict = (dict, data) => {
  const baseurl = "dictItem/getDictItems/" + dict;
  return service({
    url: baseurl,
    method: 'post',
    data
  });
}



export const fixedDict = (fixedDict, data) => {
  const baseurl = "fixedDict/" + fixedDict;
  return service({
    url: baseurl,
    method: 'post',
    data
  });
}


export function pickerSplit(data) {
    let column = [];
    let columnValues = [];
    let columnJson ={}

    for (let index in data) {
        column[index] = data[index].name;
        columnValues[index] = data[index].value;
        columnJson[data[index].value]=data[index].name;
    }
    return { "keys": column, "values": columnValues,"json":columnJson }

}
