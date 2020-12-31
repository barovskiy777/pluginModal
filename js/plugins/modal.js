Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling)
}


function _createModal(options) {
    const DEFAULT_WIDTH = '500px'
    const modal = document.createElement('div')
    modal.classList.add('bmodal')


    modal.insertAdjacentHTML('afterbegin', `
        <div class= "modal-overlay" data-close="true">
            <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
                <div class="modal-header">
                    <span class="modal-title">${options.title || 'Окно'}</span>  
                    ${options.closable ? '<span class="modal-close" data-close="true">&times</span>' : ''}
                </div>
                <div class="modal-body" data-content>
                    ${options.content || ''}
                </div>
            </div >
         </div >
    `)

    document.body.appendChild(modal)
    const modalFooter = createModalFooter(options.footerButtons)
    if (modalFooter) modalFooter.appendAfter(modal.querySelector('[data-content]'))


    return modal
}

function noob() { }

function createModalFooter(buttons = []) {
    if (buttons.length > 0) {
        const resultButtons = buttons.map((item) => {
            const button = document.createElement('button')
            button.classList.add('btn')
            button.classList.add(`btn-${item.type || 'secondary'}`)
            button.innerHTML = item.text
            button.addEventListener('click', item.handler)
            return button
        })

        const modalFooter = document.createElement('div')
        modalFooter.classList.add('modal-footer')

        resultButtons.forEach(item => {
            modalFooter.appendChild(item)
        })

        return modalFooter
    }

}

$.modal = function (options) {
    const ANIMATION_SPEED = 300
    const $modal = _createModal(options)
    let closing = false
    let destroyed = false


    const modal = {
        open() {
            if (destroyed) {
                return console.log("Модалка была удалена")
            }
            if (!closing)
                $modal.classList.add('open')
        },
        close() {
            closing = true
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            setTimeout(() => {
                $modal.classList.remove('hide')
                closing = false
            }, ANIMATION_SPEED)
        },
        setContent(htmlString) {
            const content = $modal.querySelector('div[data-content]')
            content.innerHTML = htmlString
        }
    }

    const listener = event => {
        if (event.target.dataset.close) modal.close()
    }

    $modal.addEventListener('click', listener)

    console.log("options.open", options.open)
    if (options.open) {

        if (typeof options.open === 'string') {

            console.log('el', el)
            document.querySelector(options.open).addEventListener('click', event => {
                modal.open()
            })

        }
        else {

            options.open.addEventListener('click', event => {
                modal.open()
            })
        }


    }




    return Object.assign(modal, {
        destroy() {
            $modal.parentNode.removeChild($modal)
            $modal.removeEventListener('click', listener)
            destroyed = true

        }
    })
}