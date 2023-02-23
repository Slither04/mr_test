// Global Variables ------

var sizeS = document.getElementById('size-s');
var sizeM = document.getElementById('size-m');
var sizeL = document.getElementById('size-l');
var cart = document.getElementsByClassName('my-cart');
var size = document.getElementsByClassName('size-selected');
var btn = document.getElementsByClassName('atc-btn');
var cartCounter = 0;
var quantityCounterS = 0;
var quantityCounterM = 0;
var quantityCounterL = 0;
var minicartTitle = document.getElementsByClassName('minicart-title');
var minicartPrice = document.getElementsByClassName('minicart-price');
var image = document.getElementsByClassName('image');
$(document).ready(function(){

// API Request ------

    $.getJSON('https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product', function(data) {
        console.log(data)
        var title = document.getElementById('title');
        var description = document.getElementById('description');
        var price = document.getElementById('price');
        title.innerHTML = data.title;
        description.innerHTML = data.description;
        price.innerHTML = ('$' + data.price + '.00');
        sizeS.innerHTML = data.sizeOptions[0].label;
        sizeM.innerHTML = data.sizeOptions[1].label;
        sizeL.innerHTML = data.sizeOptions[2].label;
        minicartTitle[0].innerHTML = data.title;
        minicartTitle[1].innerHTML = data.title;
        minicartTitle[2].innerHTML = data.title;
        minicartPrice[0].innerHTML = ('$' + data.price + '.00');
        minicartPrice[1].innerHTML = ('$' + data.price + '.00');
        minicartPrice[2].innerHTML = ('$' + data.price + '.00');
        var imgSrc = data.imageURL;
        $(image).attr('src', imgSrc)

        // Size Selection ------

        $('.size').on('click', function(){
            $(this).addClass('focus');
            $('.size').not(this).removeClass('focus')
            $('.error').hide()
        })

        $(sizeS).on('click', function(){
            $('.size-selected').text('S')
        });
        $(sizeM).on('click', function(){
            $('.size-selected').text('M')
        });
        $(sizeL).on('click', function(){
            $('.size-selected').text('L')
        });

    // Add to cart & increase counter ------

        $(btn).on('click', function(){
            if($(sizeS).hasClass('focus')) {
                $(cart).addClass('ready')
                $('#small').css('display', 'flex');
                cartCounter++;
                quantityCounterS++;
                $('#cart-count').text('('+cartCounter+')')
                $('#small-quantity').text(quantityCounterS+ 'x');
                $('#minicart-size-small').empty().append(data.sizeOptions[0].label);
            }else if($(sizeM).hasClass('focus')){
                $(cart).addClass('ready')
                $('#med').css('display', 'flex');
                cartCounter++;
                quantityCounterM++;
                $('#cart-count').text('('+cartCounter+')')
                $('#med-quantity').text(quantityCounterM+ 'x');
                $('#minicart-size-med').empty().append(data.sizeOptions[1].label)
            }else if($(sizeL).hasClass('focus')){
                $(cart).addClass('ready')
                $('#large').css('display', 'flex');
                cartCounter++;
                quantityCounterL++;
                $('#cart-count').text('('+cartCounter+')')
                $('#large-quantity').text(quantityCounterL+ 'x');
                $('#minicart-size-large').empty().append(data.sizeOptions[2].label)
            }else {
                $('.error').show()
            }
        })
    })
});