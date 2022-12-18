    const updateBtns = document.querySelectorAll('.js-update')
    const modal = document.querySelector('.js-modal')
    const modalClose = document.querySelector('.js-modal-close')
    const completeBtn = document.querySelector('.js-complete_btn')
      
    function showUpdate() {
        modal.classList.add('open')
    }

    function hideUpdate() {
        modal.classList.remove('open')
    }

    function ShowComplete() {
        alert("Cập nhật thành công")
    }
      
    for(const updateBtn of updateBtns){
        updateBtn.addEventListener('click',showUpdate)
    }

    modalClose.addEventListener('click', hideUpdate)
    completeBtn.addEventListener('click', hideUpdate)