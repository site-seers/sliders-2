$(document).ready(function() {
  
  var $slider = $(".slider"),
      $slideBGs = $(".slide__bg"),
      diff = 0,
      curSlide = 0,
      numOfSlides = $(".slide").length-1,
      animating = false,
      animTime = 500,
      autoSlideTimeout,
      autoSlideDelay = 6000,
      $pagination = $(".slider-pagi");
  
  function createBullets() {
    for (var i = 0; i < numOfSlides+1; i++) {
      var $li = $("<li class='slider-pagi__elem'></li>");
      $li.addClass("slider-pagi__elem-"+i).data("page", i);
      if (!i) $li.addClass("active");
      $pagination.append($li);
    }
  };
  
  createBullets();
  
  function manageControls() {
    $(".slider-control").removeClass("inactive");
    if (!curSlide) $(".slider-control.left").addClass("inactive");
    if (curSlide === numOfSlides) $(".slider-control.right").addClass("inactive");
  };
  
  function autoSlide() {
    autoSlideTimeout = setTimeout(function() {
      curSlide++;
      if (curSlide > numOfSlides) curSlide = 0;
      changeSlides();
    }, autoSlideDelay);
  };
  
  autoSlide();
  
  function changeSlides(instant) {
    if (!instant) {
      animating = true;
      manageControls();
      $slider.addClass("animating");
      $slider.css("top");
      $(".slide").removeClass("active");
      $(".slide-"+curSlide).addClass("active");
      setTimeout(function() {
        $slider.removeClass("animating");
        animating = false;
      }, animTime);
    }
    window.clearTimeout(autoSlideTimeout);
    $(".slider-pagi__elem").removeClass("active");
    $(".slider-pagi__elem-"+curSlide).addClass("active");
    $slider.css("transform", "translate3d("+ -curSlide*100 +"%,0,0)");
    $slideBGs.css("transform", "translate3d("+ curSlide*50 +"%,0,0)");
    diff = 0;
    autoSlide();
  }

  function navigateLeft() {
    if (animating) return;
    if (curSlide > 0) curSlide--;
    changeSlides();
  }

  function navigateRight() {
    if (animating) return;
    if (curSlide < numOfSlides) curSlide++;
    changeSlides();
  }

  $(document).on("mousedown touchstart", ".slider", function(e) {
    if (animating) return;
    window.clearTimeout(autoSlideTimeout);
    var startX = e.pageX || e.originalEvent.touches[0].pageX,
        winW = $(window).width();
    diff = 0;
    
    $(document).on("mousemove touchmove", function(e) {
      var x = e.pageX || e.originalEvent.touches[0].pageX;
      diff = (startX - x) / winW * 70;
      if ((!curSlide && diff < 0) || (curSlide === numOfSlides && diff > 0)) diff /= 2;
      $slider.css("transform", "translate3d("+ (-curSlide*100 - diff) +"%,0,0)");
      $slideBGs.css("transform", "translate3d("+ (curSlide*50 + diff/2) +"%,0,0)");
    });
  });
  
  $(document).on("mouseup touchend", function(e) {
    $(document).off("mousemove touchmove");
    if (animating) return;
    if (!diff) {
      changeSlides(true);
      return;
    }
    if (diff > -8 && diff < 8) {
      changeSlides();
      return;
    }
    if (diff <= -8) {
      navigateLeft();
    }
    if (diff >= 8) {
      navigateRight();
    }
  });
  
  $(document).on("click", ".slider-control", function() {
    if ($(this).hasClass("left")) {
      navigateLeft();
    } else {
      navigateRight();
    }
  });
  
  $(document).on("click", ".slider-pagi__elem", function() {
    curSlide = $(this).data("page");
    changeSlides();
  });
  
});

function submitForm() {
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;

  // Basic validation
  if (name === '' || email === '') {
      alert('Please fill in all fields');
      return;
  }

  // Additional validation (e.g., email format)
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
  }

  // Form submission logic (you can use AJAX to send data to the server)
  alert('Form submitted successfully!');
}


document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.consultation-section');
  const sendButton = form.querySelector('.send-button');

  sendButton.addEventListener('click', function(event) {
    event.preventDefault();

    // Gather input values
    const firstName = form.querySelector('input[placeholder="First Name"]').value;
    const lastName = form.querySelector('input[placeholder="Last Name"]').value;
    const company = form.querySelector('input[placeholder="Company/Organization"]').value;
    const email = form.querySelector('input[placeholder="Company Email"]').value;
    const phone = form.querySelector('input[placeholder="Phone"]').value;
    const message = form.querySelector('textarea').value;

    // Construct output message
    const outputMessage = `
      <h2>Consultation Details:</h2>
      <p><strong>First Name:</strong> ${firstName}</p>
      <p><strong>Last Name:</strong> ${lastName}</p>
      <p><strong>Company/Organization:</strong> ${company}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;

    // Display output message (for demonstration purposes)
    const outputDiv = document.createElement('div');
    outputDiv.innerHTML = outputMessage;
    form.parentNode.insertBefore(outputDiv, form.nextSibling);
  });
});




// JavaScript for toggling section visibility and smooth scrolling
function showSection(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll('.content');
  sections.forEach(section => {
      section.style.display = 'none';
  });

  // Show the selected section
  const selectedSection = document.getElementById(sectionId);
  if (selectedSection) {
      selectedSection.style.display = 'block';
  }

  // If it's the home section, display only the specified content
  if (sectionId === 'home') {
      document.getElementById('home').innerHTML = `
          <h2>Welcome to Our Website!</h2>
          <p>Discover the best solutions for your needs.</p>
      `;
  }

  // Scroll to the selected section with smooth animation
  document.getElementById(sectionId).scrollIntoView({
      behavior: 'smooth'
  });
}

