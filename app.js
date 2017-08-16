var allProducts = [];

function Product (displayName, filePath, id, votes) {
    this.displayName = displayName,
    this.filePath = filePath,
    this.votes = votes || 0;
    this.id = id,
    allProducts.push( this );
}

//Constructor and instances
function instProducts() {
    var bag = new Product( 'bag', 'images/bag.jpg', 'bag');
    var banana = new Product( 'banana', 'images/banana.jpg', 'banana');
    var bathroom = new Product('bathroom', 'images/bathroom.jpg', 'bathroom');
    var boots = new Product('boots', 'images/boots.jpg', 'boots');
    var bubbleGum = new Product('bubbleGum', 'images/bubblegum.jpg', 'bubblegum');
    var chair = new Product('chair', 'images/chair.jpg', 'chair');
    var cthulhu = new Product('cthulhu', 'images/cthulhu.jpg', 'cthulhu');
    var dogDuck = new Product('dogDuck', 'images/dog-duck.jpg', 'dogDuck');
    var dragon = new Product('dragon', 'images/dragon.jpg', 'dragon');
    var pen = new Product('pen', 'images/pen.jpg', 'pen');
    var petSweep = new Product('petSweep', 'images/pet-sweep.jpg', 'petSweep');
    var scissors = new Product('scissors', 'images/scissors.jpg', 'scissors');
    var shark = new Product( 'shark', 'images/shark.jpg', 'shark');
    var sweep = new Product('sweep', 'images/sweep.png', 'sweep');
    var tauntaun = new Product('tauntaun', 'images/tauntaun.jpg', 'tauntaun');
    var unicorn = new Product('unicorn', 'images/unicorn.jpg', 'unicorn');
    var usb = new Product('usb', 'images/usb.gif', 'usb');
    var waterCan = new Product('watercan', 'images/water-can.jpg', 'watercan');
    var wineGlass = new Product('wineglass', 'images/wine-glass.jpg', 'wineglass');
}

var tracker = {
    choice1: document.getElementById( 'choice1' ),
    choice2: document.getElementById( 'choice2'),
    choice3: document.getElementById( 'choice3'),
    displaySection: document.getElementById( 'display' ),
    votes: 0,

    randomIndex: function ( arr ) {
        return Math.floor( Math.random() * arr.length );
    },

    getIndexes: function ( arr ) {
        var selectIndexes = [];

        do {
            var indexNum = this.randomIndex( arr );

            if (!selectIndexes.includes (indexNum) ) {
                selectIndexes.push( indexNum );
            }

        } while ( selectIndexes.length < 3 );
        return selectIndexes;
    },

    displayOptions: function () {
        var randomProductsIndex = this.getIndexes( allProducts );

        var index1 = randomProductsIndex[0];
        var index2 = randomProductsIndex[1];
        var index3 = randomProductsIndex[2];

        var product1 = allProducts[index1];
        var product2 = allProducts[index2];
        var product3 = allProducts[index3];

        this.choice1.src = product1.filePath;
        this.choice2.src = product2.filePath;
        this.choice3.src = product3.filePath;

        this.choice1.id = product1.id;
        this.choice2.id = product2.id;
        this.choice3.id = product3.id;

        this.choice1.setAttribute( 'data-index', index1 );
        this.choice2.setAttribute( 'data-index', index2 );
        this.choice3.setAttribute( 'data-index', index3 );
    },

    voteCounter: function ( target ) {
        this.votes += 1;

        var selectItems = allProducts[ target.getAttribute( 'data-index') ];
        selectItems.votes ++ ;

        if ( this.votes > 25 ) {
            this.viewResults();
            saveToLocal('votes', allProducts);
        }
    },

    viewResults: function () {

        this.displaySection.removeEventListener ( 'click', voteHandler );

        var canvas =  document.getElementById( 'mallChart' ).getContext( '2d' );
        var voteChart = new Chart ( canvas, {
            type: 'bar',
            data: {
                labels: allProducts.map(function ( product ) {
                    return product.displayName;
                }),
                datasets: [{
                    label: 'Number of votes', 
                    data: allProducts.map(function ( product) {
                        return product.votes;
                    })
                }]
            },
        });
    }
};

var display = document.getElementById( 'display' );
display.addEventListener( 'click', voteHandler, true );

function voteHandler (event) {
    tracker.voteCounter( event.target );
    tracker.displayOptions();
}

// tracker.displayOptions();

function saveToLocal(key, value ) {
    var localSavedData = JSON.stringify(value);
    localStorage.setItem('votes', localSavedData);
}

function getFromLocal( key ) {
    return JSON.parse(localStorage.getItem( key ) );
}

var storedVoteData = getFromLocal( 'votes' );

if ( storedVoteData ) {
    console.log(storedVoteData);
    for ( var i = 0; i < storedVoteData.length; i ++ ) {

        var voteData = storedVoteData[i];
        var product = new Product(voteData.displayName, voteData.filePath, voteData.id, voteData.votes );
    }
    tracker.displayOptions();
} else {
    instProducts();
    tracker.displayOptions();
}
console.log(allProducts);