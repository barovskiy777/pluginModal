const fruits = [
    { id: 1, title: 'Яблоки', price: 20, img: 'http://hozvo.ru/photos/storage/bitrix/upload/medialibrary/3be/yabloko.jpg' },
    { id: 2, title: 'Апельсины', price: 30, img: 'https://www.gastronom.ru/binfiles/images/20141003/b3c0313e.jpg' },
    { id: 3, title: 'Манго', price: 40, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT779CL4AB8l3Xu1xTYqnUQc7itXR03AFN13A&usqp=CAU' },
]


// let myModal = $.modal({
//     title: 'Boris Modal',
//     closable: true,
//     content: `
//         <h4>Очень интересная информация</h4>
//         <p>Эта информация очень нужна тебе и ты станешь супер человеком если изучишь ее</p>
//         `,
//     width: '400px',
//     // open: '.modal-open',
//     footerButtons: [
//         {
//             text: 'Ok',
//             type: 'primary',
//             handler() {
//                 console.log('Primary btn clicked')
//             }
//         },
//         {
//             text: 'Cancel',
//             type: 'danger',
//             handler() {
//                 myModal.close()
//             }
//         }
//     ]

// })


createCards(fruits)

function createCards(data) {
    let row = document.querySelector('.row')

    row.innerHTML = ""


    let out = ''
    data.forEach(item => {

        out = `
            <div class="col">
                <div class="card">
                    <img class="card-img-top" style="max-width:100%"
                        src="${item.img}" alt="${item.title}">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>

                        <a href="#" class="btn btn-primary" data-btn-show-price="${item.id}">Посмотреть цену</a>
                        <a href="#" class="btn btn-danger" data-btn-remove="${item.id}">Удалить</a>
                    </div>
                </div>
            </div>
        `

        row.insertAdjacentHTML("beforeend", out)

        let modal = $.modal({
            title: item.title,
            closable: true,
            content: `
            <p> ${item.title} стоят ${item.price}</p >
        `,
            width: '400px',
            open: row.querySelector(`[data-btn-show-price="${item.id}"]`),
        })

        $.modal({
            title: `Удалить ${item.title}?`,
            closable: true,
            content: `
            <p>Вы дествительно хотите удалить данную карточку?</p >
            `,
            width: '400px',
            open: row.querySelector(`[data-btn-remove="${item.id}"]`),
            footerButtons: [
                {
                    text: 'Отмена',
                    type: 'primary',
                    handler() {
                        modal.close()
                    }
                },
                {
                    text: 'Удалить',
                    type: 'danger',
                    handler() {
                        modal.destroy()
                    }
                }
            ]
        })
    })
}








