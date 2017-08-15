var allProducts = []

function Product (displayName, filePath, id) {
    this.displayName = displayName,
    this.filePath = filePath,
    // this.displayCount = 0,
    this.votes = 0,
    this.id = id,
    
    allProducts.push( this );
}

//Constructor and instances
function instProducts() {
    var bag = new Product( 'bag', 'images/bag.jpg');
    var banana = new Product( 'banana', 'images/banana.jpg');
    var bathroom = new Product('bathroom', 'images/bathroom.jpg');
    var boots = new Product('boots', 'images/boots.jpg');
    var bubbleGum = new Product('bubbleGum', 'images/bubblegum.jpg');
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
        console.log(selectIndexes);
        
        
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
        selectItems.votes ++;

        if ( this.votes > 25 ) {
            this.viewResults();
        }
    },

    viewResults: function () {

        this.displaySection.removeEventListener ( 'click', voteHandler );
        console.table( allProducts );
    }
    
};

var display = document.getElementById( 'display' );
display.addEventListener( 'click', voteHandler, true );

function voteHandler (event) {
    tracker.voteCounter( event.target );
    tracker.displayOptions();
}
  



instProducts();
tracker.displayOptions();
