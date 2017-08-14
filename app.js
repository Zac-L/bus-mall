function Product (displayName, filePath, displayCount, voteCount, id) {
    this.displayName = displayName,
    this.filePath = filePath,
    this.displayCount = displayCount,
    this.voteCount = voteCount,
    this.id = id,
    this.render();
    console.log(this.displayName);
}

Product.prototype.render = function () {
    var imageOne = document.getElementById('one');
    imageOne.src = this.filePath;

    var imageTwo = document.getElementById('two');
    imageTwo.src = this.filePath;

    var imageThree = document.getElementById('three');
    imageThree.src = this.filePath;

}

function instantiateProducts () {
var bag = new Product( 'bag', 'images/bag.jpg'); 
var banana = new Product( 'banana', 'images/banana.jpg');
var bathroom = new Product('bathroom', 'images/bathroom.jpg');
var boots = new Product('boots', 'images/boots.jpg');
var bubbleGum = new Product('bubbleGum', 'images/bubblegum.jpg');
}

instantiateProducts();