// Reference: https://sv.dhcnhn.vn/student/result/examresult

const table = document.querySelectorAll('.k-panel-mc  div:nth-child(2) tbody tr:not(tr:nth-last-child(1), tr:nth-last-child(2)')
// const table = document.querySelectorAll('#frmMain > div.panel.panel-default.panel-border-color.panel-border-color-primary > div.k-panel-bwrap > div > div > div > div > div > div > table > tbody tr:not(tr:nth-last-child(1), tr:nth-last-child(2)')
let data = []
class Subject {
  constructor(maHP, maIn, tenHP, hocKy, soTinChi, tbKtraTX, diemThi, diemTB) {
    this.maHP = maHP,
      this.maIn = maIn,
      this.tenHP = tenHP,
      this.hocKy = hocKy,
      this.soTinChi = parseInt(soTinChi),
      this.tbKtraTX = parseFloat(tbKtraTX),
      this.diemThi = parseFloat(diemThi),
      this.diemTB = parseFloat(diemTB)
  }
}
for (let i of table) {
  let maHP = i.querySelector('td:nth-child(2)').innerText
  let maIn = i.querySelector('td:nth-child(3)').innerText
  let tenHP = i.querySelector('td:nth-child(4)').innerText
  let hocKy = i.querySelector('td:nth-child(5)').innerText
  let soTinChi = i.querySelector('td:nth-child(6)').innerText
  let tbKtraTX = i.querySelector('td:nth-child(7)').innerText
  let diemThi = i.querySelector('td:nth-child(8)').innerText
  let diemTB = i.querySelector('td:nth-child(12)').innerText
  let temp = new Subject(maHP, maIn, tenHP, hocKy, soTinChi, tbKtraTX, diemThi, diemTB)
  data.push(temp)
}
console.save(data)
