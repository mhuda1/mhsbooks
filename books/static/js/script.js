$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        searchBooks(searchText);
        e.preventDefault();
    });

    $('#submit').on('click', (e) => {
        let searchText = $('#searchText').val();
        searchBooks(searchText);
        e.preventDefault();
    })

    getBooks();
});


function searchBooks(searchText) {
    $.ajax("https://www.googleapis.com/books/v1/volumes?q=" + searchText)
        .done(response => {
            printToSite(response)
        })
        .fail((xhr, status) => console.log("error: ", status));
}


function getBooks() {
    $.ajax("https://www.googleapis.com/books/v1/volumes?q=website")
        .done(response => {
            printToSite(response)
        })
        .fail((xhr, status) => console.log("error: ", status));
}

function printToSite(response) {
    let books = response.items
    console.log(books)
    let output = ``
    $.each(books, (index, book) => {
        let buku = book.volumeInfo
        let title, desc, rating, publisher, authors
        desc = checkUndefined(buku.description)
        rating = checkUndefined(buku.averageRating)
        publisher = checkUndefined(buku.publisher)
        authors = checkUndefined(buku.authors)
        if (desc === '-') return;
        desc = truncateText(desc, 600)
        output += `
            <tr class="text-center row">
                <th scope="row" class="col-lg-2 col-md-6 col-sm-6 col-6 d-flex align-items-center justify-content-center"><img src="${buku.imageLinks.thumbnail}"></th>
                <td class="col-lg-4 col-md-6 col-sm-6 col-6 d-flex align-items-center justify-content-center">
                    <div class="">
                        <h5>${buku.title}</h5>
                        <p>Author : ${authors}</p>
                        <p>Average Rating : ${rating}</p>
                        <p>Publisher : ${publisher}</p>
                        <div class="row d-flex justify-content-center">
                            <a onCLick=showAlert()><button class="btn btn-warning mx-3">Add to Fav</button></a>
                            <a href=${buku.infoLink}><button class="btn btn-info mx-3">Read More</button></a>
                        </div>
                    </div>
                </td>
                <td class="col-lg-6 col-md-12 col-sm-12 d-flex align-items-center justify-content-center"><p id="deskripsi">${desc}</p></td>
            </tr>
            `
    })

    $('#books').html(output)

}

function checkUndefined(param) {
    if (param) {
        return param
    } else {
        return "-"
    }
}

function truncateText(paragraph, maxLength) {
    if (paragraph.length > maxLength) {
        paragraph = paragraph.substr(0, maxLength) + '...';
    }
    return paragraph;
}

function showAlert() {
    let err = `
        <div class="alert alert-dismissible alert-warning">
            <button type="button" class="close" data-dismiss="alert" onClick=hideAlert()>&times;</button>
            <h4 class="alert-heading">Sorry!</h4>
            <p class="mb-0">Feature Not yet Available</a>.
            </p>
        </div>
    `
    $('#alert').html(err)
}

function hideAlert() {
    $('#alert').html('')
}