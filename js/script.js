// mobile menu

$( document ).ready(function() {

  $( ".cross" ).hide();
  $( ".menu" ).hide();
  $( ".canva_expander" ).click(function() {
  $( ".menu" ).slideToggle( "slow", function() {
  $( ".canva_expander" ).hide();
  $( ".cross" ).show();
  });
  });
  
  $( ".cross" ).click(function() {
  $( ".menu" ).slideToggle( "slow", function() {
  $( ".cross" ).hide();
  $( ".canva_expander" ).show();
  });
  });
  
  });

 // Close out sub menu
 $('.sub__close').click(function(e) {
  e.preventDefault();
  
  $(this).parent().parent().removeClass('is-active');
});

// Trigger sub menu
$('.menu ul .nav__submenu').click(function(e) {
  e.preventDefault();
  
  $(this).siblings().addClass('is-active');
});



// counters

var counted = 0;
$(window).scroll(function() {

  var count = $('#counter');
  if(count.length){
  var oTop = count.offset().top - window.innerHeight;
  if (counted == 0 && $(window).scrollTop() > oTop) {
    $('.counter').each(function() {
      var $this = $(this),
        countTo = $this.attr('data-count');
      $({
        countNum: $this.text()
      }).animate({
          countNum: countTo
        },

        {

          duration: 2000,
          easing: 'swing',
          step: function() {
            $this.text(Math.floor(this.countNum) + `+`);
          },
          complete: function() {
            $this.text(this.countNum + `+`);
          }

        });
    });
    counted = 1;
  }
}

});

function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 100;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);

// sticky header

$(window).on("scroll touchmove", function() {

  if ($(document).scrollTop() > $("#sticky-wrapper").position().top) {
    $('.sticky-area').css('width', '100%');
    $('.sticky-area').css('max-width', '1600px');
    $('.sticky-area').css('margin', '0 auto');
    $('.sticky-area').css('position', 'fixed');
    $('.sticky-area').css('top', '0px');
    $('.sticky-area').css('background', '#ebe8e8');
    $('.sticky-area').css('z-index', '1');
    // $('.sticky-area').css('box-shadow', '0 3px 16px -2px #ebe8e8');
    $('#sticky-wrapper').addClass('is-sticky');

  }
  else{
  $('.sticky-area').removeAttr('style');

  }
  
});



  // Floating caption
const imgContent = document.querySelectorAll('.gallery__image__caption');
var x, y;

function showImgContent(e) {
    for(var i = 0; i < imgContent.length; i++) {
        x = e.pageX;
        y = e.pageY;
        imgContent[i].style.transform = `translate(${x}px, ${y}px)`;
    }
};

document.addEventListener('mousemove', showImgContent);


// Lightbox modal
const body = document.body;
const items = document.querySelectorAll(".gallery__item");
const modal = document.createElement("section");
const modalImg = document.createElement("img");
const modalPrev = createButton(prevItem);
const modalNext = createButton(nextItem);
const modalClose = createButton(closeModal);
let currentItem = 0;
let modalInstance;

modal.classList.add("gallery__modal");
modalPrev.classList.add("gallery__navigation--prev");
modalNext.classList.add("gallery__navigation--next");
modalClose.classList.add("gallery__navigation--close");

function createButton(action) {
    const button = document.createElement("button");
    button.addEventListener("click", action);
    return button;
}

function prevItem() {
    currentItem = (currentItem - 1 + items.length) % items.length;
    showModal();
}

function nextItem() {
    currentItem = (currentItem + 1) % items.length;
    showModal();
} 

function closeModal() {
    modal.remove();
}

function showModal() {
    modalImg.image = items[currentItem].querySelector("img");
    modalImg.src = modalImg.image.src;
    modalImg.alt = modalImg.image.alt;
    modal.append(modalImg, modalPrev, modalNext, modalClose);
    document.body.appendChild(modal);
}

items.forEach(function(image) {
    image.addEventListener('click', function() {
        /* Detect the image class name */
        var overlayOpen = this.className === 'gallery__item';

        /**
         * Storing a reference to the opening image
         */
        if (overlayOpen) {
            modalInstance = this;
        }

        /**
         * Toggle the aria-hidden state on the overlay and the
         * no-scroll class on the body
         */
        modal.setAttribute('aria-hidden', !overlayOpen);
        body.classList.toggle('noscroll', overlayOpen);

        /**
         * Run the function that creates the modal content
         * and that appends it to the body
         */
        showModal();

        /**
         * On some mobile browser when the overlay was previously
         * opened and scrolled, if you open it again it doesn't
         * reset its scrollTop property
         */
        modal.scrollTop = 0;

        /**
         * Forcing focus for Assistive technologies.
         * Note that:
         * - if the modal has just a phrase and a button move the
         *   focus on the button,
         * - if the modal has a long text inside (e.g. a privacy
         *   statement) move the focus on the first heading inside
         *   the modal,
         * - otherwise just focus the modal.
         *
         * When you close the overlay restore the focus on the
         * button that opened the modal.
         */
        if (overlayOpen) {
            modal.focus();
        } else {
            modalInstance.focus();
            modalInstance = null;
        }
    }, false);
});

/**
 * Attach class `noscroll` to the body to prevent background scrolling
 * and set `aria` attributes for accessible devices
 */
document.body.addEventListener('keyup', (ev) => {
    if (ev.key === "Escape" && modal.getAttribute('aria-hidden') === 'false') {
        modal.setAttribute('aria-hidden', 'true');
        body.classList.toggle('noscroll', false);
        modalInstance.focus();
        modalInstance = null;
    }
})



// show and hide tab clicked

function activeTab(evt, id) {
           
  // Get all elements with class="tablinks" and remove the class "active"
   let tabactive = document.getElementsByClassName("TabButtonSelected");
   tabactive[0].className = tabactive[0].className.replace(" TabButtonSelected", "");

   document.getElementById(id).style.display = "block";
   evt.currentTarget.className += " TabButtonSelected";

   displaySection(evt,id)
}

function displaySection(evt, id) {

   let tabactive = document.getElementsByClassName("tab-section");
   tabactive[0].className = tabactive[0].className.replace(" d-chart-show", "d-chart-n");
   // add below line of codes
   [...document.querySelectorAll('div.tab-section')].forEach(item => item.style.display='none')
   document.getElementById("Section" + id).style.display = "block";
   evt.currentTarget.className += " d-chart-show";

}

