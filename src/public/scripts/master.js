  $(document).ready(function() {
    var mainTable = $('#main-table').DataTable({
      scrollY: 400,
      autoFill: true,
      buttons: [
        'copy', 'excel', 'pdf'
      ],
    })
    hideReloadButton()
  })
  const originalData = []
  function deleteSubject(id) {
    alertify.confirm(`Lưu ý`, `Bạn có chắc bạn sẽ xóa môn học này? Dữ liệu hiện tại không thể khôi phục`, 
    function() {
      const data = {
        id,
      }
      callDeleteSubjectApi(data)
    },
    function() {
      alertify.message('Đã xác nhận không xóa môn học này!');
    }
    )
  }
  function btnEnableUpdateRow(id) {
    const fixBtn = $(`[data-fix-btn = '${id}']`)
    const cancelBtn = $(`[data-cancel-btn = '${id}']`)
    const updateBtn = $(`[data-update-btn = '${id}']`)
    const collection = $(`[data-id = '${id}']`)
    $.each(collection, (index, value) => {
      $(value.children[0]).on('input', () => {
        if (updateBtn.is(':disabled')) {
          updateBtn.prop('disabled', false)
        }
      })
    })
    fixBtn.prop('disabled', true)
    cancelBtn.prop('disabled', false)
  }
  function btnCancelUpdateRow(id) {
    const fixBtn = $(`[data-fix-btn = '${id}']`)
    const cancelBtn = $(`[data-cancel-btn = '${id}']`)
    const updateBtn = $(`[data-update-btn = '${id}']`)
    fixBtn.prop('disabled', false)
    cancelBtn.prop('disabled', true)
    updateBtn.prop('disabled', true)
  }
  function btnDisableUpdateRow(id) {
    const fixBtn = $(`[data-fix-btn = '${id}']`)
    const cancelBtn = $(`[data-cancel-btn = '${id}']`)
    const updateBtn = $(`[data-update-btn = '${id}']`)
    fixBtn.prop('disabled', false)
    cancelBtn.prop('disabled', true)
    updateBtn.prop('disabled', true)
  }
  function enableUpdateRow(id) {
    btnEnableUpdateRow(id)
    let previousVersion = {
        id,
    }
    const collection = $(`[data-id = '${id}']`)
    Array.from(collection).forEach(item => {
      previousVersion[item.children[0].title] = item.children[0].value
      item.children[0].setAttribute('type', 'text')
      item.children[1].setAttribute('hidden', 'hidden')
    })
    let previousVersionIndex = originalData.findIndex(item => item.id === id)
    if (previousVersionIndex !== -1) {
      originalData.splice(previousVersionIndex, 1, previousVersion)
    } else {
      originalData.push(previousVersion)
    }
  }
  function cancelUpdateRow(id) {
    btnCancelUpdateRow(id)
    disableUpdateRowByCancelBtn(id)
  }
  function disableUpdateRowByCancelBtn(id) {
    const collection = $(`[data-id = '${id}']`)
    let tmpArr = []
    let previousVersion = originalData.find(item => item.id === id)
    for (let i of Object.keys(previousVersion)) {
      tmpArr.push(previousVersion[i])
    }
    tmpArr.shift()
    let idx = 0
    Array.from(collection).forEach(item => {
      item.children[0].value = tmpArr[idx]
      idx++
      item.children[0].setAttribute('type', 'hidden')
      item.children[1].removeAttribute('hidden')
    })
  }
  function disableUpdateRowAfterUpdated(id) {
    const collection = $(`[data-id = '${id}']`)
    Array.from(collection).forEach(item => {
      item.children[0].setAttribute('type', 'hidden')
      item.children[1].removeAttribute('hidden')
    })
  }
  function getDataFromRow(id) {
    const collection = $(`[data-id = '${id}']`)
    const data = {
      id,
    }
    Array.from(collection).forEach(item => {
      data[item.children[0].title] = item.children[0].value
    })
    return data
  }
  function callUpdateSubjectApi(data) {
    $.ajax({
        url: '/api/subject',
        type: 'PUT',
        cache: false,
        processData: false,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data),
        success: function(response) {
          updateNewDataInSelectedRow(response.newData.id, response.newData)
          alertSuccessTask(response.message)
        },
        error: function(error) {
          alertFailureTask(error)
        }
    })
  }
  function callDeleteSubjectApi(data) {
    $.ajax({
        url: '/api/subject',
        type: 'DELETE',
        cache: false,
        processData: false,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data),
        success: function(response) {
          removeRowAfterDelete(response.subjectId)
          removeDataFromOriginalData(response.subjectId)
          alertSuccessTask(response.message)
          revealReloadButton()
        },
        error: function(error) {
          alertFailureTask(error)
        }
    })
  }
  function hideReloadButton() {
    $('#reload-page-btn').css('visibility', 'hidden')
  }
  function revealReloadButton() {
    $('#reload-page-btn').css('visibility', 'visible')
  }
  function updateNewDataInSelectedRow(id, newData) {
    const collection = $(`[data-id = '${id}']`)
    Array.from(collection).forEach(item => {
      let text = newData[item.children[0].title]
      item.children[0].value = text
      item.children[1].textContent = text
    })
  }
  function removeRowAfterDelete(id) {
    $(`[data-row-id = '${id}']`).remove()
  }
  function removeDataFromOriginalData(id) {
    let previousVersionIndex = originalData.findIndex(item => item.id === id)
    if (previousVersionIndex !== -1) {
      originalData.splice(previousVersionIndex, 1)
    }
  }
  function updateRow(id) {
    btnDisableUpdateRow(id)
    let data = getDataFromRow(id)
    const props = ['tbKtraTX', 'diemThi', 'diemTB', 'hocKy']
    data = deleteEmptyProps(data, props)
    callUpdateSubjectApi(data)
    disableUpdateRowAfterUpdated(id)
  }
  
// Alertify
  function alertSuccessTask(message) {
    alertify.success(message)
  }
  function alertFailureTask(message) {
    alertify.error(message)
  }
  /**
   * @param {*} messages Validation string return by server
   * @param {*} syntax spliter
   */
  function alertSeveralFailureTask(messages, syntax) {
    var messageArr = messages.split(syntax)
    messageArr.forEach(function(message) {
        alertFailureTask(message)
    })
  }
// ----------------------------------------------