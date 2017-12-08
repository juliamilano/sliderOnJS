// (function(window){
//     var Slider = function(){

//     };
//     window.Slider = Slider;
// })(window);

function Slider(selector, options){
    

    var __self = this;
    var sliderNode = document.querySelector(selector),
        sliderImageNode = sliderNode.querySelector('.slider__images-wrap'),
        prevSliderNode = sliderNode.querySelector('.slider__pager_previous'),
        nextSliderNode = sliderNode.querySelector('.slider__pager_next'),
        paginationNode = sliderNode.querySelector('.slider__pagination');

    //console.log(sliderNode, sliderImageNode, prevSliderNode, nextSliderNode, paginationNode);
    var currentSlideIndex = options.currentSlide || 0; // модель - данные
    var imagesCount = sliderImageNode.children.length; //img дочерние элементы (коллекции в один элемент) .slider__images-wrap
   
    //кликнуть на изображении и написать в консоль.логе - $0.offsetWidth - посмотрить ширину и высоту 
   // var slideSize = sliderImageNode.offsetWidth; ширина рамки слайдера
    var slideSize = sliderImageNode[(options.direction === 'vertical') ? 'offsetHeight': 'offsetWidth'];// в зависимости от направления берется метраж перемотки слайда

    console.log(slideSize);
    // контроллеры
    this.prevSlide = function () { 
        if(currentSlideIndex === 0){
            currentSlideIndex = imagesCount - 1;
           // console.log(currentSlideIndex);
            return;
        }
        currentSlideIndex--; 
       // console.log(currentSlideIndex);
       
    };
    // контроллеры
    this.nextSlide = function () {
        if(currentSlideIndex === (imagesCount - 1)){
            currentSlideIndex = 0;
            //console.log(currentSlideIndex);
            return;
        }
        currentSlideIndex++;
        //console.log(currentSlideIndex);
    }

    // view 
    this.__render = function () {
        var directionStyle;
        var directionStyle = (options.direction == "vertical") ? "marginTop" : "marginLeft";
        
        sliderImageNode.style[directionStyle] = -(slideSize * currentSlideIndex)+"px"; //получаем длинну отступа
        
        paginationNode.querySelector('.active').classList.remove("active");
        paginationNode.children[currentSlideIndex].querySelector('a').classList.add('active');  // вибираем детей - кружочки - ищем в li ссылки и присваеваем текущий номер
    };


    prevSliderNode.onclick = function(e) {
        e.preventDefault(); // отмена перехода по ссылке и поднятие страницы вверх
         __self.prevSlide();
         __self.__render();
    };
    nextSliderNode.onclick = function(e){
        e.preventDefault();  
        __self.nextSlide();
        __self.__render();
       
    };

    if(options.sliderChangeAuto){
        var autoSlideImage = setInterval(function() {
            __self.nextSlide();
            __self.__render();
            }, options.speedSliderChangeAuto);
    }
    
     this.currentPoginationItem = function() {
        let paginationItem = paginationNode.querySelector('.slider__pagination-item-template');
        for(let i = 0; i < imagesCount; i++){
            var item = paginationItem.cloneNode(true); // клонируем элемент шаблон
                item.classList.remove('slider__pagination-item-template'); //удаляем класс шаблон
            var aInLi =  item.querySelector('a'); //находим в нем ссылки 
            aInLi.appendChild(document.createTextNode(i)); // добавляем текстовый узел со значением индекса
            aInLi.dataset['slider__item']=i; // меняем датасет атрибуты
             if(i == currentSlideIndex) { 
                  aInLi.classList.add('active'); // добавляем класс активности в соответствии с выведенным изображением
             } 
             console.log(i, currentSlideIndex);
            paginationItem.insertAdjacentElement('beforeBegin',item); // после предыдущего itema следующие item/ Куда по отношению к paginationItem вставлять строку. перед `paginationItem`
    
    }
         
};
        this.currentPoginationItem(); // вызов самоформирующегося мультисписка 


    paginationNode.onclick = function(e){
        e.preventDefault(); 
        var link = e.target;
        if(link.tagName !== 'A'){
            return;
        }
        currentSlideIndex = +link.dataset['slider__item'];
        console.log(link);
         __self.__render();
    }
    

    this.__init = function(){
         if(options.direction === "vertical"){
              sliderImageNode.style.whiteSpace = "normal";
         }
        this.__render();
    };

    this.__init();
   
   
};

function ModalWindow(options){
     var __self = this;

     var modalWindow = document.getElementById('modal');
     var button = modalWindow.getElementsByTagName('button');
     var modalAlert = document.querySelector('.modal-alert');
     var inputAlert = document.getElementById('user-input');
     var output = document.getElementById('modal-output');

     modalAlert.style.top = screen.availHeight/2 - modalAlert.offsetHeight + "px";

     button[0].onclick = function(){
        modalWindow.style.display = "none";
        if(inputAlert.value.length !== 0){
            output.style.display = 'block';
            output.innerHTML = `Привет, ${inputAlert.value}! Крути слайдер!`;
        }
        
     }
     //console.log(modalWindow, button[0]);


}