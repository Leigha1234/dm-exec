document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('siteNav');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  const dropdowns = document.querySelectorAll('.nav__dropdown');

  if (!nav || !toggle || !links) return;


  /* =========================
     MOBILE NAVIGATION
  ========================= */

  toggle.setAttribute('aria-expanded', 'false');

  toggle.addEventListener('click', (event) => {
    event.stopPropagation();

    const isOpen = nav.classList.toggle('menu-open');

    toggle.setAttribute(
      'aria-expanded',
      String(isOpen)
    );

    /*
     Close dropdowns when the main
     mobile menu is being closed.
    */
    if (!isOpen) {
      closeAllDropdowns();
    }
  });


  /* =========================
     DROPDOWNS
  ========================= */

  function closeAllDropdowns(except = null) {
    dropdowns.forEach((dropdown) => {
      if (dropdown === except) return;

      dropdown.classList.remove('open');

      const dropdownToggle = dropdown.querySelector(
        '.nav__dropdown-toggle'
      );

      if (dropdownToggle) {
        dropdownToggle.setAttribute(
          'aria-expanded',
          'false'
        );
      }
    });
  }


  dropdowns.forEach((dropdown) => {
    const dropdownToggle = dropdown.querySelector(
      '.nav__dropdown-toggle'
    );

    if (!dropdownToggle) return;

    dropdownToggle.setAttribute(
      'aria-expanded',
      'false'
    );


    dropdownToggle.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      const wasOpen = dropdown.classList.contains('open');

      /*
       Close any other dropdown first.
      */
      closeAllDropdowns(dropdown);

      /*
       Toggle the selected dropdown.
      */
      const isOpen = !wasOpen;

      dropdown.classList.toggle(
        'open',
        isOpen
      );

      dropdownToggle.setAttribute(
        'aria-expanded',
        String(isOpen)
      );
    });
  });


  /* =========================
     NAVIGATION LINKS
  ========================= */

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {

      /*
       Close the mobile menu after
       selecting a page.
      */
      nav.classList.remove('menu-open');

      toggle.setAttribute(
        'aria-expanded',
        'false'
      );

      /*
       Close any open dropdown.
      */
      closeAllDropdowns();
    });
  });


  /* =========================
     CLICK OUTSIDE
  ========================= */

  document.addEventListener('click', (event) => {

    /*
     Close dropdowns if the user
     clicks anywhere outside them.
    */
    const clickedInsideDropdown =
      event.target.closest('.nav__dropdown');

    if (!clickedInsideDropdown) {
      closeAllDropdowns();
    }


    /*
     On mobile, also close the whole
     navigation when clicking outside it.
    */
    const clickedInsideNav =
      nav.contains(event.target);

    if (!clickedInsideNav) {
      nav.classList.remove('menu-open');

      toggle.setAttribute(
        'aria-expanded',
        'false'
      );

      closeAllDropdowns();
    }
  });


  /* =========================
     ESCAPE KEY
  ========================= */

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;

    nav.classList.remove('menu-open');

    toggle.setAttribute(
      'aria-expanded',
      'false'
    );

    closeAllDropdowns();
  });


  /* =========================
     WINDOW RESIZE
  ========================= */

  window.addEventListener('resize', () => {

    /*
     If the browser moves back into
     desktop layout, clear the mobile
     navigation state.
    */
    if (window.innerWidth > 920) {
      nav.classList.remove('menu-open');

      toggle.setAttribute(
        'aria-expanded',
        'false'
      );
    }
  });

});