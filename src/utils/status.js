function Status() {
  this.all = [
    {
      name: '待文印室接单',
      value: 'DaiJieDan'
    },
    {
      name: '文印室已接单',
      value: 'YiJieDan'
    },
    {
      name: '待确认',
      value: 'DaiQueRen'
    },
    {
      name: '制作已确认',
      value: 'YiQueRen'
    },
    {
      name: '生产中',
      value: 'ShengChanZhong'
    },
    {
      name: '已上架',
      value: 'YiShangJia'
    },
    {
      name: '已领取',
      value: 'YiLingQu'
    }
  ]
}

Status.prototype.getStatus = () => this.all


Status.prototype.getNext = current => {
  const len = this.all.length
  const cidx = this.all.findIndex(current)
  if (cidx === -1) return alert('入参有误')
  if (cidx === len - 1) return alert('没有下一个')
  return this.all[cidx + 1]
}


export default Status

