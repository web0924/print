export function formDate(data, format) {
  data = new Date(data)
  const time = {
    'M+': data.getMonth() + 1,
    'D+': data.getDate(),
    'H+': data.getHours(),
    'm+': data.getMinutes(),
    's+': data.getSeconds()
  };

  if (/(y+)/i.test(format)) {
    format = format.replace(
      RegExp.$1,
      (data.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }

  for (const k in time) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? time[k]
          : ('00' + time[k]).substr(('' + time[k]).length)
      );
    }
  }
  return format;
}