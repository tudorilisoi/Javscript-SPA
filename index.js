
const MAIN_CONTAINER = document.querySelector('#main')
function replaceMainHTML(htmlString) {
    MAIN_CONTAINER.innerHTML = htmlString
}
// TODO replace with LRU
const fetchCache = {}

const fetchHTML = async function (path) {
    replaceMainHTML('Loading...')
    if (fetchCache[path]) {
        console.log("CACHED", path)
        return fetchCache[path]
    }

    try {
        const result = await fetch('./home.html').then(r => r.text())
        return fetchCache[path] = result
    } catch (error) {
        throw error
    } finally {
        replaceMainHTML('Loaded')
    }

}
const watchesPage = async () => {
    //fetch
    //import
    const tpl = `
    <h1> Watches
    </h1>
    `
    replaceMainHTML(tpl)
}



const homePage = async () => {
    //fetch
    //import
    // const tpl = `
    // <h1> Home
    // <button data-product-id="55">Click me</button>
    // </h1>
    // `

    // const { default: tpl } = await import("./home.html")

    const tpl = await fetchHTML('./home.html')

    // const tpl = document.querySelector("#home")


    // debugger

    replaceMainHTML(tpl)
    // now you can setup event listeners on #main descendants
    const button = document.querySelector('#main button')
    button.addEventListener('click', ev => {
        console.log(ev.target.dataset)
    })
}

function changeClientRoute(routeStr) {

}

function main() {
    window.addEventListener('hashchange', function () {
        const { hash } = window.location
        console.log('The hash has changed!', hash)
        switch (hash) {
            case '#home':
            case '':
                homePage()
                break;
            case '#watches':
                watchesPage()
                break;
        }
    }, false);

    //start with the home page
    homePage()
}



main()